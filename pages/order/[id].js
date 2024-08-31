import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

  return (
    <>
      <div>
        {orderItems.map((orderItem) => <OrderItemCard key={orderItem.id} productObj={orderItem.productItem} />)}
      </div>
      <div>
        <h3>Order Total: ${orderTotalAmount}</h3>
      </div>
    </>
  );
}
