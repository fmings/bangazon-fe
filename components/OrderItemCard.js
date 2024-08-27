import React from 'react';
import PropTypes from 'prop-types';

export default function OrderItemCard({ productObj }) {
  return (
    <div>
      <img alt={productObj.title} className="product-order-image" src={productObj.imageUrl} />
      <h3>{productObj.title}</h3>
      <h5>${productObj.price}</h5>
    </div>
  );
}

OrderItemCard.propTypes = {
  productObj: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
