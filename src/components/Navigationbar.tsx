import logo from "../assets/logo2.png";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Navigationbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 550 });

  return (
    <div className="font-poppins pb-24">
      <Navbar style={{ backgroundColor: "#0C253F" }} fixed="top">
        <Container>
          <Navbar.Brand className="my-0 mr-md-auto font-weight-normal">
            <Link to={"/"} className="text-decoration-none">
              <img
                alt="logo"
                src={logo}
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
            </Link>
          </Navbar.Brand>
          {!isMobile && (
            <Nav className="my-2 my-md-0 mr-md-3">
              <Nav.Link
                as={Link}
                to={"/"}
                className="text-white transition-all duration-300 ease-in-out hover:scale-110"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"search"}
                className="text-white transition-all duration-300 ease-in-out hover:scale-110"
              >
                Talk to lawyers
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"aiassist"}
                className="text-white transition-all duration-300 ease-in-out hover:scale-110"
              >
                Talk to AI
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"templates"}
                className="text-white transition-all duration-300 ease-in-out hover:scale-110"
              >
                Templates
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
