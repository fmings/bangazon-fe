import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import OrderItemCard from '../../components/OrderItemCard';
import { getOrderItems } from '../../api/orderItemData';
import { latestOpenOrder, orderTotal } from '../../api/orderData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewOrder() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotalAmount, setOrderTotalAmount] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getLastOpenOrder = () => {
    latestOpenOrder(user.id).then((openOrder) => {
      if (openOrder) {
        getOrderItems(openOrder).then(setOrderItems);
        orderTotal(openOrder).then((order) => {
          setOrderTotalAmount(order.totalAmount);
        });
      }
    });
  };

  useEffect(() => {
    if (user && id) {
      getLastOpenOrder();
    }
  }, [id, user]);

  const handleUpdate = () => {
    if (user) {
      getLastOpenOrder();
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
    handleUpdate();
  };

  return (
    <>
      <div>
        {orderItems.map((orderItem) => <OrderItemCard key={orderItem.id} productObj={orderItem.productItem} orderObj={orderItem} onUpdate={handleUpdate} />)}
      </div>
      <div>
        <h4 className="order-total">Order Total: ${orderTotalAmount}</h4>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </>
  );
}
