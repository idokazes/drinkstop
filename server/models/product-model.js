const Joi = require("joi");
const mongoose = require("mongoose");

const CATEGORIES = [
  "Beer",
  "Wine",
  "Whiskey",
  "Gin",
  "Vodka",
  "Rum",
  "Tequila",
  "Other",
];

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required().min(1),
  alcoholPercentage: Joi.number().required().min(1),
  volume: Joi.number().required().min(1),
  stock: Joi.number().required().min(1),
  image: Joi.string().required(),
  type: Joi.string()
    .required()
    .valid(...CATEGORIES),
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  alcoholPercentage: { type: Number, required: true },
  volume: { type: Number, required: true },
  stock: { type: Number, required: true, default: 100 },
  type: {
    type: String,
    required: true,
    enum: CATEGORIES,
  },
});

const ProductModel = mongoose.model("Products", productSchema);

module.exports = { ProductModel, productValidationSchema };

const exampleProducts = [
  {
    name: "Stella Artois",
    price: 10.99,
    image:
      "https://cdn.webshopapp.com/shops/65337/files/423611456/650x750x2/stella-artois.jpg",
    description: "A classic Belgian lager with a crisp and refreshing taste.",
    alcoholPercentage: 5.2,
    volume: 330,
    type: "Beer",
  },
  {
    name: "Château Margaux",
    price: 199.99,
    image: "https://wewine.co.il/wp-content/uploads/2022/02/10272-1.png",
    description: "An exquisite red wine with notes of blackcurrant and oak.",
    alcoholPercentage: 13.5,
    volume: 750,
    type: "Wine",
  },
  {
    name: "Jameson Irish Whiskey",
    price: 34.99,
    image:
      "https://www.bottlesandcases.com/images/sites/bottlesandcases/labels/jameson-irish-whiskey-lit_1.jpg",
    description: "Smooth and triple-distilled, a true Irish whiskey classic.",
    alcoholPercentage: 40,
    volume: 700,
    type: "Whiskey",
  },
  {
    name: "Bombay Sapphire",
    price: 27.99,
    image:
      "https://cdn11.bigcommerce.com/s-4nzgid62dq/images/stencil/1280x1280/attribute_rule_images/3116_source_1631888049.png",
    description: "A premium gin with a harmonious blend of botanicals.",
    alcoholPercentage: 47,
    volume: 750,
    type: "Gin",
  },
  {
    name: "Grey Goose Vodka",
    price: 39.99,
    image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c23c.png",
    description:
      "Crafted with the finest French ingredients for a smooth taste.",
    alcoholPercentage: 40,
    volume: 700,
    type: "Vodka",
  },
  {
    name: "Captain Morgan Spiced Rum",
    price: 22.99,
    image:
      "https://www.luekensliquors.com/wp-content/uploads/2018/09/107012-CAPTAIN-MORGAN-LTR.png",
    description: "A Caribbean spiced rum with a hint of vanilla and spices.",
    alcoholPercentage: 35,
    volume: 750,
    type: "Rum",
  },
  {
    name: "Patrón Silver Tequila",
    price: 49.99,
    image:
      "https://www.patrontequila.com/binaries/mediumretina/content/gallery/patrontequila/products/patron-silver/bottle.png",
    description:
      "Unaged and crystal clear, a premium tequila for sipping or mixing.",
    alcoholPercentage: 40,
    volume: 750,
    type: "Tequila",
  },
  {
    name: "Baileys Irish Cream",
    price: 21.99,
    image:
      "https://www.baileys.com/PR1748www.baileys.com/media/zpgppeol/baileys-original-irish-cream.png",
    description:
      "A creamy and luxurious liqueur, perfect for indulgent moments.",
    alcoholPercentage: 17,
    volume: 750,
    type: "Other",
  },
  {
    name: "Campari",
    price: 29.99,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2783132/800d3f9c-bd79-4fcd-b609-0cfd16d7f13e/750x500?webp=true",
    description:
      "A timeless Italian aperitif with a perfect balance of bitter and sweet notes.",
    alcoholPercentage: 25,
    volume: 750,
    type: "Other",
  },
];
