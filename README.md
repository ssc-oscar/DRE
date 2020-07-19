# MERN-Boilerplate

This is a boilerplate project using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Webpack](https://webpack.github.io/) for compilation


## Requirements

- [Node.js](https://nodejs.org/en/) 6+
- [MongoDB](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)

```shell
npm install
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
docker run -d --name mern$NID -v /home/$NID:/home/NID -p9290:22 -w /home/$NID swsc/mern /bin/startsvc.sh $NID
```
5. From your own laptop open terminal and run (make sure port netid and da server matches)
```
ssh -p9290 -L3001:localhost:443 -L3000:localhost:3000 -L3002:localhost:80 atutko@da2
```
6. in the same terminal run tmux (tmux a if you are connected the second time)
7. in the same terminal run
```
cd $HOME/DRE # where you cloned swsc/DRE
npm install #do it only the first time
#in  package.json change line: "start:dev": "PORT=3000 node server",
npm run start:dev
```
8. Go to your laptop browser for interactive experience (enter http://localhost:3000)
9. go to the ame terminal and create anothe tmux window vi ctrl-b c
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
4. Run `npm install`
5. Run the web server (`npm run start:dev` for development, `npm run start:prod` for production). NOTE: What these commands do is defined in `package.json`. You can (and should) modify this file to fit your needs. For example, only use port 80 on the live site, modify `package.json` to a different port for development (e.g. port 3000 which we exposed in prev docker command).

`config/config.js` contains database connections and jwtSecret for cookies (the latter should eventually be moved to a config file that is **excluded** from this repo).

## Project Structure
### Overview
- I followed [this](https://www.youtube.com/watch?v=5oiXG9f6GO0&list=PLuNEz8XtB51K-x3bwCC9uNM_cxXaiCcRY) playlist when building the site. I recommend you refer back to it or following from the beginning if struggling with anything.
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
- In the "Your Blobs" section of a profile, provide functionality to view the blob rather than just showing the SHA1 hash.
  - In doing so, would be the ideal time to try and set-up a framework for 
### Measures
- Go through `sdpg.perl` and identify calculations that are already made/stored elsewhere. Update `sdpg.perl` to use these calculations.
- Go through `sdpg.perl` and improve some of the measures. For example, only count collaborators for a developer if they have modified the same file instead of counting them if they both committed to the same project.
