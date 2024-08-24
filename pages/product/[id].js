import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductDetails from '../../components/ProductDetails';
import { getSingleProduct } from '../../api/productItemData';

export default function ViewProduct() {
  const [productItem, setProductItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const viewProductDetails = () => {
    getSingleProduct(id).then(setProductItem);
  };

  useEffect(() => {
    console.warn('productid', id);
    viewProductDetails();
  }, [id, viewProductDetails]);

  return (
    <div>
      <ProductDetails productObj={productItem} key={productItem.id} />
    </div>
  );
}
