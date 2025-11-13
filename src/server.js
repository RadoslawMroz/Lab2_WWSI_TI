import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import checkoutRouter from "./routes/checkout.js";

const app = express();
app.use(cors());
app.use(express.json());

// statyczny frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// trasy
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Shop running at http://localhost:${PORT}`));

