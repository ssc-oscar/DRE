# MERN-Boilerplate

This is a boilerplate project using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Webpack](https://webpack.github.io/) for compilation


## Requirements

- [Node.js](https://nodejs.org/en/) 16+
- [MongoDB](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)

```shell
npm install --legacy-peer-deps
```

## [Recording of the walkthrough](https://tennessee.zoom.us/rec/share/ytFbE43s505IHIX0xV_nRfMDTovdT6a80CJM_aBcy07DlzlHV2C0ftC4HLjSSYD3)


## Setup Instructions Option A

[Video of the tutorial](https://tennessee.zoom.us/rec/share/_fx2D53or2hLW4nfz2PCBZ4PAKjCX6a8gCJNr_sOyh3nX9rSLHLV6w3sB_Ht4JLS) 

1. ssh to da2, clone the repo in the home folder, and checkout a new branch: the examples are given for netid  atutko
```
ssh da2
git clone https://github.com/ssc-oscar/DRE DRE
cd DRE
git checkout -b atutko
```
2. still on da2 run docker ps -a to make sure the port 9290 is not taken (use other port otherwise as shown in this output)
```
docker ps -a

CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS              PORTS                                                                                    NAMES
348b6b9ddf82        swsc/mern                 "/bin/startsvc.sh"       6 hours ago         Up 6 hours          0.0.0.0:9290->22/tcp                                                                     mernAdam
```
4. still on da2 run:

```
docker pull swsc/mern
NID=atutko #change to your own netid
PORT=9290 #change to your own port
docker run -d --name mern$NID --link dbWoC:dbWoC -v /home/$NID:/home/$NID -p$PORT:22 -w /home/$NID swsc/mern /bin/startsvc.sh $NID
```
5. From your own laptop open terminal and run (make sure port netid and da server matches)
```
ssh -p9290 -L3001:localhost:443 -L3000:localhost:3000 -L3002:localhost:80 atutko@da2
```
6. in the same terminal run tmux (tmux a if you are connected the second time)
7. in the same terminal run
```
cd $HOME/DRE # where you cloned swsc/DRE
npm install --legacy-peer-deps #do it only the first time
#in  package.json change line: "start:dev": "PORT=3000 node server",
npm run start:dev
```
8. Go to your laptop browser for interactive experience (enter http://localhost:3000)
9. go to the same terminal and create anothe tmux window vi ctrl-b c
10. edit code there and your other tmux window will show if there are errors
11. move between tmux windows via ctrl-b n
12. if you need root access within container do it on the da2 terminal (see item 4)
```
docker exec -it mern$NID bash
```
This will give you root propmpt within the container
13. Once you get your application do what you need and ready to deploy
      a) commit your changes to the branch (second tmux window: see item 9 above)
      b) merge changes from master into your branch and make sure app still works
      c) create a PR via GH interface either from your fork (if you created one) or your branch to master branch on ssc-oscar/DRE

## Setup Instructions Option B
1. Clone the repo and checkout a new branch
2. Build the docker container using `docker build --tag {YOUR_TAG} .` NOTE, the `master` branch of the repo is linked to `https://hub.docker.com/repository/docker/swsc/mern`. This means any commit to the `master` branch will auto-build the Docker image on DockerHub and either pass/fail.
3. Run the docker container (e.g. `docker run -d --name mern -v /home/akarnauc:/home/akarnauc -p9002:22 -p3000:3000 -p80:80 p443:443 -w /home/akarnauc swsc/mern /bin/startsvc.sh akarnauc`). From here, you can access the container externally (sshing on port 9002) or through da2 servers (e.g. `docker exec -it --user root mern bash`) where `mern` is the name of my container and I am accessing it as `root`.
4. Run `npm install --legacy-peer-deps`
5. Run the web server (`npm run start:dev` for development, `npm run build` and then `npm run start:prod` for production). NOTE: What these commands do is defined in `package.json`. You can (and should) modify this file to fit your needs. For example, only use port 80 on the live site, modify `package.json` to a different port for development (e.g. port 3000 which we exposed in prev docker command).

`config/config.js` contains database connections and jwtSecret for cookies (the latter should eventually be moved to a config file that is **excluded** from this repo).

## Project Structure
### Overview
- I followed [this](https://www.youtube.com/watch?v=5oiXG9f6GO0&list=PLuNEz8XtB51K-x3bwCC9uNM_cxXaiCcRY) playlist when building the site. I recommend you refer back to it or following from the beginning if struggling with anything. (This is probably still useful, but with the newest version of DRE much of the configurations from this playlist were changed)
- Front-end (ReactJS) under `client/`
  - Split separate pages/re-usable pieces of code into React **components**, found under `client/app/components`
    For example, the component to upload data for ID resolution is in client/app/components/Upload. The component for showing content of git objects and maps should be client/app/components/lookup. The video on the identity resolution scripts is at https://tennessee.zoom.us/rec/share/os0vcb6vyn1ITY3E4UHwfqswOqn_T6a8hiUc_aAFmkflfPJOnGRl33OBmLN1gDXN


  - Communication between the front-end and back-end is handled by actions (functions) located in `client/actions`.
  - Routing between pages is handled in `client/app/index.js`.
  - Assets (images, css, etc) stored in `client/public/assets`.
- Back-end under `server/`
  - All databases collections are stored in `WoC`. To view these collections from command line: `mongo --host=da1` -> `use WoC;` -> `show collections;`. The main ones used are: `authors`, `users`, `profile`
  - Database schema (models) stored in `server/models`. These enforce a schema on our NoSQL Mongo database to validate all data.
  - Actual calls to the database, back-end logic, etc. is in `server/routes/api/users.js`.
  - `server/server.js` is like the "main()" of our back-end. Modify this file to control how the server gets deployed (e.g. dev environment vs. prod environment)
### Adding Backend Routes
- The api routes are located under the `server/routes/api/` folder.
- The api routes are grouped by files, routes related to users should be placed in the `users.js` file, and perl lookup script related routes should be placed in the `lookup.js` file and so on.
- Example to create a new set of routes:
  1. Create a file named `foo.js`
  2. In `foo.js`:
  
      ```javascript
      // export module
      module.exports = (app) => {
        // route to handle GET request sent to /api/foo/bar
        app.get('/api/foo/bar', (req, res, next)=>{
          // send respond in json format, and status code 200
          res.status(200).json({
            message: 'HelloWorld!'
          });
        });
      }
      ```

  3. Add `foo.js` file to the `server/routes/api/` folder.
- Example to add a new route to an existing file:
  1. Navigate to an existing file `foo.js` in the `server/routes/api/` folder
  2. In `foo.js`, add new routes within `module.exports`:

      ```javascript
      // export module
      module.exports = (app) => {

        ...
        
        // add new route to handle POST request sent to /api/foo/foobar
        app.post('/api/foo/bar', (req, res, next)=>{
          // Do stuff
          DoStuff();
          // send respond in json format, and status code 200
          res.status(200).json({
            message: 'Complete!'
          });
        });
      }
      ```

  3. Save changes.
- Request Params and Query params
  1. Request Params:

      ```javascript
        // Add a request param named 'id'
        app.get( '/api/foo/bar/:id',(req, res, next) => {
          // Access the request param via 'req.params.id'
          res.status(200).json({
            // If a GET request is sent to /api/foo/bar/1
            // The message will be 'id is 1'
            message: `id is ${req.params.id}`
          });
        });
      ```

  2. Query Params:

      ```javascript
        app.get( '/api/foo/bar',(req, res, next) => {
          // Access the query via 'req.query.id'
          res.status(200).json({
            // If a GET request is sent to /api/foo/bar?id=1
            // The message will be 'query id is 1'
            message: `query id is ${req.query.id}`
          });
        });
      ```

- Sanitize Input Using express-validator
  1. Always check request params and query params

      ```javascript
      // require express-validator
      const { check, param, query, validationResult } = require('express-validator');

      ...

        app.get( '/api/foo/bar/:id/:name',[
            // check() will check for 'id' param in ALL objects
            check('id').isHash('sha1').escape(),
            // query() will check for 'type' param only in req.query
            query('type').isAlphanumeric().escape(),
            // param() will check for 'name' param only in req.params
            param('name').isAlph().escape()
          ],
          (req, res, next) => {
            // Check validation results
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() });
            }
            // Access the query via 'req.query.id'
            res.status(200).json({
              id: `${req.params.id}`,
              name: `${req.params.name}`,
              type: `${req.query.type}`
            });
        });
      ```

### How to Add Routes to Query The Clickhouse Database
- See [this](https://www.npmjs.com/package/clickhouse) for reference
- Example to query the Clickhouse database:

    ```javascript
    // use clickhouse module
    const { ClickHouse } = require('clickhouse');

    ...
    
      app.get('/api/clickhouse', (req, res, next) => {
        // config to connect to the database
        const db = 'foo'
        const query = 'SHOW tables';
        const clickhouse = new ClickHouse({
          url: 'http://da1.eecs.utk.edu',
          format: 'json',
          config: {
            database : db,
          }
        });

        console.log(`Execute query: ${query}`);
        clickhouse.query(query).exec((err, rows) => {
          res.status(200).json(rows);
        });
      });
    ```

### How to Add Routes to Query The MongoDB Database
- Coming soon

## Available REST APIs
### Lookup
These APIs are equivalent to calling the `lookup` perl scripts which can be found [here](https://bitbucket.org/swsc/lookup).
- GET `/api/lookup`
  - Query params:
    - `sha1` - sha1 hash of blob, tree, or commit
    - `command` - perl script to run (showCnt or getValues)
    - `type` - type of sha1 (blob, tree, or commit) or name of the map (b2c, c2b, etc.)
  - For example, to show commit content: `sha1={sha1 of commit}&type=commit&command=showCnt`
  - To query for `b2c` map: `sha1={sha1 of blob}&type=b2c&command=getValues`
  - Note that because only `sha1` inputs are accepted right now, only mappings from commit, blob, and tree to other objects are supported currently

The GET request can also be utilized from a Jupyter Notebook (ipynb file) from any machine, local or remote:
```
In [1]: import requests, json
In [2]: url='http://worldofcode.org/api/lookup?command=showCnt&type=blob&sha1=8bfa9b6cde7b8d89abab622035c9fb002d10f157'
In [3]: r = requests.get(url)
In [4]: print(json.loads(r.content)['stdout'])
        Removed at request of NucleusHealth;mblaha@nucleushealth.io;858-251-3369
```

### Clickhouse
These APIs are used to query the Clickhouse database. The details of the database can be found [here](https://github.com/woc-hack/tutorial) under the `Python Clickhouse API` section.
- GET `/api/clickhouse/commits`
- GET `/api/clickhouse/b2cPtaPkgR`
  - Query params (apply to routes above):
    - `start` - start time
    - `end` - end time
    - `count` - whether to count the rows
  - To query for `commits` from time 0 to 1: `/api/clickhouse/commits?start=0&end=1`
  - To query for `b2cPtaPkgR` map at time 42: `/api/clickhouse/b2cPtaPkgR?start=42`
  - To get the number of `commits` from time 0 to 1: `/api/clickhouse/commits?start=0&end=1&count=true`
  
## Lookup Search
Lookup Search is a UI on www.worldofcode.org/lookup that utilizes the lookup REST API. It is essentially a graphical interpretation of the "lookup" perl scripts. To access       this, you will need to create an account of WoC and be logged in. You can find a video tutorial on how to use these tools [here](https://youtu.be/KKoZe-gSZaY).
  
- Lookup Search allows you to view the contents of commit, blob, or tree sha1's using "showCnt" or map them to other objects using "getValues".
  - You can specify whether you want to do a search or a map using the dropdown box on the header of the search card. Additionally, there will be dropdown boxes on the bottom       to specify what type of sha1 you are seaching on (and what you want to map it to in the case of getValues).
    - It is also possible to manually search and view the outputs graphically by passing the arguments directly to the address bar.
    - For example, to manually do a search on a blob sha, you can type the following in the address bar:
        `www.worldofcode.org/lookupresults?sha1={sha1 of blob}&type={blob}`
    - And if you wanted to map a blob to commit you could do the following:
        `www.worldofcode.org/mapresult?sha1={sha1 of blob}&type=b2c`
  - The benefit of using the graphical application rather than querying the REST API directly is the navagation it offers. For example, if you do a search on a commit sha1           using Lookup Search it will return links for the parent and tree sha1 associated with it that you can click on to view the contents of.
       
## Adding a mapping
As new mappings are introduced they will need to be added for the website to be able to perform them. This will act as a tutorial on how to do so.
- Where to add them:
  - You will find every file you need to edit to add a new mapping in `/client/app/components/Mapping`

- The first thing you should do is alter the options.js to add that mapping as an option on the Mapping page.
  - options.js is essentially just a JSON file that hold what each element can be mapped to, as well as the character they are represented by in the mapping. For example, `"file": {"author": "a", "blob": "b", "commit": "c"}`, allows file to be mapped to author, blob, and commit.
- After adding the option, you need to implement the API that does the mapping. In the mapping folder there are several files ending in `Map.js` (ex. FileMap.js) that implements the each mapping for that type.
  - Each `Map.js` file gets a type as a prop that is in the format `from2to` (ex. Commit to Blob would pass "c2b" to CommitMap.js). Each `Map.js` file has a function call `select_map` which determines which mapping to perform. To add a new mapping, you need to define the API for that mapping, and then have it called by `select_map` when that type is passed to it.
### Hypothetical example:
Let's say that I added a new mapping that is File to Project and I need to add it to the website
  - The first thing I would do is add `"project": "p"` to file in options.js so that project is now an option for file ( File would now look like: `"file": {"author": "a", "blob": "b", "commit": "c", "project": "p"}`).
  - Next I would locate `FileMap.js` and add a new function called `function f2p(data, buttonClicked)` and implement the API to execute that mapping. Then all you need to do is add a statement under `select_map` to called that function when that mapping is executed.

## WebAPI (WIP)
The webAPI allows you to perform lookup commands that would normally only be able to be used on the da servers. This is done by using an HTTP request with CURL. The webAPI has the potential to extend the accessability of the WoC database substantially. Currently it supports two lookup scripts: showCnt and getValues. Each of these scripts can be found under the path `worldofcode.org/webAPI/{scriptname}`

- Required fields for each script
    - showCnt has two required fields: `sha1` and `type`
    - getValues has two required fields: `sha1` (going to be changed since getValues can take more than just a sha1) and `mapping`
- Each script also has an optional field for formatting. This field is specified by the keyword `format`. If format is not specified or blank it will return the default output of the script.
    - `json` returns an indexed json object
    - `pretty` returns a formatted string
- How to use the webAPI
    - Example for the equivalent of the command `echo 009d7b6da9c4419fe96ffd1fffb2ee61fa61532a | ~/lookup/showCnt commit`
        - `curl "http://worldofcode.org/webAPI/showCnt?sha1=009d7b6da9c4419fe96ffd1fffb2ee61fa61532a&type=commit"`

### Future Features for the webAPI
- Extend formatting options to all query types
- Limit data that can be returned by each script so that it won't bog down the server
- Limit the amount of requests unauthorized users can make for the same reason above
- Allow greater request limits for those with authorized access
- Extend the amount scripts that can be executed
- Make the perl scripts utilize the webAPI when executed outside of the da servers

## External Scripts
- `check_updates.py` - checks for any updates to a user (including new users) and generates their profile by calling `sdpg.perl`
- `sdpg.perl` (single developer profile generator) - generates the user profile (main driver for everything)
- Both can be found at `/home/akarnauc/DRE_Externals`
- Ideally, have `check_updates.py` always running in a tmux session

## Areas of Work
### Website
- Adding "Forgot Password/Reset Password" functionality (requires both front-end and backend)
- `http://worldofcode.org/select` not working as expected. Viewing console outputs `Warning: componentWillMount has been renamed, and is not recommended for use.`. Need to re-factor frontend based on recommendations by the console.
- `http://worldofcode.org/upload` is purely front-end with no backend capabilities. Work on actually uploading the file, and more importantly, tying the uploaded file with the disambig. algorithm.
### Measures
- Go through `sdpg.perl` and identify calculations that are already made/stored elsewhere. Update `sdpg.perl` to use these calculations.
- Go through `sdpg.perl` and improve some of the measures. For example, only count collaborators for a developer if they have modified the same file instead of counting them if they both committed to the same project.
