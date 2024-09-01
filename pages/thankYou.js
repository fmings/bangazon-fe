import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'react-bootstrap';

export default function ThankYou() {
  const router = useRouter();

  const keepShopping = () => {
    router.push('/');
  };

  return (
    <div className="thank-you-container">
      <h1>Thank you for your order!</h1>
      <div>
        <Button onClick={keepShopping}>Keep Shopping</Button>
      </div>
    </div>
  );
}
