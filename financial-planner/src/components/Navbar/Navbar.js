import {useContext} from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
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

    //-------------End of Navigation
    return (

    <Navbar expand="lg" className='nav-style'>
      <Container>
        <Navbar.Brand className="text-white" onClick={() =>home()}>Financial Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-white" onClick={() =>budget()}>Budget</Nav.Link>
            <Nav.Link className="text-white" onClick={() =>expenses()}>Expenses</Nav.Link>
            <Nav.Link className="text-white" onClick={() =>savings()}>Savings</Nav.Link>
            <Nav.Link className="text-white" onClick={() =>income()}>Income</Nav.Link>
          </Nav>
          <Nav className=' d-flex justify-content-end'>
              <Nav.Link className="text-white" onClick={() =>login()}>Login</Nav.Link>
              <Nav.Link className="text-white" onClick={() =>register()}>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
}



export default HomeNavbar