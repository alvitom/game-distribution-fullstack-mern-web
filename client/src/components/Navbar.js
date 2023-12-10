import React from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";

const NavbarMain = () => {
  const NavMain = styled.div`
    margin: 50px auto;
    max-width: 1400px;
    font-size: 16px;
  `;
  const Nav = styled.ul`
    display: flex;
    gap: 20px;
    list-style: none;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
  `;

  const NavLink = styled.a`
    text-decoration: none;
    color: rgb(204, 204, 204);
    padding: 5px;
    font-size: 1.3em;

    &:hover {
      color: #fff;
    }
  `;

  return (
    <>
      <NavMain>
        <Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="success">Search</Button>
          </Form>
          <NavLink href="/">Discover</NavLink>
          <NavLink href="">Browse</NavLink>
          <NavLink href="">News</NavLink>
        </Nav>
      </NavMain>
    </>
  );
};

export default NavbarMain;
