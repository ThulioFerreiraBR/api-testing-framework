const { faker } = require('@faker-js/faker');

const newProduct = {
    id: faker.datatype.number(),
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    image: faker.image.imageUrl(),

}

module.exports = {
    newProduct
};

