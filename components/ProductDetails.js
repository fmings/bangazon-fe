import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { createOrderItem } from '../api/orderItemData';
import { useAuth } from '../utils/context/authContext';
import { createOrder, latestOpenOrder } from '../api/orderData';
import Loading from './Loading';

export default function ProductDetails({ productObj }) {
  const { user } = useAuth();
  const [openOrder, setOpenOrder] = useState(null);

  const getOpenOrder = () => {
    latestOpenOrder(user.id).then((order) => {
      setOpenOrder(order || null);
    });
  };

  useEffect(() => {
    if (user) {
      getOpenOrder();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addToCart = () => {
    if (openOrder === null) {
      const orderPayload = {
        customerId: user.id,
        open: true,
      };
      createOrder(orderPayload).then((newOrder) => {
        const orderItemPayload = {
          productItemId: productObj.id,
          orderId: newOrder.id,
        };
        createOrderItem(orderItemPayload).then(() => {
          setOpenOrder(newOrder.id);
        });
      });
    } else {
      const payload = { productItemId: productObj.id, orderId: openOrder };
      createOrderItem(payload);
    }
  };

  if (!productObj) {
    return <Loading />;
  }

  const sellerFirstName = productObj.user?.firstName || 'information note available';
  const sellerLastName = productObj.user?.lastName || '';

  return (
    <div className="product-detail-container">
      <img className="detail-image" alt={productObj.title} src={productObj.imageUrl} />
      <div className="product-detail-content">
        <h1>{productObj.title}</h1>
        <h3>${productObj.price}</h3>
        <h6>QTY Remaining: {productObj.inventoryQty}</h6>
        {productObj ? (<Link passHref href={`/seller/${productObj.userId}`}><h6>Sold By: {sellerFirstName} {sellerLastName}</h6></Link>) : (<h6>Sold By: Information Not Available</h6>)}
        <h5>{productObj.description}</h5>
        <Button onClick={addToCart}>Add to Cart</Button>
      </div>
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
    userId: PropTypes.string,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }).isRequired,
};
