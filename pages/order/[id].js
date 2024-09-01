import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import OrderItemCard from '../../components/OrderItemCard';
import { getOrderItems } from '../../api/orderItemData';
import { orderTotal } from '../../api/orderData';

export default function ViewOrder() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotalAmount, setOrderTotalAmount] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const getAllOrderItems = () => {
    getOrderItems(id).then(setOrderItems);
  };

  const getOrderTotal = () => {
    orderTotal(id).then((order) => {
      setOrderTotalAmount(order.totalAmount);
    });
  };

  useEffect(() => {
    getAllOrderItems();
    getOrderTotal();
  }, []);

  const handleUpdate = () => {
    getAllOrderItems();
    getOrderTotal();
  };

  const handleCheckout = () => {
    router.push('/checkout');
    console.warn('checkout button id', id);
  };

  return (
    <>
      <div>
        {orderItems.map((orderItem) => <OrderItemCard key={orderItem.id} productObj={orderItem.productItem} orderObj={orderItem} onUpdate={handleUpdate} />)}
      </div>
      <div>
        <h3>Order Total: ${orderTotalAmount}</h3>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </>
  );
}
