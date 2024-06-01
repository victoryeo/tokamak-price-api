import express from "express";
import helmet from "helmet";
import { createYoga } from "graphql-yoga";
import schema from "./schema";
import "dotenv/config";

const PORT = process.env.PORT_NUMBER ?? 4000;

const app = express();
const yoga = createYoga({ schema });

const yogaRouter = express.Router();
// GraphiQL specefic CSP configuration
yogaRouter.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'style-src': ["'self'", 'unpkg.com'],
        'script-src': ["'self'", 'unpkg.com', "'unsafe-inline'"],
        'img-src': ["'self'", 'raw.githubusercontent.com']
      }
    }
  })
);
yogaRouter.use(yoga);

app.use(yoga.graphqlEndpoint, yogaRouter) ;

app.use(helmet());

app.listen(PORT, () => {
  console.log(`🚀Tokamak-price-api running on port ${PORT}⭐️`);
});

export default app;