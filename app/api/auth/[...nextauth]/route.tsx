import dns from "node:dns";

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

import { handlers } from "@/auth";
import { Agent, setGlobalDispatcher } from "undici";

const agent = new Agent({
  connect: {
    timeout: 30000,
  },
  headersTimeout: 30000,
  bodyTimeout: 30000,
});

setGlobalDispatcher(agent);

export const runtime = "nodejs";
export const { GET, POST } = handlers;