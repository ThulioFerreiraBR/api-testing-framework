const { baseURL } = require("../config/base.config");
const supertest = require("supertest");
const request = supertest(baseURL);

const getAllProducts = () => {
    return request.get('/products');
};

const getProductsById = (id) => {
    return request.get(`/products/${id}`)
}

module.exports = {
    getAllProducts,
    getProductsById
};
