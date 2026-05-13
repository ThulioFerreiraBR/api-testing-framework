const { faker } = require('@faker-js/faker');

class ProductFactory {

    static valid() {

        return {
            title: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department(),
            image: faker.image.imageUrl()
        };
    }

    static missingTitle() {

        const product = this.valid();
        delete product.title;
        return product;
    }

    static invalidPrice() {

        return {
            ...this.valid(),
            price: -10
        };
    }

    static invalidPriceType() {

        return {
            ...this.valid(),
            price: 'abc'
        };
    }

    static emptyTitle() {

        return {
            ...this.valid(),
            title: ''
        };
    }
}

module.exports = {
    ProductFactory
};