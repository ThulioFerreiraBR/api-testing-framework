const { getAllProducts, getProductsById, postProduct } = require('../services/productService');
const { validateSchema } = require('../utils/schemaValidator');
const productsSchema = require('../schemas/products.schema.json');
const productSchema = require('../schemas/product.schema.json');
const { ProductFactory } = require('../factories/product.faker');
const { baseURL } = require('../config/base.config');
const supertest = require('supertest');
const request = supertest(baseURL);
const { validateProductResponse,
    validateCompleteProduct,
    validateProductsList } = require('../utils/validators/product.validator');

describe('Products API', () => {

    describe('GET /products', () => {

        describe('Functional Tests', () => {

            let productsResponse;
            beforeAll(async () => {
                productsResponse = await getAllProducts();
            });

            it('should return complete valid products list', () => {

                validateProductResponse(productsResponse, 200);
                validateProductsList(productsResponse.body);
            });
        });
/*
        describe('Negative Tests', () => {
            it('should return 404 for non-existent endpoint', async () => {
                const invalidResponse = await request.get('/productss');
                expect(invalidResponse.status).toBe(404);
                expect(invalidResponse.body).toEqual({});
            });
        });

        describe('Contract Tests', () => {
            it('should validate response schema', async () => {
                const contractResponse = await getAllProducts();
                validateProductResponse(contractResponse, 200);
                validateSchema(contractResponse.body, productsSchema);
            });
        });
        */
    });
/*
    describe('GET /products/:id', () => {

        describe('Functional Tests', () => {
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
                expect(productResponse).toBeDefined()
                const product = productResponse.body;
                validateProductResponse(productResponse, 200);
                expect(product.id).toBe(randomProduct.id);
                expect(product.title).toBe(randomProduct.title);
                expect(product.price).toBe(randomProduct.price);
                expect(product.description).toBe(randomProduct.description);
                expect(product.category).toBe(randomProduct.category);
            });

            it('should return product with valid business rules', () => {
                expect(productResponse).toBeDefined()
                const product = productResponse.body;
                validateCompleteProduct(product);
            });

        });

        describe('Negative Tests - Known FakeStoreAPI Limitations', () => {
            it.each([
                { id: 0, description: 'zero' },
                { id: -1, description: 'negative' },
                { id: 99999, description: 'non-existent' },
                { id: 'abc', description: 'invalid string' },
            ])(
                '[BUG-001] $description returns 200 incorrectly (expected: 404)',
                async ({ id }) => {
                    const invalidResponse = await getProductsById(id);
                    // Current API behavior
                    expect(invalidResponse.status).toBe(200);
                    // This SHOULD be 400 in a real API
                    expect(invalidResponse.body).toBe("");
                }
            );
        });

        describe('Contract Tests', () => {
            it('should validate response schema', async () => {
                const productResponse = await getProductsById(1);
                validateProductResponse(productResponse, 200);
                validateSchema(productResponse.body, productSchema);
            });
        });
    });

    describe('POST /products', () => {

        describe('Functional Tests', () => {
            it('should create a new product successfully', async () => {
                const newProduct = ProductFactory.valid();
                const productResponse = await postProduct(newProduct);
                validateProductResponse(productResponse, 201);
                validateCompleteProduct(productResponse.body);
                expect(productResponse.body.title).toEqual(newProduct.title);
                expect(productResponse.body.price).toEqual(newProduct.price);
                expect(productResponse.body.description).toEqual(newProduct.description);
                expect(productResponse.body.category).toEqual(newProduct.category);
                expect(productResponse.body.image).toEqual(newProduct.image);


            })
        });

        describe('Negative Tests - Known FakeStoreAPI Limitations', () => {

            it.each([
                {
                    scenario: 'missing title',
                    payload: ProductFactory.missingTitle()
                },
                {
                    scenario: 'negative price',
                    payload: ProductFactory.invalidPrice()
                },
                {
                    scenario: 'invalid price type',
                    payload: ProductFactory.invalidPriceType()
                }
            ])(
                '[BUG] API incorrectly accepts invalid payload: $scenario',
                async ({ payload }) => {
                    const response = await postProduct(payload);
                    // Current API behavior
                    expect(response.status).toBe(201);
                    // This SHOULD be 400 in a real API
                }
            );

        });

        describe('Contract Tests', () => {
            it('should validate response schema', async () => {
                const newProduct = ProductFactory.valid();
                const productResponse = await postProduct(newProduct);
                validateProductResponse(productResponse, 201);
                validateSchema(productResponse.body, productSchema);
            });
        });
    })
*/
});