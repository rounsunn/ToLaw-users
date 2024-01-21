import CoLawabLogo from "../assets/CoLawabLogo.png";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigationbar = () => {
  return (
    <div>
      <Navbar style={{ backgroundColor: "#0C253F" }} fixed="top">
        <Container>
          <Navbar.Brand className="my-0 mr-md-auto font-weight-normal">
            <Link to={"/"} className="text-decoration-none">
              <img
                alt=""
                src={CoLawabLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              <span className="text-white">CoLawab</span>
            </Link>
          </Navbar.Brand>
          <Nav className="my-2 my-md-0 mr-md-3">
            <Nav.Link as={Link} to={"/"} className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"search"} className="text-white">
              Talk to lawyers
            </Nav.Link>
            <Nav.Link as={Link} to={"aiassist"} className="text-white">
              Talk to AI
            </Nav.Link>
            <Nav.Link as={Link} to={"templates"} className="text-white">
              Templates
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Navigationbar;
