import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { createOrderItem } from '../api/orderItemData';
import { useAuth } from '../utils/context/authContext';
import { createOrder, latestOpenOrder } from '../api/orderData';

export default function ProductDetails({ productObj }) {
  const { user } = useAuth();
  const [openOrder, setOpenOrder] = useState(null);

  const getOpenOrder = () => {
    latestOpenOrder(user.id).then((order) => {
      if (order) {
        setOpenOrder(order);
      } else {
        setOpenOrder(null);
      }
    });
  };

  useEffect(() => {
    if (user) {
      getOpenOrder();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addToCart = () => {
    console.warn('button clicked');
    if (openOrder === null) {
      const orderPayload = {
        customerId: user.id,
        Open: true,
      };
      createOrder(orderPayload).then((newOrder) => {
        const orderItemPayload = {
          itemId: productObj.id,
          orderId: newOrder.id,
        };
        createOrderItem(orderItemPayload);
      });
    } else {
      const payload = { itemId: productObj.id, orderId: openOrder };
      createOrderItem(payload);
      console.warn('payload', payload);
      console.warn('openOrder', openOrder);
    }
  };

  return (
    <div>
      <img className="detail-image" alt={productObj.title} src={productObj.imageUrl} />
      <h1>{productObj.title}</h1>
      <h3>${productObj.price}</h3>
      <h6>QTY Remaining: {productObj.inventoryQty}</h6>
      <h4>{productObj.description}</h4>
      <Button onClick={addToCart}>Add to Cart</Button>
    </div>
  );
}

ProductDetails.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    inventoryQty: PropTypes.number,
  }).isRequired,
};
