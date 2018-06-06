import { Mongo } from 'meteor/mongo';

Products = new Mongo.Collection('products');

export const products_db = Products;
