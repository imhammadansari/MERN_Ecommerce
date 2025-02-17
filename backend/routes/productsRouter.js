import express from 'express';
const router = express.Router();
import upload from "../config/multer-confiq.js";
import productsModel from "../models/product-model.js";


router.get("/", function (req, res) {
    res.send("Hey working")
});

router.post("/addproducts", upload.single("image"), async function (req, res) {
    try {
        if (!req.file) throw new Error("Image is required"); 
        let { name, price, description, brand, material, color, unitcount, dimensions, weight, size, discount, category, bestseller } = req.body;

        let product = await productsModel.create({
            image: req.file.buffer,
            name, 
            price, 
            description, 
            brand, 
            material, 
            color, 
            unitcount, 
            dimensions, 
            weight,
            size,
            discount, 
            category,
            bestseller
        });

        res.status(200).json({
            message: "Product added successfully",
            product: product
        });
    } catch (error) {

        res.status(400).json({
            message: "Error adding product",
            error: error.message
        });
    }
});

router.post("/editproduct/:id", upload.single("image"), async function (req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        price,
        description,
        brand,
        material,
        color,
        unitcount,
        dimensions,
        weight,
        size,
        discount,
        category,
        bestseller,
      } = req.body;
  
      let image = req.file ? `/uploads/${req.file.filename}` : null;
  
      if (!image) {
        const product = await productsModel.findById(id);
        image = product.image;
      }
  
      const updatedProduct = await productsModel.findOneAndUpdate(
        { _id: id },
        {
          name,
          price,
          description,
          brand,
          material,
          color,
          unitcount,
          dimensions,
          weight,
          size,
          discount,
          category,
          bestseller,
          image,
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedProduct) return res.status(400).send("Product does not exist");
  
      res.send({ status: "ok", updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error.message);
      res.status(400).json({
        message: "Error updating product",
        error: error.message,
      });
    }
  });
  
  
router.delete("/deleteproduct/:id", async function (req, res) {
  try {
      const { id } = req.params;

      let deletedProduct = await productsModel.findByIdAndDelete(id);

      if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
          message: "Product deleted successfully",
          product: deletedProduct
      });
  } catch (error) {
      res.status(500).json({
          message: "Error deleting product",
          error: error.message
      });
  }
});


router.get("/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      
      const products = category === 'all'
        ? await productsModel.find()
        : await productsModel.find({ category });
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Error retrieving products by category");
    }
  });
  

export default router;