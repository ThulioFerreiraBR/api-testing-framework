const { getAllProducts } = require('../services/productService');
const { validateSchema } = require("../utils/schemaValidator");
const schema = require('../schemas/products.schema.json');
const { baseURL } = require("../config/base.config");
const supertest = require("supertest");
const request = supertest(baseURL);

describe("Products API", () => {
    let res;
    beforeAll(async () => {
        res = await getAllProducts();
    })

    describe("Functional Tests - GET /products", () => {

        it('should return 200 and a list of products', () => {

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        })

        it('should return products with valid business rules (price, title, category)', () => {
            res.body.forEach((product) => {
                expect(product.price).toBeGreaterThan(0);
                expect(product.title.trim().length).toBeGreaterThan(0);
                expect(product.category.trim().length).toBeGreaterThan(0);
            });
        });

        it('should not return null values for critical fields', () => {
            res.body.forEach((product) => {
                expect(product.description).not.toBeNull();
            });
        });
    });


    describe("Negative Tests - Products API", () => {
        it('should return 404 for non-existent endpoint', async () => {
            const invalidRes = await request.get('/productss');
            expect(invalidRes.status).toBe(404);
            expect(invalidRes.body).toBeDefined();
        });
    })

    describe("Contract Tests - GET /products", () => {

        it("should validate response schema", () => {
            expect(res.status).toBe(200);
            validateSchema(res.body, schema);
        });
    });
});