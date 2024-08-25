// @deno-types='npm:@types/express'
import express from "npm:express";
import responser from "npm:responser";
import responserror from "npm:responserror";
// @deno-types='npm:@types/cors'
import cors from "npm:cors";
// @deno-types='npm:@types/morgan'
import morgan from "npm:morgan";
// @deno-types='npm:@types/helmet'
import helmet from "npm:helmet";

import docsRouter from "./routes/DocsRouter.ts";
import unauthRouter from "./routes/UnauthRouter.ts";
import authRouter from "./routes/AuthRouter.ts";
import Env from "./config/Env.ts";
import { Database } from "./database/Database.ts";
import log from "./globals/output/log.ts";
import BackgroundJobs from "./jobs/BackgroundJobs.ts";
import InitializeRepositories from "./models/InitializeRepositories.ts";

const app = express();

app.use(cors());
app.use(helmet());

app.use(responser.default);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

/*****************************************************************
  Zarco says: Never split route path into multiple files
  It's good to be able to search "/my/awesome/route/complete/path"
******************************************************************/

app.use(docsRouter);
app.use(unauthRouter);
app.use(authRouter);

const db = new Database({
  hostname: "mongodbcluster.8twlhdy.mongodb.net",
  database: "MAIN_DATABASE",
  username: "mongoclusteradmin2845",
});

const responserrorInstance = new responserror.default();
app.use(responserrorInstance.errorHandler);

await db.connect();

InitializeRepositories();

if (app) {
  app.listen(Env.serverPort, () => {
    log(`
      Back-end is running on port ${Env.ip}:${Env.serverPort} (${Env.name})
    `);
  });
}

BackgroundJobs.enqueueBackgroundJobQueues();
