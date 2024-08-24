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
      {/* <h1>Hello {user.fbUser.displayName}! </h1> */}
      {/* <p>Your Bio: {user.bio}</p> */}
      {/* <p>Click the button below to logout!</p> */}
      {/* <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}> */}
      {/* Sign Out */}
      {/* </Button> */}
    </div>
  );
}

export default Home;
