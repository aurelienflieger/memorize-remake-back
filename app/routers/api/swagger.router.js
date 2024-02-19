import express from "express";
import swaggerUi from "swagger-ui-express";
import yamljs from "yamljs";

const swaggerRouter = express.Router();

const swaggerDocument = yamljs.load("docs/api/v1/openapi.yaml");

swaggerRouter.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default swaggerRouter;