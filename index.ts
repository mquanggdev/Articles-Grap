import express, { Express, Request, Response } from "express";
import env from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { connect } from "./config/database";
import { gql } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolver";
import { requireAuth } from "./middlewares/auth.middleware";


const startServer = async () => {
    env.config();
    connect();
    const app: Express = express();
    const port: (number | string) = `${process.env.PORT}` || 3000;
    //Graphql
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs, // thằng này định nghĩa kiểu dữ liệu
        resolvers: resolvers, // thằng này thì trả dữ liệu dựa trên key được định nghĩa ở typeDefs,
        context : (context) => {
            return context;
        }

    })
    app.use("/graphql", requireAuth);
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app : app,
        path : `/graphql`
    })

    app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    });
}
startServer();