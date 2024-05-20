import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import schema from "./schema";
import "dotenv/config";

const PORT = process.env.PORT_NUMBER || 4000;
const options = {
  port: PORT as number,
  cors: {
    origin: "*",
    credentials: true,
  },
};

async function main() {
  try {
    const yoga = createYoga({ schema });
    const server = createServer(yoga);
    server.listen(PORT, () => {
      console.log(`🚀Tokamak-price-api running on port ${PORT}⭐️`);
    });
  } catch (e) {
    console.log("**Error happened to the server**");
    console.log(e);
  }
}

main();
