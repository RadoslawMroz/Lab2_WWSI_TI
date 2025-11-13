import express from "express";
import prisma from "../db.js";

const router = express.Router();

// GET /api/products
router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// POST /api/products
router.post("/", async (req, res) => {
  const { name, price } = req.body;

  if (!name) return res.status(400).json({ error: "Nazwa jest wymagana." });

  if (price == null || price < 0) {
    return res.status(400).json({ error: "Cena musi być >= 0." });
  }

  const product = await prisma.product.create({
    data: { name, price: Number(price) }
  });

  res.status(201).json(product);
});

export default router;
