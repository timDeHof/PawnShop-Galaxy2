const users = [
  {
    username: "albert",
    password: "bertie99",
    name: "albert",
    shippingAddress: "somewhere",
  },
  {
    username: "sandra",
    password: "sandra123",
    name: "sandra",
    shippingAddress: "nowhere",
    billingAddress: "also nowhere",
  },
  {
    username: "glamgal",
    password: "glamgal123",
    name: "gg",
    shippingAddress: "anywhere",
  },
  {
    username: "adminACC",
    password: "badpassword",
    name: "Admin",
    shippingAddress: "anywhere",
    isAdmin: true,
  },
];

const products = [
  {
    name: "Robot",
    price: 99999.99,
    description: "It punches stuff",
    condition: true,
    inStock: true,
    imageURL:
      "https://res.cloudinary.com/fullstack-academy-student/image/upload/v1650389197/81rG1kRmBLL._AC_SL1500__dn6mts.jpg",
  },
  {
    name: "PRS Guitar",
    price: 1600.0,
    description: "Used paul reed smith",
    condition: false,
    inStock: true,
    imageURL:
      "https://res.cloudinary.com/fullstack-academy-student/image/upload/v1650389255/PRSRedFlame3_k23zac.jpg",
  },
  {
    name: "Free Planet",
    price: 0.0,
    description: "Getting rid of my old planet",
    condition: false,
    inStock: true,
    imageURL:
      "https://res.cloudinary.com/fullstack-academy-student/image/upload/v1650389363/RS39420302815_Winner_Infrared_20Saturn_20_C2_A9_20La_CC_81szlo_CC_81_20Francsics_rgrjqd.jpg",
  },
  {
    name: "100 acres of martian surface",
    price: 100.0,
    description: "An original 100-acre Stellar Society martian piece of land",
    condition: false,
    inStock: true,
    imageURL:
      "https://res.cloudinary.com/dvb5py1ef/image/upload/v1651193192/OSIRIS_Mars_true_color_njxqa7.jpg",
  },
  {
    name: "Perri-air Salt-Free Air",
    price: 19.99,
    description:
      "An original can of Perri-air Naturally Sparkling Salt-Free Air",
    condition: true,
    inStock: true,
    imageURL:
      "https://res.cloudinary.com/dvb5py1ef/image/upload/v1650502483/Spaceballs-Spaceballs-Replica-Perri-Air-Can-1_bwcahn.jpg",
  },
  {
    name: "Thanos' Gauntlet",
    price: 59.99,
    description:
      "You'll be ready to rule the Galaxy with golden gauntlet with multi colored stones",
    condition: true,
    inStock: true,
    imageURL:
      "https://res.cloudinary.com/dvb5py1ef/image/upload/v1651193876/il_794xN.3680892738_aar3_p7eiaw.jpg",
  },
  {
    name: "Moon Necklace",
    price: 129.99,
    description:
      "Moon Rock Pendant with real lunar meteorite granules with 20 sterling silver chain",
    condition: true,
    inStock: true,
    imageURL:
      "https://res.cloudinary.com/dvb5py1ef/image/upload/v1651194708/IMG_1931_obcouk.jpg",
  },
  {
    name: "Sputnik 1",
    price: 135.98,
    description:
      "Own the first artificial Earth Satellite that triggered the Space Race",
    condition: false,
    inStock: true,
    imageURL:
      "https://res.cloudinary.com/dvb5py1ef/image/upload/v1651195243/300px-Sputnik_asm_gvxlmz.jpg",
  },
  {
    name: "Towel",
    price: 19.99,
    description:
      "A towel is the most massively useful thing an interstellar hitchhiker can carry",
    condition: true,
    inStock: true,
    imageURL:
      "https://res.cloudinary.com/dvb5py1ef/image/upload/v1651195782/iu_n1lfei.jpg",
  },
  {
    name: "Babel Fish",
    price: 42.0,
    description:
      "A small, bright yellow fish, which can be placed in someone's ear in order for them to be able to hear any language translated into their first language",
    condition: false,
    inStock: true,
    imageURL:
      "https://res.cloudinary.com/dvb5py1ef/image/upload/v1651196600/iu_mqwlte.jpg",
  },
];

const orders = [
  { userId: 1, isActive: true },
  { userId: 2, isActive: true },
  { userId: 1, isActive: false },
];

const categories = [
  { categoryName: "musicEquipment" },
  { categoryName: "spaceStuff" },
  { categoryName: "property" },
  { categoryName: "beverage" },
  { categoryName: "jewelry" },
  { categoryName: "personalCare" },
];

const product_orders = [
  { orderId: 1, productId: 2, quantity: 5 },
  { orderId: 1, productId: 1, quantity: 5 },
];

const productCategories = [
  { productId: 2, categoryId: 2 },
  { productId: 1, categoryId: 1 },
  { productId: 3, categoryId: 2 },
  { productId: 4, categoryId: 3 },
  { productId: 5, categoryId: 4 },
  { productId: 6, categoryId: 5 },
  { productId: 7, categoryId: 5 },
  { productId: 8, categoryId: 2 },
  { productId: 9, categoryId: 6 },
  { productId: 10, categoryId: 6 },
];
module.exports = {
  users,
  products,
  orders,
  categories,
  product_orders,
  productCategories,
};
