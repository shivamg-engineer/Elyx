export const userSchemaV2 = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3, maxLength: 20 },
    age: { type: "number", minimum: 1 },
    email: { type: "string", format: "email" },
    role: { type: "string", enum: ["user", "admin"] }
  },
  required: ["username", "age", "email"],
  additionalProperties: false
};
