import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: "Kawa ziarnista 1kg", price: 79.90 },
    { name: "Kubek porcelanowy", price: 24.50 },
    { name: "Notes A5 kropki", price: 12.00 },
    { name: "Długopis żelowy", price: 5.99 }
  ];

  console.log("Dodawanie produktów startowych...");

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log("Zakończono seedowanie.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
