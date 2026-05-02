const { getAllProducts } = require('../services/productService');

describe("Products API", () =>{

    describe("GET /products", () =>{
        it('should return a list of all products with status 200', async () => {
            const res = await getAllProducts();
            expect (res.status).toBe(200);
        })
    })
})