import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderItemCard from '../../components/OrderItemCard';
import { getOrderItems } from '../../api/orderItemData';

export default function ViewOrder() {
  const [orderItems, setOrderItems] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getAllOrderItems = () => {
    getOrderItems(id).then(setOrderItems);
  };

  useEffect(() => {
    getAllOrderItems();
  }, []);

  return (
    <div>
      {orderItems.map((orderItem) => <OrderItemCard key={orderItem.id} productObj={orderItem.productItem} />)}
    </div>
  );
}
