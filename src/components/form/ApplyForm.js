import React, {useState} from "react";
import {Col, Form, InputGroup, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FcCancel} from "react-icons/fc";
import {FaEdit} from "react-icons/fa";

function ApplyForm({ apply, setForm, imageInput, modifyMode }) {

    const [imageUrl, setImageUrl] = useState(apply.businessImg);

    const onChangeHandler = e => {
        setForm && setForm({
            ...apply,
            [e.target.name]: e.target.value
        });
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
        console.log("파일 업로드 인식 완료")
    };

    const onChangeImageUpload = () => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const {result} = e.target;
            if (result) setImageUrl(result);
        };
        if (imageInput.current.files[0]) {
            fileReader.readAsDataURL(imageInput.current.files[0]);
        }
    };

    return (

    <Form className="mt-5">
        <Form.Group as={Row} className="mb-3" controlId="formStoreName">
            <Form.Label column sm="3">
                상호명
            </Form.Label>
            <Col sm="9">
                <InputGroup className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="상호명을 입력해 주세요."
                        name="storeName"
                        value={apply.storeName}
                        onChange={onChangeHandler}
                    />
                    <Button variant="outline-success" id="button-addon2">
                        중복 확인
                    </Button>
                </InputGroup>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4" controlId="formStoreRepresentativeName">
            <Form.Label column sm="3">
                대표자
            </Form.Label>
            <Col sm="9">
                <Form.Control
                    type="text"
                    placeholder=""
                    name="storeRepresentativeName"
                    value={apply.storeRepresentativeName}
                    onChange={onChangeHandler}
                />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4" controlId="formBusinessNumber">
            <Form.Label column sm="3">
                사업자등록번호
            </Form.Label>
            <Col sm="9">
                <Form.Control
                    type="text"
                    placeholder=""
                    name="businessNumber"
                    value={apply.businessNumber}
                    onChange={onChangeHandler}
                />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formMosNumber">
            <Form.Label column sm="3">
                통신판매업번호
            </Form.Label>
            <Col sm="9">
                <Form.Control
                    type="text"
                    placeholder=""
                    name="mosNumber"
                    value={apply.mosNumber}
                    onChange={onChangeHandler}
                />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formStoreType">
            <Form.Label column sm="3">
                전문 분야
            </Form.Label>
            <Col sm="9">
                <Form.Select name="storeType" value={apply.storeType} onChange={onChangeHandler}>
                    <option value="FOOD">식품</option>
                    <option value="KITCHENWARE">주방용품</option>
                    <option value="SUPPLIES">생활용품</option>
                    <option value="NECESSITIES">생필품</option>
                </Form.Select>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-5" controlId="formName"
                    type="file"
                    disabled={!modifyMode}
                    onChange={onClickImageUpload}>
            <Form.Label column sm="3">
                대표 사진
            </Form.Label>
            <Col sm="9">
                {imageUrl &&
                    <img
                        className="d-none"
                        alt="preview"
                        src={imageUrl}
                    />
                }
                <Form.Control
                    // style={{ display: 'none' }}
                    type="file"
                    name="businessImg"
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    ref={imageInput}
                    onChange={onChangeImageUpload}>
                </Form.Control>
                <Button

                ></Button>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formApplyContent">
            <Form.Label column sm="3">
                신청 한 마디
            </Form.Label>
            <Col sm="9">
                <Form.Control
                    type="text"
                    placeholder=""
                    name="applyContent"
                    value={apply.applyContent}
                    onChange={onChangeHandler}
                />
            </Col>
        </Form.Group>
    </Form>
)
    ;

}

export default ApplyForm;