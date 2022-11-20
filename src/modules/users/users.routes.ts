import { listUsers, addUser, getUser, updateUser, deleteUser } from './users.controller'

const getUsersopts = {
  schema: {
    tags: ['user', 'code'],
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
          },
        },
      },
    },
  },
  handler: listUsers,
};

const getUserOpts = {
  schema: {
    tags: ['user', 'code'],
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          age: { type: "integer" },
        },
      },
    },
  },
  handler: getUser,
};

const updateItemOpts = {
  schema: {
    tags: ['user', 'code'],
    body: {
      type: "object",
      required: ["name", "age"],
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: updateUser,
};
const postUserOpts = {
  schema: {
    tags: ['user', 'code'],
    body: {
      type: "object",
      required: ["name", "age"],
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          age: { type: "integer" },
        },
      },
    },
  },
  handler: addUser,
};
const deleteUserOpts = {
  schema: {
    tags: ['user', 'code'],
    response: {
      200: {
        type: "string",
      },
    },
  },
  handler: deleteUser,
};

export async function routes(fastify: any, options: any) {
  fastify.get("/users", getUsersopts);
  fastify.post("/users", postUserOpts);
  fastify.get("/users/:id", getUserOpts);
  fastify.put("/users/:id", updateItemOpts);
  fastify.delete("/users/:id", deleteUserOpts);
}
