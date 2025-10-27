import express from "express";
const app = express();
export default app;

import fileRouter from "#api/fileRoutes";
import folderRouter from "#api/folderRoutes";

app.use(express.json());

app.use("/files", fileRouter);
app.use("/folders", folderRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Oopsy Poopsy. Something went wrong.");
});
