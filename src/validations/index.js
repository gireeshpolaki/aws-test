const Ajv = require("ajv");
const ajv = new Ajv();

const productSchema = {
  type: "object",
  properties: {
    price: { type: "number" },
    name: { type: "string" },
  },
  required: ["price", "name"],
  additionalProperties: true,
};

module.exports.validateProduct = ajv.compile(productSchema);
