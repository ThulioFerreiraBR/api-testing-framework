function validateProductBusinessRules(product) {

    expect(product.price).toBeGreaterThan(0);
    expect(product.title.trim().length).toBeGreaterThan(0);
    expect(product.category.trim().length).toBeGreaterThan(0);
    expect(product.description.trim().length).toBeGreaterThan(0);
}

function validateRequiredFields(product) {

    expect(product.id).toBeDefined();
    expect(product.title).toBeDefined();
    expect(product.price).toBeDefined();
    expect(product.description).toBeDefined();
    expect(product.category).toBeDefined();
    expect(product.image).toBeDefined();
}

function validateProductTypes(product) {

    expect(typeof product.id).toBe('number');
    expect(typeof product.title).toBe('string');
    expect(typeof product.price).toBe('number');
    expect(typeof product.description).toBe('string');
    expect(typeof product.category).toBe('string');
    expect(typeof product.image).toBe('string');
}

function validateImageUrl(product) {

    expect(product.image).toMatch(/^https?:\/\/.+/);
}

function validateProductResponse(response, statusCode) {

    expect(response.status).toBe(statusCode);
    expect(response.headers['content-type']).toContain('application/json');
}

function validateCompleteProduct(product) {

    validateRequiredFields(product);
    validateProductTypes(product);
    validateProductBusinessRules(product);
    validateImageUrl(product);
}

function validateProductsList(products) {

    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);

    products.forEach((product) => {
        validateCompleteProduct(product);
    });
}

module.exports = {
    validateProductBusinessRules,
    validateRequiredFields,
    validateProductTypes,
    validateImageUrl,
    validateProductResponse,
    validateCompleteProduct,
    validateProductsList
};