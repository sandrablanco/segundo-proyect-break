module.exports = {
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "65f1a123abc123",
          },
          username: {
            type: "string",
            example: "admin",
          },
          email: {
            type: "string",
            example: "admin@gmail.com",
          },
          role: {
            type: "string",
            example: "admin",
          },
        },
      },

      UserInput: {
        type: "object",
        properties: {
          username: { type: "string", example: "lucia" },
          email: { type: "string", example: "lucia@gmail.com" },
          password: { type: "string", example: "password123" },
        },
      },

      Product: {
        type: "object",
        properties: {
          _id: { type: "string", example: "65f1b222abc222" },
          title: { type: "string", example: "Camiseta blanca" },
          description: { type: "string", example: "Camiseta algodón" },
          image: { type: "string", example: "https://cloudinary..." },
          category: { type: "string", example: "Camisetas" },
          size: { type: "string", example: "M" },
          price: { type: "number", example: 19.99 },
        },
      },

      ProductInput: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          category: { type: "string" },
          size: { type: "string" },
          price: { type: "number" },
        },
      },
    },
  },
};