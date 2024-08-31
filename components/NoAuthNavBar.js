/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,

} from 'react-bootstrap';
// import { signIn } from '../utils/auth';
import Signin from './Signin';

export default function NoAuthNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img className="logo-img" src="/logo.png" alt="bangazon logo" width="65" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            {/* <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
              Sign In
            </Button> */}
            <Signin />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
