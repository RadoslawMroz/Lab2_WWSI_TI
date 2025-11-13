import express from "express";
import prisma from "../db.js";

const router = express.Router();

export let cart = {}; 
// struktura:
// cart[productId] = { qty, product }

// GET /api/cart
router.get("/", async (req, res) => {
  const items = Object.values(cart);

  const total = items.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  res.json({ items, total });
});

// POST /api/cart/add {product_id, qty}
router.post("/add", async (req, res) => {
  let { product_id, qty } = req.body;

  qty = Number(qty);
  if (qty <= 0) {
    return res.status(400).json({ error: "Ilość musi być > 0." });
  }

  const prod = await prisma.product.findUnique({
    where: { id: Number(product_id) }
  });

  if (!prod) return res.status(404).json({ error: "Produkt nie istnieje." });

  if (!cart[product_id]) {
    cart[product_id] = { product: prod, qty };
  } else {
    cart[product_id].qty += qty;
  }

  res.json(cart[product_id]);
});

// PATCH /api/cart/item {product_id, qty}
router.patch("/item", async (req, res) => {
  let { product_id, qty } = req.body;
  qty = Number(qty);
  if (qty <= 0) return res.status(400).json({ error: "Ilość musi być > 0." });

  if (!cart[product_id])
    return res.status(404).json({ error: "Tego produktu nie ma w koszyku." });

  cart[product_id].qty = qty;
  res.json(cart[product_id]);
});

// DELETE /api/cart/item/{product_id}
router.delete("/item/:id", (req, res) => {
  const id = req.params.id;
  if (!cart[id]) return res.status(404).json({ error: "Nie ma w koszyku." });

  delete cart[id];
  res.json({ ok: true });
});

export default router;
