import UserPageNavBar from "../../../components/common/UserPageNavBar";
import React, {useEffect, useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {callInquiryListAPI} from "../../../apis/InquiryAPI";
import PagingBar from "../../../components/common/PagingBar";
import InquiryList from "../../../components/list/InquiryList";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";


function InquiryMain() {

    const dispatch = useDispatch();
    // const [currentPage, setCurrentPage] = useState(1);
    const {inquiry} = useSelector(state => state.inquiryReducer);
    const navigate = useNavigate();

    const onClickInquiryRegisterHandler = () => {
        navigate("/members/mypage/inquiry/regist");
    }





    useEffect(() => {
        dispatch(callInquiryListAPI);
    }, );

    return (
        <>
            <Row>



                <Col xs={9}>
                    {['xl'].map((breakpoint) => (
                        <ListGroup key={breakpoint} horizontal={breakpoint} className="my-5 text-center">
                            <ListGroup.Item className="py-5 w-50 bg-body-tertiary fs-5">등록된 나의 문의
                                <div className="pt-2">
                                    <span className="fw-bolder fs-1">0</span>건
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="py-5 w-50 bg-body-tertiary fs-5">답변 등록된 문의
                                <div className="pt-2">
                                    <span className="fw-bolder fs-1">0</span>건
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    ))}


                    {/* 등록된 문의가 없을 시, "등록된 문의가 없습니다."라는 문구 보여주기*/}


                    <>

                    { inquiry &&
                        <>
                            <InquiryList data={inquiry.data}/>
                            {/*<PagingBar pageInfo={inquiry.pageInfo} setCurrentPage={setCurrentPage}/>*/}
                        </>
                    }
                    </>


                    <Button
                        variant="success"
                        onClick={onClickInquiryRegisterHandler}
                    >문의 등록</Button>{''}

                    <Button
                        variant="outline-success"
                        path="/"
                    >{''}
                        메인으로</Button>

                </Col>

            </Row>
        </>
    );
}

export default InquiryMain;