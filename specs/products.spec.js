const { getAllProducts, getProductsById } = require('../services/productService');
const { validateSchema } = require('../utils/schemaValidator');
const productsSchema = require('../schemas/products.schema.json');
const productSchema = require('../schemas/product.schema.json');
const { baseURL } = require('../config/base.config');
const supertest = require('supertest');
const request = supertest(baseURL);

describe('Products API', () => {


    describe('Functional Tests - GET /products', () => {

        let productsResponse;
        beforeAll(async () => {
            productsResponse = await getAllProducts();
        });

        it('should return 200 and a list of products', () => {

            expect(productsResponse.status).toBe(200);
            expect(Array.isArray(productsResponse.body)).toBe(true);
            expect(productsResponse.body.length).toBeGreaterThan(0);
        });

        it('should return products with valid business rules (price, title, category)', () => {
            productsResponse.body.forEach((product) => {
                expect(product.price).toBeGreaterThan(0);
                expect(product.title.trim().length).toBeGreaterThan(0);
                expect(product.category.trim().length).toBeGreaterThan(0);
            });
        });

        it('should not return null values for critical fields', () => {
            productsResponse.body.forEach((product) => {
                expect(product.description).not.toBeNull();
            });
        });
    });

    describe('Negative Tests - Products API', () => {
        it('should return 404 for non-existent endpoint', async () => {
            const invalidResponse = await request.get('/productss');
            expect(invalidResponse.status).toBe(404);
            expect(invalidResponse.body).toEqual({});
        });
    });

    describe('Contract Tests - GET /products', () => {
        it('should validate response schema', async () => {
            const contractResponse = await getAllProducts();
            expect(contractResponse.status).toBe(200);
            validateSchema(contractResponse.body, productsSchema);
        });
    });

    describe('Products API - GET /products/:id', () => {
        let productResponse;
        beforeAll(async () => {
            productResponse = await getProductsById(1);
        });
        it('should return a product by id', () => {
            expect(productResponse.status).toBe(200);
            expect(productResponse.body.id).toBe(1);
        });

        it('should return product with valid business rules (price, title, category)', () => {
                expect(productResponse.body.price).toBeGreaterThan(0);
                expect(productResponse.body.title.trim().length).toBeGreaterThan(0);
                expect(productResponse.body.category.trim().length).toBeGreaterThan(0);
        });

        it('should not return null values for critical fields', () => {
            expect(productResponse.body.description).not.toBeNull();
        });
    });

    describe('Negative Tests - GET /products/:id', () => {
        it('should return empty string for invalid id', async () => {
            const invalidResponse = await getProductsById(0);
            // Expected REST behavior would be 404, but API returns 200 with empty object
            expect(invalidResponse.status).toBe(200);
            expect(invalidResponse.body).toBe("");
        });
    });

    describe('Contract Tests - GET /products/:id', () => {
        it('should validate response schema', async () => {
            const contractResponse = await getProductsById(1);
            expect(contractResponse.status).toBe(200);
            validateSchema(contractResponse.body, productSchema);
        });
    });

});