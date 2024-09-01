import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getProductBySeller } from '../../api/productItemData';
import ProductCard from '../../components/ProductCard';
import getUserDetails from '../../api/userData';

export default function SellerProducts() {
  const [sellerProducts, setSellerProducts] = useState([]);
  const [sellerDetails, setSellerDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getAllSellerProducts = () => {
    getProductBySeller(id).then(setSellerProducts);
  };

  const getSellerDetails = () => {
    getUserDetails(id).then(setSellerDetails);
  };

  useEffect(() => {
    getAllSellerProducts();
    getSellerDetails();
  }, []);

  return (
    <>
      <div>{sellerDetails.firstName} {sellerDetails.lastName} Product Page</div>
      <div className="d-flex flex-wrap">
        {sellerProducts.map((sellerProduct) => (<ProductCard productObj={sellerProduct} key={sellerProduct.id} />))}
      </div>
    </>
  );
}
