import { EntitySchema } from "@mikro-orm/core";

export const RequestLog = new EntitySchema({
  name: "RequestLog",
  properties: {
    id: { primary: true, type: "number" },
    method: { type: "string" },
    url: { type: "string" },
    headers: { type: "text" },
    body: { type: "text", nullable: true },
    status: { type: "number" },
    responseTime: { type: "number" },
    createdAt: { type: "datetime", onCreate: () => new Date() }
  }
});
