# server

A simple boilerplate for a Deno HTTP REST API webserver

### Folder scructure

```
server
├───base
├───config
├───docs
├───database
├───features
  ├─ [name]
    ├─ controller
    ├─ service
    ├─ test
    ├─ routes
├───globals
├───jobs
├───middlewares
├───models
└───routes
└───services
```

### Folders explanation

**base**: contains the base classes for the server, other classes inherit from
these.

**config**: contains the environment configuration classes

**database**: contains the database connection

**docs**: contains Swagger configuration and automatically generated
documentation

**features**: contains the many features of the server, each feature has its own
folder with the following structure:

- [auth/unauth/api] - feature folder goes inside the respective type
  - [feature_name]: contains these files:
    - **controller**: contains the controller for the feature
    - **test**: contains the tests for the feature
    - **service**: contains the service for the feature (optional if multiple
      routes use the same logic)
    - **routes**: contains the routes for the feature

**globals**: contains the global variables and functions

**jobs**: contains the background jobs that are executed in the server

**libs**: contains the libraries that are used in the server (those might become
an external package)

**middlewares**: contains the middlewares that are used in the server

**models**: contains the entity models

**routes**: contains the routes to application endpoints

**services**: contains services that are feature agnostic and are used by
multiple features

**vendor**: contains third party external apis implementations

# How to run

```
deno run --allow-net --allow-read --allow-write server.ts [env]
```

Where env is the environment to run the server, it can be: local, development,
staging, production
