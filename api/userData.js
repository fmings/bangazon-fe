import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserDetails = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export default getUserDetails;
