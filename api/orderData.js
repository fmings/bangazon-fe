import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/order/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => (response.json))
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/order/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => (response.json))
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getSingleOrder,
  createOrder,
  updateOrder,
};
