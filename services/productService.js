const { baseURL } = require('../config/base.config');
const supertest = require('supertest');
const request = supertest(baseURL);

const getAllProducts = () => {
    return request.get('/products');
};

const getProductsById = (id) => {
    return request.get(`/products/${id}`)
}

const postProduct = (data) => {
    return request
        .post('/products')
        .send(data)
        .set('Accept', 'application/json')
}

module.exports = {
    getAllProducts,
    getProductsById,
    postProduct
};
