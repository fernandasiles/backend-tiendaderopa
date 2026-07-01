import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes";
import passport from "./passport";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use(passport.initialize());



app.use(routes);



app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Tienda de Ropa funcionando",
  });
});


app.use(errorHandler);

export default app;