/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar className="navBarDiv" collapseOnSelect variant="dark" expand="lg">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="appNameNav">ROOST</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto navLinks">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            {/* <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link> */}
            <Link passHref href="/teams">
              <Nav.Link className="navLinkColor">Teams</Nav.Link>
            </Link>
            <Link passHref href="/team/new">
              <Nav.Link className="navLinkColor">New</Nav.Link>
            </Link>
            <button type="button" className="signOutButton navLinkColor" onClick={signOut}>Sign Out</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
