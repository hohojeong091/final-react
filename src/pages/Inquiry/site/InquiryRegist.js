import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {callMemberInquiryRegistAPI} from "../../../apis/InquiryAPI";
import InquiryForm from "../../../components/form/InquiryForm";
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function InquiryRegist() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState( {

        inquiryDetail:'',
        inquiryTitle:''
    });




    const {success} = useSelector(state => state.inquiryReducer);

    useEffect(() => {
        if(success === true) navigate('/inquiry/regist')
    }, [success]);



    const onClickInquiryUpdateHandler = () => {
        dispatch(callMemberInquiryRegistAPI({inquiryRegistRequest:form}));
    };


    return (
        <>
            <Row>




                <Col>
                    <Col xs={9}> <InquiryForm form={form} setForm={setForm} modifyMode={true}/> </Col>




                            <div className="inquiry-regist-btn">
                                <Button
                                    variant="success"
                                    onClick={onClickInquiryUpdateHandler}
                                >{''}
                                    등록하기
                                </Button>

                            <Button
                                variant="outline-success"
                                onClick={() => navigate(-1)}
                            >{''}
                                뒤로가기
                            </Button>

                        </div>

                </Col>


            </Row>
        </>
    );
}


export default InquiryRegist;

