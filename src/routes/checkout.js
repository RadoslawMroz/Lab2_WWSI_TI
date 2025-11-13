import express from "express";
import prisma from "../db.js";
import { cart } from "./cart.js";

const router = express.Router();

// POST /api/checkout
router.post("/", async (req, res) => {
  const items = Object.values(cart);
  if (items.length === 0)
    return res.status(400).json({ error: "Koszyk jest pusty." });

  // utwórz zamówienie
  const order = await prisma.order.create({
    data: {}
  });

  // policz total
  let total = 0;

  for (const item of items) {
    const snapshotPrice = item.product.price;
    total += snapshotPrice * item.qty;

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: item.product.id,
        qty: item.qty,
        price: snapshotPrice
      }
    });
  }

  // wyczyść koszyk
  for (const key in cart) delete cart[key];

  res.status(201).json({ order_id: order.id, total });
});

export default router;
