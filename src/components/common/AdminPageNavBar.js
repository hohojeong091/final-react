import Nav from "react-bootstrap/Nav";
import React, {useState} from "react";
import {Link} from "react-router-dom";

function AdminPageNavBar() {
    const [key, setKey] = useState('home');
    return (
        <>
            <Nav defaultActiveKey="/home" className="flex-column rounded mt-5 p-4"
                 style={{backgroundColor: "#F0F3EE"}}>
                <Nav.Link className="nav-link-custom-title">스토어 관리</Nav.Link>
                <Nav.Link eventKey="" className="nav-link-custom">신규 입점 신청</Nav.Link>
                <Nav.Link eventKey="" className="nav-link-custom">스토어 현황</Nav.Link>
                <Nav.Link  as={Link} to="/admin/dashboard/category" className="nav-link-custom">카테고리 관리</Nav.Link>
                <br/>
                <Nav.Link className="nav-link-custom-title">스토어 정산</Nav.Link>
                <Nav.Link eventKey="" className="nav-link-custom">주문 내역</Nav.Link>
                <Nav.Link eventKey="" className="nav-link-custom">정산 내역</Nav.Link>
                <br/>
                <Nav.Link className="nav-link-custom-title">챌린지 관리</Nav.Link>
                <Nav.Link eventKey="" className="nav-link-custom">챌린지 목록</Nav.Link>
                <Nav.Link eventKey="" className="nav-link-custom">권한 관리</Nav.Link>
                <Nav.Link eventKey="" className="nav-link-custom">인증 관리</Nav.Link>
                <br/>
                <Nav.Link className="nav-link-custom-title">회원 관리</Nav.Link>
                <Nav.Link as={Link} to="/admin/dashboard/members" className="nav-link-custom">전체 회원 조회</Nav.Link>
                <br/>
                <Nav.Link className="nav-link-custom-title">초록불 찾기</Nav.Link>
                <Nav.Link eventKey="" className="nav-link-custom">매장 정보 관리</Nav.Link>
                <br/>
                <Nav.Link className="nav-link-custom-title">커뮤니티 관리</Nav.Link>
                <Nav.Link as={Link} to="/notice" className="nav-link-custom">공지사항</Nav.Link>
                <Nav.Link eventKey="" className="nav-link-custom">문의센터</Nav.Link>
                <Nav.Link as={Link} to="/admin/dashboard/reports" className="nav-link-custom">신고센터</Nav.Link>
            </Nav>
        </>
    );
}

export default AdminPageNavBar;