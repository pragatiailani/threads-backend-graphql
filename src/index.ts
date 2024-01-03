import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
    const app = express();

    const PORT = process.env.PORT || 8000;

    app.use(express.json());

    // Create Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String
            }
        `,
        resolvers: {
            Query: {
                hello: () => `Hey there`,
                say: (_, { name }: { name: string }) =>
                    `Hey, ${name}! How are you, darlin!?`,
            },
        },
    });

    // Start the gql server
    await gqlServer.start();

    app.use("/graphql", expressMiddleware(gqlServer));

    app.get("/", (req, res) => {
        res.json({ message: "Server is up and running" });
    });

    app.listen(PORT, () => console.log(`Server started at: ${PORT}`));
}

init();
