import express, { Request, Response } from "express";

const app = express();

app.get(
  "/",
  (req: Request, res: Response): Response => res.send("hello world")
);

app.listen(3333);
