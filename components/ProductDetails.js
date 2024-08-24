import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function ProductDetails({ productObj }) {
  return (
    <div>
      <img className="detail-image" alt={productObj.title} src={productObj.imageUrl} />
      <h1>{productObj.title}</h1>
      <h3>${productObj.price}</h3>
      <h6>QTY Remaining: {productObj.inventoryQty}</h6>
      <h4>{productObj.description}</h4>
      <Button>Add to Cart</Button>
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
