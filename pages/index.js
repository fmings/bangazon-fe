// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';
import { useEffect, useState } from 'react';
import { getProductItems } from '../api/productItemData';
import ProductCard from '../components/ProductCard';

function Home() {
  // const { user } = useAuth();

  const [productItems, setProductItems] = useState([]);

  const getAllProductItems = () => {
    getProductItems().then(setProductItems);
  };

  useEffect(() => {
    getAllProductItems();
  }, []);

  return (
    <div
      className="d-flex flex-wrap"
    >
      {productItems.map((productItem) => (<ProductCard productObj={productItem} key={productItem.id} />))}
    </div>
  );
}

export default Home;
