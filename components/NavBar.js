/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
            <Link passHref href="/team">
              <Nav.Link className="navLinkColor">Team</Nav.Link>
            </Link>
            <Link passHref href="/new">
              <Nav.Link className="navLinkColor">New</Nav.Link>
            </Link>
            <button type="button" className="signOutButton navLinkColor" onClick={signOut}>Sign Out</button>
          </Nav>
          <Form className="d-flex searchBar">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className="searchBtn navLinkColor" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
