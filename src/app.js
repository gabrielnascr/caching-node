import express from "express";
import morgan from "morgan";

import routes from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(routes);

app.listen(8080);
