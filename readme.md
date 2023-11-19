# server
Definitive Back-end Server

## folder scructure
```
server
├───base
├───config
├───docs
├───features
├───middlewares
├───models
├───public
└───routes
└───services
    ├───integration
    └───unit
└───.env
└───.env.example
└───.env.development
└───.gitignore
└───app.ts
└───deno.jsonc
└───Dockerfile


```

# Folders explanation

docs: automatically generated Swagger documentation



# How to run
```
deno run --allow-net --allow-read --allow-write app.ts [env]
```
Where env is the environment to run the server, it can be: 
local, development, staging, production

