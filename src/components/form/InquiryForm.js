import {useDispatch} from "react-redux";
import Form from "react-bootstrap/Form";
import {Col, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";
import {callInquiryListAPI, callMemberInquiryRegistAPI} from "../../apis/InquiryAPI";
import {useNavigate} from "react-router-dom";

function InquiryForm ({form, setForm}) {


    // const dispatch = useDispatch();



    // const [form, setForm] = useState;

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    // const onSubmitHandler = (e) => {
    //     e.preventDefault();
    // };


    return (

        <Row className="mt-5 justify-content-md-center">
            <Col className="col-12">
                <div className="fs-4 fw-semibold border-bottom border-2 border-dark-subtle p-2">문의 등록하기</div>
                <Form className="p-5">


                    {/*<Form.Group as={Row} className="mb-3" controlId="formInquiryCode">*/}
                    {/*    <Form.Label column sm="2">*/}
                    {/*        문의 번호*/}
                    {/*    </Form.Label>*/}
                    {/*    <Col sm="10">*/}
                    {/*        <Form.Control*/}
                    {/*            type="text"*/}
                    {/*            name="inquiryCode"*/}
                    {/*            value={form.memberId}*/}
                    {/*            onChange={onChangeHandler}*/}
                    {/*        />*/}

                    {/*    </Col>*/}

                    {/*</Form.Group>*/}

                    {/*<Form.Group as={Row} className="mb-3" controlId="formemberCode">*/}
                    {/*    <Form.Label column sm="2">*/}
                    {/*        회원번호*/}
                    {/*    </Form.Label>*/}
                    {/*    <Col sm="10">*/}
                    {/*        <InputGroup className="mb-3">*/}
                    {/*            <Form.Control*/}
                    {/*                type="email"*/}
                    {/*                name="memberCode"*/}
                    {/*                value={form.memberEmail}*/}
                    {/*                onChange={onChangeHandler}*/}
                    {/*            />*/}

                    {/*        </InputGroup>*/}
                    {/*    </Col>*/}
                    {/*</Form.Group>*/}

                    <Form.Group as={Row} className="mb-3" controlId="formInquiryTitle">
                        <Form.Label column sm="2">
                            문의 제목
                        </Form.Label>
                        <Col sm="10">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="textarea"
                                    placeholder="문의 제목을 입력해 주세요."
                                    name="inquiryTitle"
                                    value={form.inquiryTitle}
                                    onChange={onChangeHandler}
                                />
                            </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-6" controlId="formInquiryDetail">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>문의 내용</Form.Label>
                            <Col>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="문의 내용을 입력해 주세요."
                                    name="inquiryDetail"
                                    value={form.inquiryDetail}
                                    onChange={onChangeHandler}/>
                            </Col>
                        </Form.Group>

                    </Form.Group>


                </Form>
            </Col>
        </Row>

    );


}


export default InquiryForm;
