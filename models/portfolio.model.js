const { model, Schema } = require("mongoose");

const PortfolioSchema = new Schema(
  {
    username: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
    image: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Portfolio", PortfolioSchema);
