import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  Modal,
} from "react-bootstrap";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import  Image from 'next/image'
import AddQuestion from "./AddQuestion";
import Link from 'next/link'

export default function CustomNavbar(props) {
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [user, setUser] = useState();
  function handleSignOut() {
    localStorage.clear();
    window.location.replace("/");
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //if (!props.auth)
      if (!isSignedIn)
    return (
      <Navbar className="custom-nav" sticky="top">
        <Navbar.Brand className="navbar__brand" href="./">
          OASIS
        </Navbar.Brand>
        <Nav>
          <Nav.Link className="navbar__signin" href="./SignIn">
            Sign In
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  else {
    return (
      <Navbar className="custom-nav" sticky="top">
        <Modal show={show} onHide={handleClose}>
          <AddQuestion close={handleClose} />
        </Modal>
        <Navbar.Brand className="navbar__brand" href="./">
          OASIS
        </Navbar.Brand>
        <Nav>
          <Form className="searchbar">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button variant="dark">
              <BsSearch />
            </Button>
          </Form>
        </Nav>

        <DropdownButton
          className="user-avatar"
          as={ButtonGroup}
          align={{ lg: "end" }}
          title={
              props.user.profilePic ?
            <Image
              src={props.user.profilePic}
              drop="down"
              variant="light"
              alt="user avatar"
              width="32" height="32"
            />  :""
          }
        >
          <Dropdown.Item href="/User">My Page</Dropdown.Item>
          <Dropdown.Item href="/Publish">Publish</Dropdown.Item>
          <Dropdown.Item onClick={handleShow}>Ask</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSignOut()}>
            Sign Out
          </Dropdown.Item>
        </DropdownButton>
      </Navbar>
    );
  }
}
