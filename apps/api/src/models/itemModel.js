const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {},
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const itemModel = mongoose.model('itemModel', itemSchema);
async function createItem() {
  let planObj = {
    name: 'Pulav',
    image: '../../images/pulav.jpeg',
    price: 159,
  };
  //with method 1
  //   let data = await planModel.create(planObj);
  //   console.log(data);
  //with method 2
  const doc = new itemModel(planObj);
  await doc.save();
}
module.exports = itemModel;
