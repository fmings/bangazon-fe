import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function ProductCard({ productObj }) {
  return (
    <>
      <Link passHref href={`product/${productObj.id}`}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={productObj.imageUrl} />
          <Card.Body>
            <Card.Title>{productObj.title}</Card.Title>
            <Card.Text>
              ${productObj.price}
            </Card.Text>
            <Card.Text className="product-description">
              {productObj.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
  }).isRequired,
};
