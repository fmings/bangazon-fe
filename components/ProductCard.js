import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function ProductCard({ productObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={productObj.imageUrl} />
      <Card.Body>
        <Card.Title><Link passHref href={`product/${productObj.id}`}>{productObj.title}</Link></Card.Title>
        <Card.Text>
          ${productObj.price}
        </Card.Text>
        <Card.Text>
          {productObj.description}
        </Card.Text>
      </Card.Body>
    </Card>
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
