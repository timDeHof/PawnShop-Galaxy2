const express = require("express");
const productsRouter = express.Router();
const prisma = require("../db/prisma");
const requireUser = require("./utils");

productsRouter.use((req, res, next) => {
  console.log("Request made to /products");
  next();
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await prisma.products.findMany();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const getProductsById = await prisma.products.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    res.send(getProductsById);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  const { name, price, description, condition, imageURL } = req.body;
  try {
    const createProduct = await prisma.products.create({
      data: {
        name,
        price,
        description,
        condition,
        imageURL,
      },
    });
    res.send(createProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/category/:categoryId", async (req, res, next) => {
  try {
    const getProductsByCat = await prisma.product_categories.findMany({
      where: {
        categoryId: +req.params.categoryId,
      },
    });
    res.send(getProductsByCat);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch(
  "/:productId",
  async (req, res, next) => {
    const { name, price, description, condition, inStock, imageURL } = req.body;
    try {
      const updateProduct = await prisma.products.update({
        where: {
          id: +req.params.productId,
        },

        data: {
          name,
          price,
          description,
          condition,
          inStock,
          imageURL,
        },
      });
      res.send(updateProduct);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.delete(
  "/:productId",
  async (req, res, next) => {
    try {
      const deletedProduct = await prisma.products.delete({
        where: {
          id: +req.params.productId,
        },
      });
      res.send(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productsRouter;
