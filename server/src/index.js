import "reflect-metadata";
import express from "express";
import cors from "cors";
import orm from "./orm.js";
import requestRoutes from "./routes/requests.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/requests", requestRoutes);
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

await orm.getSchemaGenerator().updateSchema();

app.listen(4000, () => {
  console.log("server running on 4000");
});
