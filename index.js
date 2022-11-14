const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv");
const { options } = require("./config/swagger")

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
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})


// --- Databases----
// ! Important: before service/ route registration
fastify.register(require("./routes/users"));

// --- Routes----
// ! Important: after swagger registration
fastify.get("/", function (req, reply) {
  reply.send({ message: "Hello! Go to /users instead" });
});

fastify.register(require("fastify-mongodb"), {
  forceClose: true,
  url: process.env.CONNECT_DB,
});
fastify.listen(8080, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
  fastify.swagger();
});





