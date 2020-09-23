'use strict';

// const productModel = require('../models/product');
import productModel from '../models/product';

/**
 * Stores a new product into the database.
 * @param {Object} product product object to create.
 * @throws {Error} If the product is not provided.
 */
export const create = async (product) => {
    if (!product)
        throw new Error('Missing product');

    await productModel.create(product);
};