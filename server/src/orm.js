import { MikroORM } from "@mikro-orm/sqlite";
import { RequestLog } from "./entities/RequestLog.js";

const orm = await MikroORM.init({
  entities: [RequestLog],
  dbName: "requests.db",
});

export default orm;
