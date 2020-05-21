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

## Setup Instructions
1. Clone the repo and checkout a new branch
2. Build the docker container using `docker build --tag {YOUR_TAG} .` NOTE, the `master` branch of the repo is linked to `https://hub.docker.com/repository/docker/swsc/mern`. This means any commit to the `master` branch will auto-build the Docker image on DockerHub and either pass/fail.
3. Run the docker container (e.g. `docker run -d --name mern -v /home/akarnauc:/home/akarnauc -p9002:22 -p3000:3000 -p80:80 p443:443 -w /home/akarnauc swsc/mern /bin/startsvc.sh akarnauc`). From here, you can access the container externally (sshing on port 9002) or through da2 servers (e.g. `docker exec -it --user root mern bash`) where `mern` is the name of my container and I am accessing it as `root`.
4. Run `npm install`
5. Run the web server (`npm run start:dev` for development, `npm run start:prod` for production). NOTE: What these commands do is defined in `package.json`. You can (and should) modify this file to fit your needs. For example, only use port 80 on the live site, modify `package.json` to a different port for development (e.g. port 3000 which we exposed in prev docker command).

`config/config.js` contains database connections and jwtSecret for cookies (the latter should eventually be moved to a config file that is **excluded** from this repo).

## Project Structure
- I followed [this](https://www.youtube.com/watch?v=5oiXG9f6GO0&list=PLuNEz8XtB51K-x3bwCC9uNM_cxXaiCcRY) playlist when building the site. I recommend you refer back to it or following from the beginning if struggling with anything.
- Front-end (ReactJS) under `client/`
  - Split separate pages/re-usable pieces of code into React **components**, found under `client/app/components`
  - Communication between the front-end and back-end is handled by actions (functions) located in `client/actions`.
  - Routing between pages is handled in `client/app/index.js`.
  - Assets (images, css, etc) stored in `client/public/assets`.
- Back-end under `server/`
  - All databases collections are stored in `WoC`. To view these collections from command line: `mongo --host=da1` -> `use WoC;` -> `show collections;`. The main ones used are: `authors`, `users`, `profile`
  - Database schema (models) stored in `server/models`. These enforce a schema on our NoSQL Mongo database to validate all data.
  - Actual calls to the database, back-end logic, etc. is in `server/routes/api/users.js`.
  - `server/server.js` is like the "main()" of our back-end. Modify this file to control how the server gets deployed (e.g. dev environment vs. prod environment)

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
