import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// PROMISE TO FETCH ALL PRODUCTS
const getProductItems = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// PROMISE TO GET SINGLE PRODUCT BY ID
const getSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/product/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// PROMISE TO GET ALL PRODUCTS SOLD BY A SPECIFI SELLER
const getProductBySeller = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/seller/${id}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getProductItems,
  getSingleProduct,
  getProductBySeller,
};
