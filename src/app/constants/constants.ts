export const sequelize = {
  name: 'SEQUELIZE',
};

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expires: process.env.JWT_EXPIRES,
};

export const bcryptConstants = {
  saltLevel: process.env.SALT_LEVEL,
};

export const categoriesConstants = {
  categories_repository: 'CATEGORIES_REPOSITORY',
};

export const productsConstants = {
  products_repository: 'PRODUCTS_REPOSITORY',
};

export const ordersConstants = {
  orders_repository: 'ORDERS_REPOSITORY',
  orderItems_repository: 'ORDERITEMS_REPOSITORY',
};

export const usersConstants = {
  users_repository: 'USERS_REPOSITORY',
  roles_repository: 'ROLES_REPOSITORY',
};
