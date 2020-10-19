const lookup = require('../../shared/lookup/lookup');
const lookupValidateMiddleware = require('../../middlewares/lookupValidate');

Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

function lookupSha(sha, type) {
	let command = 'getValues'
	if(['commit', 'blob', 'tree'].includes(type))
			command = 'showCnt';

	return lookup(sha, command, type).then(response => {
		const result = response.stdout;
		if(!result)	throw(response.stderr);
		return result.split(/;|\r|\n/).slice(1).filter(v => !!v);
	});
}

function generateWarning(sha) {
    if(!sha || sha.length == 0) return {warning: 'Warning: No SHA1 specified.', isError: true };
    else if(sha.length != 40)	return { warning: 'Warning: A SHA1 must be 40 characters long.', isError: true };
    else return { warning: '', isError: false };
}

function Sha2Val(sha, traversal) {
    const type = traversal[0] + '2' + traversal[1];
    return lookupSha(sha, type)
        .then(data => {
            return Promise.all(data.map(v => {
                return (traversal.length == 2) ? v : Sha2Val(v, traversal.slice(1));
            })).then(v => v.flat());
        });
}

function getData(sha, type, maxWalkLength = 3) {
    const { warning, isError } = generateWarning(sha);
    if(isError) {
        console.log('Error: ', warning);
        return null;
    }

    let commit;
    if(type !== 'commit')
        commit = lookupSha(sha, type[0] + '2c')[0];
    else
        commit = sha;
        
        
    function nodeNames(nodes) { return nodes.map(n => n.value); }
    
    let nodes = [{value: sha, type: 'commit'}]
    let links = {};

    return Sha2Val(sha, ['c', 'P', 'c']).then(commits => {
        let promises = [];
        let promiseAll = [];

        for(let i = 0; i < commits.length; ++i){
            const commit = commits[i];
            if(!nodeNames(nodes).includes(commit))	nodes.push({value: commit, type: 'commit'});
            promises.push(lookupSha(commit, 'commit').catch(()=>{}));
        };

        promiseAll.push(Promise.all(promises).then(cdata => {
            for(let i = 0; i < cdata.length; ++i){
                const commit = commits[i];
                
                if(cdata[i].length != 6)    continue;

                let commitParents = cdata[i][1];
                commitParents = commitParents.split(':');
                for(let i = 0; i < commitParents.length; ++i) {
                    
                    const commitParent = commitParents[i];    
                    if(!nodeNames(nodes).includes(commitParent)) nodes.push({value: commitParent, type: 'commit'});
                    
                    const str = [commit, commitParent].sort().join(',');
                    links[str] = {source: commit, target: commitParent, type: 'parent'};
                }

                const commitAuthor = cdata[i][2];
                if(!nodeNames(nodes).includes(commitAuthor)) nodes.push({value: commitAuthor, type: "author"});
                
                const astr = [commit, commitAuthor].join(',');
                links[astr] = {source: commit, target: commitAuthor, type: 'author'};
            }
        }));
        promises = [];

        for(let i = 0; i < commits.length; ++i)
            promises.push(Sha2Val(commits[i], ['c', 'f']).catch(()=>{}));

        promiseAll.push(Promise.all(promises).then(fdata => {
            if(!fdata || !fdata.length) return;
            for(let i = 0; i < fdata.length; ++i) {
                const commitFiles = fdata[i];
								if(!commitFiles) continue;
                for(let j = 0; j < commitFiles.length; ++j){
                    const commitFile = commitFiles[j];
                    if(!nodeNames(nodes).includes(commitFile)) nodes.push({value: commitFile, type: 'file'});
                    
                    const str = [commits[i], commitFile].join(',');
                    links[str] = {source: commits[i], target: commitFile, type: 'file'};
                }
            }
        }));
        promises = [];

        return Promise.all(promiseAll).then(() => {	
            const typeMap = {
                "commit": "#ff0000",
                "file": "#00ff00",
                "author": "#0000ff",
                "project": "#ffff00",
            };
            const linkMap = {
                "parent": {color: "#aaa", opacity: 1.0},
                "author": {color: "#aaa", opacity: 0.2},
                "file":   {color: "#aaa", opacity: 0.3}
            };

            let filteredCommits = [sha];
            let linkObjs = Object.keys(links).map(linkName => links[linkName]);
            (function walk(curr, level) {
                let singleStepAway = linkObjs.filter(obj => obj.source === curr);
                let addedCommits = singleStepAway.map(obj => obj.target);
                filteredCommits = filteredCommits.concat(addedCommits);
                if(level) {
                    for(let i = 0; i < addedCommits.length; ++i) {
                        walk(addedCommits[i], level-1);
                    }
                }
            })(sha, maxWalkLength)
            nodes = nodes.filter(n => filteredCommits.includes(n.value));
            nodes = nodes.map(node => {
                return {id: node.value, name: node.value, color: typeMap[node.type] || "#000000", type: node.type};
            });

            let shaId = nodes.find(n => n.value === sha);
            if(shaId >= 0) nodes[shaId].color = "#FF0";

            links = Object.values(links).filter(link => filteredCommits.includes(link.source) && filteredCommits.includes(link.target));
            links = links.map(link => ({...link, color: linkMap[link.type].color, opacity: linkMap[link.type].opacity }));

            return {nodes, links};
        });
    });
}

module.exports = (app) => {
	app.get('/api/getGraphData', (req, res, next) => {
        getData(req.query.sha, req.query.type).then(data => {
            res.status(200).json(data);
        });
	});
}
