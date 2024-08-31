/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
// import { latestOpenOrder } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';
// import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  // const [latestOrder, setLatestOrder] = useState({});
  const { user } = useAuth();

  // const getLatestOpenOrder = () => {
  //   latestOpenOrder().then(setLatestOrder);
  // };

  // useEffect(() => {
  //   getLatestOpenOrder();
  // }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img className="logo-img" src="/logo.png" alt="bangazon logo" width="65" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {console.warn(user)}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link><img alt="shopping cart" src="/cart-icon.png" width="35" /></Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
