const { baseURL } = require("../config/base.config");
const supertest = require("supertest");
const request = supertest(baseURL);

const getAllProducts = () => {
        return request.get('/products');
    };

module.exports = {
    getAllProducts
};
