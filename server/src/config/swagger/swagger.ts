import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import definition from "./definition";

class Swagger {
  private _options: swaggerJSDoc.Options = {
    definition: definition,
    apis: [path.join(__dirname, "../routers/*.ts")],
  };

  serve() {
    return swaggerUi.serve;
  }

  setup() {
    const specs = swaggerJsdoc(this._options);

    return swaggerUi.setup(specs);
  }

  addPathAndOperation(value: any) {
    const { METHOD, ROUTE, OPERATION } = value;
    this._options.definition!.paths[value.ROUTE] = {
      ...(this._options.definition!.paths[ROUTE] || {}),
      [METHOD]: OPERATION,
    };
  }
}

export default new Swagger();
