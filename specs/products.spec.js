const { getAllProducts } = require('../services/productService');
const { baseURL } = require("../config/base.config");
const supertest = require("supertest");
const request = supertest(baseURL);

describe("Products API", () => {

    describe("GET /products", () => {
        let res;
        beforeAll(async () => {
            res = await getAllProducts();
        })

        it('should return a non-empty products list with status 200', () => {

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

        it('should return 404 for non-existent endpoint', async () => {
            invalidRes = await request.get('/productss');
            expect(invalidRes.status).toBe(404);
            expect(invalidRes.body).toBeDefined();
        });

    })
})