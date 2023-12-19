# The chat room

## Prerequisites

- Docker
- Node 20.8.1 or NVM (we have provided an `.nvmrc` file so you could just run `nvm use`)
- Yarn

## Running the application

### Server

- Open a new terminal (or tab)
- Navigate to the `./server` folder.
- Run `yarn install` to install packages.
- Run `cp .env.example .env` to duplicate the example file so it can become the main source of environment variables for the application.
- Run `docker-compose up`.
- Open a new terminal (or tab) in the same location to run `yarn start:dev` in case you want to run it for development purposes or just `yarn start`.
- Logs should be easy to interpretate.

##### Comments

- Application is build in express, provides a socket connection and RESTful APIs to handle data. It is built in javascript for no reason even that I might have been in Typescript using Nodejs.
- All environment variables are preprocessed in the config folder.
- No injection pattern for services was provided since this was an specific demo that required simple connection with node.
- As part of separation of concerns, a some code might look similar, this is in order to make a feature maintainable and not create one `smart` code that can be reused.
- APIs provided are in the form of `/api/v1/messages|authors`.
- No postman file was provided as the application interface should be pretty simple.
- We are doing two steps validation, one at the controller level to check that the provided params are the proper ones. The other one is at the model's method level.
- We are not providing linters or prettier functions or git hooks (like husky does) as we think that should be for a "more than one developer" environment.
- No general error handler was provided.

### Client

- Open a new terminal (or tab)
- Navigate to the `./client` folder.
- Run `yarn install` to install packages.
- Run `cp .env.example .env` to duplicate the example file so it can become the main source of environment variables for the application.
- Run `yarn start`.
- Logs should be easy to interpretate.

##### Comments

- Client is run with Craco React for simple aliasing and changing ports in one file.
- No hooks or over engineered code was provided.
- No router was added.
- Client need to connect to server's APIs and socket to work properly.
- Made only to work only on development mode.
- Instead of using files for css preprocessors, I've implemented `styled-components` which is a CSSInJs tool that works pretty well with AntD components which is the main component's library used in this project. At risk of making this sound a bad practice, would like to mention that for the purposes of the demo works great as is state-isolated, reusable, and it's string tagged templates syntax uses SASS|SCSS.

### Contributor notes

Thanks for reading, hope the demo is good enough for your standards.
