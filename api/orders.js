const express = require("express");
const ordersRouter = express.Router();
const prisma = require("../db/prisma");
const requireUser = require("./utils");

ordersRouter.use((req, res, next) => {
  console.log("Request made to /orders");
  next();
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await prisma.orders.findMany();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:userId", async (req, res, next) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        userId: +req.params.userId,
      },
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  const { userId, isActive } = req.body;
  try {
    const createOrder = await prisma.orders.create({
      data: {
        userId,
        isActive
      },
      include: {
        product_orders: {
          include: {
            products: true
          }
        }
      }
    });
    console.log('Created order:', createOrder);

    res.send(createOrder);
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/:orderId", async (req, res, next) => {
  const { userId, isActive } = req.body;
  try {
    const updateOrder = await prisma.orders.update({
      where: {
        id: +req.params.orderId,
      },

      data: {
        userId,
        isActive,
      },
    });
    res.send(updateOrder);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  try {
    const deleteOrder = await prisma.orders.delete({
      where: {
        id: +req.params.orderId,
      },
    });
    res.send(deleteOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
