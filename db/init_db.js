const prisma = require("./prisma");
const {
  users,
  products,
  orders,
  categories,
  product_orders,
  productCategories,
} = require("./seedData");
async function dropTables() {
  console.log("Dropping All Tables...");
  // drop all tables, in the correct order
  try {
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS product_categories;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS product_orders;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS orders;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS categories;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS products;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS users;`;
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  console.log("Starting to build tables...");
  try {
    await prisma.$executeRaw`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      "shippingAddress" TEXT NOT NULL,
      "billingAddress" TEXT,
      "isAdmin" BOOLEAN DEFAULT false
    );`;
    await prisma.$executeRaw`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL, 
      description TEXT,
      condition BOOLEAN DEFAULT true,
      "inStock" BOOLEAN DEFAULT true,
      "imageURL" VARCHAR(2048)
    );`;
    await prisma.$executeRaw`
    CREATE TABLE categories (
      id SERIAL PRIMARY KEY,
      "categoryName" VARCHAR(255)
    );`;
    await prisma.$executeRaw`
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "isActive" BOOLEAN DEFAULT true
    );`;
    await prisma.$executeRaw`
    CREATE TABLE product_orders (
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL,
      UNIQUE ("productId", "orderId")

    );`;
    await prisma.$executeRaw`
    CREATE TABLE product_categories (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id) ON DELETE CASCADE,
      "categoryId" INTEGER REFERENCES categories(id)
    );`;
  } catch (error) {
    console.error("Error creating tables!");
  }
}

const seedDb = async () => {
  console.log("creating users...");
  for (const user of users) {
    const createdUser = await prisma.users.create({ data: user });
    console.log(createdUser);
  }

  console.log("creating products...");
  for (const product of products) {
    const prod = await prisma.products.create({ data: product });
    console.log(prod);
  }
  console.log("creating orders...");
  for (const order of orders) {
    const createdOrder = await prisma.orders.create({ data: order });
    console.log(createdOrder);
  }
  console.log("creating categories...");
  for (const category of categories) {
    const createdCategory = await prisma.categories.create({ data: category });
    console.log(createdCategory);
  }
  console.log("creating productOrders...");
  for (const product of product_orders) {
    const createdProduct = await prisma.product_orders.create({
      data: product,
    });
    console.log(createdProduct);
  }
  console.log("creating productCategories..");
  for (const category of productCategories) {
    const productCat = await prisma.product_categories.create({
      data: category,
    });
    console.log(productCat);
  }
};

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await seedDb();
  } catch (error) {
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
