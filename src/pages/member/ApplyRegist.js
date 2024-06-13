import React, {useEffect, useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {callApplyRegistAPI} from "../../apis/ApplyAPICalls";
import {useDispatch, useSelector} from "react-redux";
import ApplyForm from "../../components/form/ApplyForm";

function ApplyRegist() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        storeName: '',
        storeRepresentativeName: '',
        businessNumber: '',
        mosNumber: '',
        memberPhone: 'test',
        storeType: '',
        applyContent: ''
    });

    const imageInput = useRef();
    const { success } = useSelector(state => state.applyReducer);

    useEffect(() => {
        if (success === true) navigate('/members/mypage/apply');
    }, [success]);

    const onClickBackHandler = () => navigate(-1);

    const onClickApplyRegistHandler = () => {
        const formData = new FormData();
        formData.append('businessImg', imageInput.current.files[0]);
        formData.append('applyCreateRequest', new Blob([JSON.stringify(form)], { type : 'application/json'}));
        dispatch(callApplyRegistAPI({ applyCreateRequest : formData }));
    }

    return (
        <div className="">
            <Row className="mt-5 justify-content-md-center">
                <div className="w-75 mb-5-5 fs-4 fw-semibold border-bottom border-2 border-dark-subtle p-2">
                    반딧불이 스토어 입점 신청
                </div>
                <Col className="col-8">
                    <ApplyForm apply={form} setForm={setForm} imageInput={imageInput} modifyMode={true} />
                </Col>

                <div className="px-0 d-flex align-items-center justify-content-center py-2">
                    <Button onClick={onClickApplyRegistHandler} variant="success" className="w-50">
                        신청하기
                    </Button>
                </div>
                <div className="px-0 d-flex align-items-center justify-content-center">
                    <Button variant="outline-secondary" type="button" className="w-50" onClick={onClickBackHandler}>
                        뒤로가기
                    </Button>
                </div>
            </Row>
        </div>
    );
}

export default ApplyRegist;