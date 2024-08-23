// @deno-types='npm:@types/swagger-jsdoc'
import swaggerJsdoc from "npm:swagger-jsdoc";
// @deno-types='npm:@types/swagger-ui-express'
import swaggerUi from "npm:swagger-ui-express";
// @deno-types='npm:@types/express'
import { Router } from "npm:express";

import path from "node:path";

export type ISwagger = {
  title?: string;
  version?: string;
  openApiVersion?: string;
  customCssPath?: string;
  customJsPath?: string;
  routerPaths: Array<string>;
  generateJsonFile?: boolean;
  swaggerOptions?: swaggerUi.SwaggerOptions;
};

/*****************************************************************
  Zarco says: This is file should not be modified !
  (unless you need to update configurations to all swaggers)
  If you need a new swagger page checkout DocsRouter instead.
******************************************************************/

export default class Swagger {
  private openApiVersion = "3.0.0";
  private title = "API Documentation";
  private version = "1.0.0";
  private apis: Array<string> = [];
  private customCssPath = path.resolve("./custom/swagger.css");
  private customJsPath = path.resolve("./custom/swagger.js");
  private swaggerDocument: object = {};
  private generateJsonFile = true;
  private swaggerOptions: swaggerUi.SwaggerOptions = {};

  constructor(swagger: ISwagger) {
    if (swagger.title) this.title = swagger.title;
    if (swagger.version) this.version = swagger.version;
    if (swagger.openApiVersion) this.openApiVersion = swagger.openApiVersion;
    if (swagger.routerPaths) this.apis = swagger.routerPaths;
    if (swagger.customCssPath) this.customCssPath = swagger.customCssPath;
    if (swagger.customJsPath) this.customJsPath = swagger.customJsPath;
    if (swagger.generateJsonFile === false) this.generateJsonFile = false;
    if (swagger.swaggerOptions) this.swaggerOptions = swagger.swaggerOptions;
    this.generateDocument();
  }

  public generateDocument() {
    this.swaggerDocument = swaggerJsdoc({
      definition: {
        openapi: this.openApiVersion,
        info: {
          title: this.title,
          version: this.version,
        },
      },
      apis: this.apis,
      customCssUrl: this.customCssPath,
      customJs: this.customJsPath,
    });

    const fileName = `${this.title} (${this.version})`;

    if (this.generateJsonFile) {
      Deno.writeTextFileSync(
        `./docs/jsons/${fileName}.swagger.json`,
        JSON.stringify(this.swaggerDocument),
      );
    }

    return this.swaggerDocument;
  }

  private serve() {
    return swaggerUi.serveFiles(this.swaggerDocument, {
      explorer: true,
      customCssUrl: this.customCssPath,
      customJs: this.customJsPath,
      swaggerOptions: this.swaggerOptions,
    });
  }

  private setup() {
    return swaggerUi.setup(this.swaggerDocument);
  }

  public setupAndServe() {
    return Router().use(this.serve(), this.setup());
  }
}
