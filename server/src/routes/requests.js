import express from "express";
import orm from "../orm.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { method, url, headers, body } = req.body;

  if (!method || !url) {
    return res.status(400).json({ error: "invalid request payload" });
  }

  const safeHeaders =
    headers && Object.keys(headers).length ? headers : {};

  const safeBody =
    method === "GET" || method === "DELETE"
      ? undefined
      : body || undefined;

  const start = Date.now();

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: safeHeaders,
      body: safeBody ? JSON.stringify(safeBody) : undefined
    });
  } catch {
    return res.status(400).json({ error: "request failed" });
  }

  const time = Date.now() - start;

  let responseBody;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = await response.text();
  }

  const em = orm.em.fork();

  const record = em.create("RequestLog", {
    method,
    url,
    headers: safeHeaders,
    body:
      method === "GET" || method === "DELETE"
        ? null
        : safeBody,
    status: response.status,
    responseTime: time
  });

  await em.persistAndFlush(record);

  res.json({
    status: response.status,
    time,
    body: responseBody
  });
});

router.get("/", async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 5, 50);
  const offset = Number(req.query.offset) || 0;

  const em = orm.em.fork();

  const [data, total] = await em.findAndCount(
    "RequestLog",
    {},
    {
      limit,
      offset,
      orderBy: { createdAt: "DESC" }
    }
  );

  res.json({
    data,
    total,
    limit,
    offset
  });
});

export default router;
