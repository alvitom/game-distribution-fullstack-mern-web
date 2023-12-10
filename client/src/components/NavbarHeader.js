import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavScrollExample() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container fluid className="ms-3">
        <Navbar.Brand href="/">Gaming Indo Center</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/" className="text-white me-2">STORE</Nav.Link>
            <Nav.Link href="#action2" className="me-2">Distribusi</Nav.Link>
            <Nav.Link href="#action2" className="me-2">Bantuan</Nav.Link>
            <Nav.Link href="#action2" className="me-2">Unreal Engine</Nav.Link>
          </Nav>
          <Button variant="outline-light" className="me-3"><i class="bi bi-globe"></i> Bahasa</Button>
          <Button variant="outline-light" className="me-3"><i class="bi bi-person-circle"></i> Login</Button>
          <Button variant="success" className="me-3"><i class="bi bi-download"></i> Unduh</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
