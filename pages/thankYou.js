import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'react-bootstrap';

export default function ThankYou() {
  const router = useRouter();

  const keepShopping = () => {
    router.push('/');
  };

  return (
    <div>
      Thank you for your order!
      <Button onClick={keepShopping}>Keep Shopping</Button>
    </div>
  );
}
