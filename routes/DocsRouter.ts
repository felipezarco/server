// @deno-types='npm:@types/express'
import { Router } from "npm:express";
import Swagger from "../docs/Swagger.ts";

/*****************************************************************
  Zarco says: Docs will be generated based on @openai comments
  Swagger json files will be generated in ./docs/jsons
  New Swagger should only be instantiated in case of new independent api
******************************************************************/

const DocsRouter = Router();

const authSwagger = new Swagger({
  title: "Auth API Documentation",
  version: "1.0.0",
  routerPaths: [
    "./routes/AuthRouter.ts",
    "./features/auth/User/UserRouter.ts",
  ],
});

DocsRouter.use("/docs/auth", authSwagger.setupAndServe());

const unauthSwagger = new Swagger({
  title: "Unauth API Documentation",
  version: "1.0.0",
  routerPaths: [
    "./routes/UnauthRouter.ts",
  ],
});

DocsRouter.use("/docs/unauth", unauthSwagger.setupAndServe());

export default DocsRouter;
