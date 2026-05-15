const { baseURL } = require('../config/base.config');
const supertest = require('supertest');
const request = supertest(baseURL);

const getAllProducts = () => {
    return request
        .get('/products')
        .set('User-Agent', 'Mozilla/5.0')
        .set('Accept', 'application/json');
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
