const { getAllProducts, getProductsById, postProduct } = require('../services/productService');
const { validateSchema } = require('../utils/schemaValidator');
const productsSchema = require('../schemas/products.schema.json');
const productSchema = require('../schemas/product.schema.json');
const { newProduct } = require('../factories/product.faker');
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
        let randomProduct;

        beforeAll(async () => {
            const allProductsResponse = await getAllProducts();
            const allProducts = allProductsResponse.body;
            expect(allProducts.length).toBeGreaterThan(0);
            const randomIndex = Math.floor(Math.random() * allProducts.length);
            randomProduct = allProducts[randomIndex];
            const productId = randomProduct.id;
            productResponse = await getProductsById(productId);
        });

        it('should return consistent product data between list and detail endpoints', () => {
            const product = productResponse.body;
            expect(productResponse.status).toBe(200);
            expect(product.id).toBe(randomProduct.id);
            expect(product.title).toBe(randomProduct.title);
            expect(product.price).toBe(randomProduct.price);
            expect(product.description).toBe(randomProduct.description);
            expect(product.category).toBe(randomProduct.category);
        });

        it('should return product with valid business rules', () => {
            const product = productResponse.body;
            expect(product.price).toBeGreaterThan(0);
            expect(product.title.trim().length).toBeGreaterThan(0);
            expect(product.category.trim().length).toBeGreaterThan(0);
        });

        it('should not return null or empty values for critical fields', () => {
            const product = productResponse.body;
            expect(typeof product.description).toBe('string');
            expect(product.description.trim().length).toBeGreaterThan(0);
        });

    });

    describe('Negative Tests - GET /products/:id', () => {
        it.each([
            { id: 0, description: 'zero' },
            { id: -1, description: 'negative' },
            { id: 99999, description: 'non-existent' },
            { id: 'abc', description: 'invalid string' },
        ])(
            '[BUG-001] $description returns 200 incorrectly (expected: 404)',
            async ({ id }) => {
                const invalidResponse = await getProductsById(id);
                expect(invalidResponse.status).toBe(200); // current behavior, not the correct one
                expect(invalidResponse.body).toBe("");
            }
        );
    });

    describe('Contract Tests - GET /products/:id', () => {
        it('should validate response schema', async () => {
            const contractResponse = await getProductsById(1);
            expect(contractResponse.status).toBe(200);
            validateSchema(contractResponse.body, productSchema);
        });
    });

    describe('Functional Tests - POST /products', () => {
        it('should create a neww product', async () => {
            const productResponse = await postProduct(newProduct);
            expect(productResponse.status).toBe(201);
        })
    });

});