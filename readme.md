# server
Definitive Back-end Server

## folder scructure
```
server
├───base
├───config
├───docs
├───database
├───features
├───globals
├───jobs
├───middlewares
├───models
└───routes
└───services

```

# Folders explanation

**base**: contains the base classes for the server

**config**: contains the configuration files for the server

**database**: contains the database connection and models

**docs**: automatically generated Swagger documentation

**features**: contains the features of the server, each feature is a folder with its own controllers, services, models, etc.

**globals**: contains the global variables and functions

**jobs**: contains the background jobs that are executed in the server

**middlewares**: contains the middlewares that are used in the server

**models**: contains the entity models

**routes**: contains the routes to application endpoints

**services**: reusable business logic (might be done later when that becomes necessary)

# How to run
```
deno run --allow-net --allow-read --allow-write server.ts [env]
```
Where env is the environment to run the server, it can be: 
local, development, staging, production

