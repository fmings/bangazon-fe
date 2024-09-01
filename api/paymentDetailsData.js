import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createPaymentDetails = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default createPaymentDetails;
