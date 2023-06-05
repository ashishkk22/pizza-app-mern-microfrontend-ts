const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    category: {
      type: String,
      ref: "categoryModel",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    hit: {
      type: Boolean,
      required: true,
      default: false,
    },
    publish: {
      type: Boolean,
      require: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const itemModel = mongoose.model("itemModel", itemSchema);

//to save the record with loop from json with iife
// async function createItem() {
//   let planObj = {
//     name: "Pulav",
//     image: "../../images/pulav.jpeg",
//     price: 159,
//   };
//   //with method 1
//   //   let data = await planModel.create(planObj);
//   //   console.log(data);
//   //with method 2
//   const doc = new itemModel(planObj);
//   await doc.save();
// }
module.exports = itemModel;
