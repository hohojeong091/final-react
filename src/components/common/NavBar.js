import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';

import { FaShoppingCart, FaHeart, FaBell, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {Badge, Row, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import LoginModal from "../items/LoginModal";
import {useDispatch, useSelector} from "react-redux";
import {reset} from "../../modules/MemberModules";
import {isAdmin, isLogin, isSeller} from "../../utils/TokenUtils";
import {callLogoutAPI} from "../../apis/MemberAPICalls";

function NavBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const {success} = useSelector(state => state.memberReducer);

    useEffect(() => {
        if(success === true) {
            navigate('/');
            dispatch(reset());
            handleLoginModalClose();
        }
    }, [success]);

    const handleLoginModalClose = () => setShowLoginModal(false);
    const handleLoginModalShow = () => setShowLoginModal(true);

    function BeforeLogin() {

        return (
            <div>
                <Badge
                    bg="light"
                    text="dark"
                    className="mx-2"
                    onClick={handleLoginModalShow}
                    style={{cursor: 'pointer'}}
                >
                    로그인
                </Badge>
                <Badge
                    bg="light"
                    text="dark"
                    className=""
                    onClick={() => navigate('members/signup')}
                    style={{cursor: 'pointer'}}
                >
                    회원가입
                </Badge>
            </div>
        );
    }

    function AfterLogin() {

        const { success } = useSelector(state => state.memberReducer);

        useEffect(() => {
            if(success === true) {
                navigate('/');
                dispatch(reset());
            }
        }, [success]);

        return (
            <Row className="d-flex align-items-center justify-content-end">
                <Col
                    className="profile-pic col-3 mx-2"
                    style={{
                        background: "none",
                        color: "white",
                        border: "none",
                        marginBottom: "5px",
                        marginLeft: "15px",
                        width: "30px",
                        fontSize: "28px"
                    }}>
                    <CgProfile/>
                </Col>

                <Col>
                    <NavDropdown title="여은파님" id="navbarScrollingDropdown"
                                 className="mx-0 col-9 ">
                        {isAdmin() &&
                            <NavDropdown.Item
                                onClick={() => navigate(`/admin/dashboard/main`)}>
                                관리자페이지
                            </NavDropdown.Item>
                        }
                        {isSeller() &&
                            <NavDropdown.Item
                                onClick={() => navigate(`/seller/mystore/main`)}>
                                마이스토어
                            </NavDropdown.Item>
                        }
                        {(!isAdmin() && !isSeller()) &&
                            <NavDropdown.Item
                                onClick={() => navigate(`/members/mypage`)}>
                                마이페이지
                            </NavDropdown.Item>
                        }
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            type="button"
                            onClick={() => dispatch(callLogoutAPI())}>
                            로그아웃
                        </NavDropdown.Item>
                    </NavDropdown>
                </Col>
            </Row>
        )
    }

    return (
        <Navbar expand="lg" className="bg-success p-5">
            <Container fluid>
                <Image src="/greenFire_logo-nav.png" width={30} height={30}/>
                <Navbar.Brand href="/" className="text-white mx-3">GREEN FIRE</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" style={{backgroundColor: "#ffffff"}}/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link href="#action1" className="text-white">초록불 소개</Nav.Link>
                        <NavDropdown title="반딧불이 스토어" id="navbarScrollingDropdown" className="custom-dropdown">
                            <NavDropdown.Item href="/product">
                                전체보기
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action2">식품</NavDropdown.Item>
                            <NavDropdown.Item href="#action3">주방용품</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">생활용품</NavDropdown.Item>
                            <NavDropdown.Item href="#action5">생필품</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="초록불 챌린지" id="navbarScrollingDropdown" className="custom-dropdown">
                            <NavDropdown.Item href="/">챌린지 소개</NavDropdown.Item>
                            <NavDropdown.Item href="">챌린지 참여</NavDropdown.Item>
                            <NavDropdown.Item href="">챌린지 인증</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action5">초록불 찾기</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="커뮤니티" id="navbarScrollingDropdown" className="custom-dropdown">
                            <NavDropdown.Item href="">공지사항</NavDropdown.Item>
                            <NavDropdown.Item href="/members/mypage/inquiry">문의센터</NavDropdown.Item>
                            <NavDropdown.Item href="">신고센터</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type=""
                            placeholder="Search"
                            className="me-2 bg-light"
                            aria-label="Search"
                            src="logo192.png"
                        />
                        <button style={{background: "none", color: "white", border: "none", marginRight: "10px"}}>
                            <FaSearch/>
                        </button>
                    </Form>

                    {/*아이콘 테스트*/}
                    <button className="iconbtn" style={{color: "white", marginLeft: "5px"}}>
                        <FaShoppingCart/>
                    </button>

                    <button className="iconbtn" style={{color: "white"}}>
                        <Nav.Link href="/wish">
                            <FaHeart/>
                        </Nav.Link>
                    </button>

                    <button className="iconbtn" style={{color: "white", marginRight: "1rem"}}>
                        <FaBell/>
                    </button>

                    { isLogin() ? <AfterLogin/> : <BeforeLogin/> }

                </Navbar.Collapse>
            </Container>
            <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
        </Navbar>
    );
}

export default NavBar;