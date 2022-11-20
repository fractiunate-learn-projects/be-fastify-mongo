const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv");
const { options } = require("./config/swagger")
import { routes } from "./modules/users/users.routes";


dotenv.config();

// --- Swagger----
fastify.register(require('@fastify/swagger'), {
    swagger: options
})

fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request: any, reply: any, next: any) { next() },
        preHandler: function (request: any, reply: any, next: any) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    transformSpecification: (swaggerObject: any, request: any, reply: any) => { return swaggerObject },
    transformSpecificationClone: true
})


// --- Databases----
// ! Important: before service/ route registration
fastify.register(routes);

// --- Routes----
// ! Important: after swagger registration
fastify.get("/", function (req: any, reply: any) {
    reply.send({ message: "Hello! Go to /users instead" });
});

fastify.register(require("fastify-mongodb"), {
    forceClose: true,
    url: process.env.CONNECT_DB,
});
fastify.listen(8080, function (err: any, address: string) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
    fastify.swagger();
});





