//import {useContext} from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import React from 'react';
//import { useSelector} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const HomeNavbar = () => {

  //-----------Website Navigation

    //intializing navigation
    const navigate = useNavigate();

    const home = () => {
      navigate("");
    };

    const budget = () => {
      navigate("/Budget");
    };

    const expenses = () => {
      navigate("/Expenses");
    };

    const savings = () => {
      navigate("/Savings");
    };

    const income = () => {
      navigate("/Income");
    };

    const register = () => {
      navigate("/Register");
    };

    const login = () => {
      navigate("/Login");
    };

    const report = () => {
      navigate("/Report");
    };

    const account = () => {
      navigate("/Account");
    }

    const bills = () => {
      navigate("/Bills")
    }

    const logout = () => {
      cookies.remove("TOKEN");
      home();
    }

    const cookies = new Cookies();
    //-------------End of Navigation
    return (

    <Navbar expand="lg" className='nav-style'>
      <Container>
        <Navbar.Brand className="text-white" onClick={() =>home()}>Financial Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {cookies.get("TOKEN") !== undefined ? (
          <Nav className="d-flex me-auto">
            <Nav.Link className="text-white" onClick={() =>budget()}>Budget</Nav.Link>
            <Nav.Link className="text-white" onClick={() =>savings()}>Savings</Nav.Link>
            <Nav.Link className="text-white" onClick={() =>income()}>Income</Nav.Link>
            <Nav.Link className="text-white" onClick={() =>expenses()}>Expenses</Nav.Link>
            <Nav.Link className="text-white" onClick={() =>bills()}>Bills</Nav.Link>
            <Nav.Link className="text-white" onClick={() =>report()}>Report</Nav.Link>
          </Nav>
        ):(<Nav className="d-flex me-auto"></Nav>)}
          <Nav className=' d-flex justify-content-end'>
          {cookies.get("TOKEN") === undefined ? (
            <React.Fragment>
                <Nav.Link className="text-white" onClick={() =>login()}>Login</Nav.Link>
                <Nav.Link className="text-white" onClick={() =>register()}>Register</Nav.Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Nav.Link className="text-white" onClick={() =>account()}>Account</Nav.Link>
              <Nav.Link className="text-white" onClick={() =>logout()}>Logout</Nav.Link>
            </React.Fragment>
          )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
}



export default HomeNavbar