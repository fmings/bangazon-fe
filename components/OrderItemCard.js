import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { deleteOrderItem } from '../api/orderItemData';

export default function OrderItemCard({ productObj, orderObj, onUpdate }) {
  const deleteItem = () => {
    if (window.confirm(`Are you sure you want to remove ${productObj.title} from your cart?`)) {
      deleteOrderItem(orderObj.id).then(() => onUpdate());
    }
  };

  return (
    <div className="order-item-card">
      <img alt={productObj.title} className="product-order-image" src={productObj.imageUrl} width="75" />
      <h4>{productObj.title}</h4>
      <h5>${productObj.price}</h5>
      <Button className="delete-from-cart" onClick={deleteItem}><img alt="trash can" src="/recycle-bin.png" width="35" /></Button>
    </div>
  );
}

OrderItemCard.propTypes = {
  productObj: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  orderObj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
