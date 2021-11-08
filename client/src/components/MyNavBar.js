import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './MyNavBar.css';
import './solidarity.png'
import Image from "react-bootstrap/Image"

function MyNavBar(props) {
    return (

        <Navbar className="navbar navbar-dark navbar-expand-sm bg-primary fixed-top justify-content-center" expand="lg">
            {/*<Navbar.Toggle aria-controls="CollapseLeft" /> */}

            <Navbar.Brand >
                <Row className=" align-items-center">
                    <Col sm="3" className="p-0 m-0 d-none d-sm-block">
                        <Image src="../solidarity.png" className="w-25 m-4 mt-0 mb-0 p-0"/>
                    </Col>
                    <Col xs="12" sm="9" className="p-0 m-0 ml-2 pl-2">
                        <b><h2 className="mt-0 mb-0 w-100 m-0 p-1 pb-1 pt-1">Social Purchasing Group</h2></b>
                    </Col>

                </Row>
                

                
            </Navbar.Brand>
            

        </Navbar>
    );
}

export default MyNavBar;