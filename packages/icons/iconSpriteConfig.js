const path = require("path");
const systemIconsPath = path.join(__dirname, "src", "icon-system");
const productIconsPath = path.join(__dirname, "src", "icon-product");

const iconDistConfigObj = {
  system: {
    inDir: systemIconsPath,
    filename: "system-icons-sprite.svg"
  },
  product: {
    inDir: productIconsPath,
    filename: "product-icons-sprite.svg"
  }
};

module.exports = iconDistConfigObj;
