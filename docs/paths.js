module.exports = {
  paths: {
    "/auth/login": {
      post: {
        tags: ["Auth"],
        description: "Login de usuario",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserInput",
              },
            },
          },
        },
        responses: {
          200: { description: "Login correcto" },
          401: { description: "Credenciales incorrectas" },
        },
      },
    },

    "/products/products": {
      get: {
        tags: ["Products"],
        description: "Obtener todos los productos",
        responses: {
          200: {
            description: "Lista de productos",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
        },
      },
    },
  },
};