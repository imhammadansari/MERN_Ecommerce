import express from 'express';
const app = express();
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
const router = express.Router();
import mongoose from 'mongoose';
import dotenv from "dotenv";


import isLoggedin from "./middlewares/isLoggedin.js";
import ownersRouter from "./routes/ownersRouter.js";
import usersRouter from "./routes/usersRouter.js";
import productsRouter from "./routes/productsRouter.js";
import productsModel from "./models/product-model.js";
import userModel from "./models/user-model.js";
const __dirname = path.resolve();

dotenv.config();


app.use(cors({
    origin: "https://mern-ecommerce-rnup.onrender.com", 
    credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", router);


const PORT = process.env.PORT || 3000;
const URL = process.env.MONGODB_URL;
const connectDb = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connect Successful")
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); 
    }
}

connectDb();

router.get("/shop", async function (req, res) {
    try {
        
        const product = await productsModel.find();
        res.send({ status: "ok", product: product });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving products");
    }
});

router.post("/addtoCart/:productid", isLoggedin, async function (req, res) {
    try {
        const user = await userModel.findOne({ email: req.user.email }); 
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (!user.cart.includes(req.params.productid)) {
            user.cart.push(req.params.productid);
            await user.save();
        }

        res.send("Product added to cart");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding to cart");
    }
});

router.get("/items/:productid", async function (req, res) {  
    try {
        const productId = req.params.productid;  
        const product = await productsModel.findOne({ _id: productId }); 
        console.log("Item requested:", productId);

        if (!product) {
            return res.status(404).send("Product not found");
        } else {
            res.send({ status: "ok", product: product }); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving product");
    }
});


router.get("/addtoCart", isLoggedin, async function (req, res) {
    try {
        const user = await userModel.findOne({ email: req.user.email}).populate("cart");

        res.send({ status: "ok", user: user});
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving users");
        
    }
})

router.delete("/removeFromCart/:productid", isLoggedin, async function (req, res) {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const productIdToRemove = req.params.productid;
    user.cart = user.cart.filter((productId) => productId.toString() !== productIdToRemove);

    await user.save();

    res.send({ status: "ok", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error removing product from cart");
  }
});

router.post("/products/:productid/review", isLoggedin, async function (req, res) {
    try {
        const { name, comments, rating } = req.body;
        console.log("Details: ", name, comments, rating);

        // Validate inputs
        if (!name || !comments || !rating) {
            return res.status(400).send("All fields are fromd");
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).send("Rating must be between 1 and 5");
        }

        console.log("Product ID:", req.params.productid);

        const product = await productsModel.findOne({ _id: req.params.productid });
        if (!product) {
            return res.status(404).send("Product not found");
        }

        product.reviews.push({ name, comments, rating });
        console.log("Updated reviews:", product.reviews);

        // Ensure bestseller is a Boolean before saving
        if (typeof product.bestseller !== "boolean") {
            product.bestseller = false;
        }

        await product.save();
        res.send({ status: "ok", message: "Review added successfully" });
    } catch (error) {
        console.error("Error during product save:", error.message);
        res.status(500).send("Error adding review");
    }
});




router.post("/checkOut", isLoggedin, async function (req, res) {
    try {
        const { firstName, lastName, email, phoneNumber, streetAddress, city, zipcode, cardNumber, securityCode } = req.body;
        const user = await userModel.findOne({ email: req.user.email});

        if(!user) {
            return res.status(404).send("User Not Found");

        }

        user.personalInfo.push({
            firstName,
            lastName,
            email,
            phoneNumber,
            streetAddress,
            city,
            zipcode,
            cardNumber,
            securityCode
        })

        await user.save();

        res.send({ status: "ok", message: "Info Done"});
    } catch (error) {
        console.error(error);
        res.status(500).send("Error storing Customer Data");
    }
})

router.post("/placeOrder", isLoggedin, async function (req, res) {
    try {
        const { productIds, quantities, totalPrice, firstName, lastName, email, 
            phoneNumber, streetAddress, city, zipcode, cardNumber, securityCode } = req.body;

        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        user.orders.push({
            products: productIds.map((id, index) => ({
                productId: id,  
                quantity: quantities[index]  
            })),
            totalPrice: totalPrice, 
            orderDate: new Date(),  
            status: "Pending",
            firstName,
            lastName,
            email,
            phoneNumber,
            streetAddress,
            city,
            zipcode,
            cardNumber,
            securityCode
        });
        
        await user.save();  

        res.send({ status: "ok", message: "Order placed successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error placing order");
    }
});

router.get("/orderDetails", isLoggedin, async function (req, res) {
    try {
        const user = await userModel.findOne({ email: req.user.email }).populate({
            path: "orders.products.productId",
            model: "products"
        });

        if (!user) {
            return res.status(404).send("User Not Found");
        }

        const pendingOrders = user.orders.filter(product => product.status === "Pending");
        

        if (pendingOrders.length === 0) {
            return res.status(404).send("No Pending Orders");
        }

        res.send({ status: "ok", orders: pendingOrders });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving user");
    }
});

router.get("/allOrders", async function (req, res) {
    try {
        const users = await userModel.find().populate({
            path: "orders.products.productId",
            model: "products"
        });

        let allOrders = [];
        users.forEach(user => {
            if (user.orders.length > 0) {
                allOrders.push(...user.orders);
            }
        });

        if (allOrders.length === 0) {
            return res.status(404).send({ status: "error", message: "No orders available" });
        }

        res.send({ status: "ok", orders: allOrders });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Error retrieving orders" });
    }
});

router.post("/updateOrder/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const user = await userModel.findOne({ "orders._id": orderId });
        if (!user) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        user.orders.forEach(order => {
            if (order._id.toString() === orderId) {
                order.status = status;
            }
        });

        await user.save();

        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating order status" });
    }
});

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
