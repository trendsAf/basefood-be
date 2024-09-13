import { responses } from "./responses";

const userProperties = {
  firstName: { type: "string" },
  lastName: { type: "string" },
  email: { type: "string", format: "email" },
  companyName: { type: "string" },
  companyAddress: { type: "string" },
  companyCategory: { type: "string" },
  position: { type: "string" },
  password: { type: "string", format: "password" },
};

const userResponseProperties = {
  id: { type: "integer" },
  firstName: userProperties.firstName,
  lastName: userProperties.lastName,
  email: userProperties.email,
  companyName: userProperties.companyName,
  companyAddress: userProperties.companyAddress,
  companyCategory: userProperties.companyCategory,
  position: userProperties.position,
  role: { type: "string" },
};

const userPaths = {
  "/users": {
    post: {
      tags: ["Users"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "firstName",
                "lastName",
                "email",
                "companyName",
                "companyAddress",
                "companyCategory",
                "position",
                "password",
              ],
              properties: userProperties,
            },
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  user: {
                    type: "object",
                    properties: userResponseProperties,
                  },
                },
              },
            },
          },
        },
        409: responses[409],
        500: responses[500],
      },
    },
    get: {
      tags: ["Users"],
      summary: "Get all users",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: userResponseProperties,
                },
              },
            },
          },
        },
        500: responses[500],
      },
    },
  },
  "/users/login": {
    post: {
      tags: ["Users"],
      summary: "User login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string", format: "email" },
                password: { type: "string", format: "password" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer" },
                  message: { type: "string" },
                  token: { type: "string" },
                  user: {
                    type: "object",
                    properties: userResponseProperties,
                  },
                },
              },
            },
          },
        },
        401: responses[401],
        404: responses[404],
        500: responses[500],
      },
    },
  },
  "/users/{id}": {
    get: {
      tags: ["Users"],
      summary: "Get user by ID",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: userResponseProperties,
              },
            },
          },
        },
        404: responses[404],
        500: responses[500],
      },
    },
    put: {
      tags: ["Users"],
      summary: "Update user",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: userProperties,
            },
          },
        },
      },
      responses: {
        200: {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  user: {
                    type: "object",
                    properties: userResponseProperties,
                  },
                },
              },
            },
          },
        },
        404: responses[404],
        500: responses[500],
      },
    },
    delete: {
      tags: ["Users"],
      summary: "Delete user",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "User deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
              },
            },
          },
        },
        404: responses[404],
        500: responses[500],
      },
    },
  },
};

export default userPaths;
