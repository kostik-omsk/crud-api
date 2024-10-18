import "dotenv/config";
import cluster, { Worker } from "node:cluster";
import { cpus } from "node:os";
import { URL } from "node:url";
import { createServer } from "node:http";

import startServer from "./startServer";

const NUM_CPUS = cpus().length;
const PORT = Number(process.env.PORT) || 4000;
const BASE_URL = `http://localhost:${PORT}`;

if (cluster.isPrimary) {
  const workerInstances: Worker[] = [];

  for (let i = 1; i <= NUM_CPUS; i++) {
    const worker = cluster.fork({ WORKER_INDEX: i });
    workerInstances.push(worker);
  }

  let round = 1;

  createServer((req, res) => {
    const targetUrl = new URL(BASE_URL);
    targetUrl.pathname = req.url || "";
    targetUrl.port = String(PORT + (round++ % NUM_CPUS));
    res.writeHead(307, { Location: targetUrl.href });
    res.end();
  }).listen(PORT, () => {
    console.log(`Load balancer is running on port ${PORT}`);
  });
} else {
  const workerIndex = process.env.WORKER_INDEX;
  const workerPort = PORT + Number(workerIndex);
  startServer()
    .on("request", (req) => {
      console.log(`Worker ${workerIndex}: Method: ${req.method}, URL: ${req.url}`);
    })
    .listen(workerPort, () => {
      console.log(`Worker ${workerIndex} is running on port ${workerPort}`);
    });
}
