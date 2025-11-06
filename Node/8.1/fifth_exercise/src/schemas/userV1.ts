export const userSchemaV1 = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3, maxLength: 20 },
    age: { type: "number", minimum: 1 }
  },
  required: ["username", "age"],
  additionalProperties: false
};
