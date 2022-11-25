const express = require("express");
const productOrdersRouter = express.Router();
const prisma = require("../db/prisma");
const requireUser = require("./utils");

productOrdersRouter.use((req, res, next) => {
    console.log("Request made to /product-orders");
    next();
});

productOrdersRouter.get("/", async (req, res, next) => {
    try {
        const productOrders = await prisma.product_orders.findMany();
        res.send(productOrders);
    } catch (error) {
        next(error);
    }
});

productOrdersRouter.post("/", async (req, res, next) => {
    const { orderId, productId, quantity } = req.body;
    try {
        const createdProductOrder = await prisma.product_orders.create({
            data: {
                orderId,
                productId,
                quantity
            },
            include: {
                products: true
            }
        });

        // console.log("Through Table", createProductOrder)

        // const product = await prisma.products.findUnique({
        //     where: {
        //         id: createProductOrder.productId
        //     }
        // })
        console.log("Return from prisma", createdProductOrder)
        res.send(createdProductOrder);
    } catch (error) {
        next(error);
    }
});

productOrdersRouter.delete(
    "/:productOrderId",
    requireUser,
    async (req, res, next) => {
        try {
            const deleteProductOrder = await prisma.product_orders.delete({
                where: {
                    id: +req.params.productOrderId,
                },
            });
            res.send(deleteProductOrder);
        } catch (error) {
            next(error);
        }
    }
);

productOrdersRouter.patch(
    "/:productOrderId",
    async (req, res, next) => {
        const { quantity } = req.body;
        try {
            const updateProductOrder = await prisma.product_orders.update({
                where: {
                    id: +req.params.productOrderId,
                },

                data: {
                    quantity
                },
            });
            res.send(updateProductOrder);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = productOrdersRouter