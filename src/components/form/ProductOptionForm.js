import {Form} from "react-bootstrap";
import React, {useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

function ProductOptionForm(prop) {

    const [selectedOption, setSelectedOption] = useState(null);
    const [mode, setMode] = useState(null);

    const handleClickRegist = () => {
        setMode("regist");
        setSelectedOption(null);
    };

    const handleClickEdit = () => {
        if (selectedOption === null) {
            alert("수정할 옵션을 선택하세요");
        } else {
            setMode("edit");
        }
    };

    const handleClickDelete = () => {
        setMode("delete");
        if (selectedOption === null) {
            alert("삭제할 옵션을 선택하세요");
        } else {
            //선택된 옵션 제거 작성 prop.setOptionInfo(prop.optionInfo.filter(opt => opt !== selectedOption));
            setSelectedOption(null);
            setMode(null);
        }
    };

    const handleChangeOption = (opt) => {
        setSelectedOption(opt);
        if (mode === "edit") {
            setMode("edit");
        }
    };

    return (
        <div className="product-option-form">

            <ListGroup className="product-option-wrapper">

                <div className="option-btn-wrapper">
                    <Button className="option-btn" onClick={handleClickRegist}>추가</Button>
                    <Button className="option-btn" onClick={handleClickEdit}>수정</Button>
                    <Button className="option-btn" onClick={handleClickDelete}>삭제</Button>
                </div>

                <div className="product-option-list">
                    {prop.optionInfo.map((opt, index) => (
                        <ListGroup.Item key={index}>
                            <Form.Check
                                type="radio"
                                label={opt.name}
                                name="selectOption"
                                onChange={() => handleChangeOption(opt)}
                                checked={selectedOption === opt}
                            />
                        </ListGroup.Item>
                    ))
                    }
                </div>


            </ListGroup>

            <div>
                {(mode === "regist" || mode === "edit") && (
                    <Form className="option-regist-forms">
                        <Form.Group className="option-info-form" controlId="optionName">
                            <Form.Label>옵션명</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedOption ? selectedOption.name : ''}
                                onChange={(e) => setSelectedOption({ ...selectedOption, name: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="option-info-form" controlId="optionPrice">
                            <Form.Label>옵션가격</Form.Label>
                            <Form.Control
                                type="number"
                                value={selectedOption ? selectedOption.price : ''}
                                onChange={(e) => setSelectedOption({ ...selectedOption, price: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="option-info-form" controlId="optionStock">
                            <Form.Label>재고</Form.Label>
                            <Form.Control
                                type="number"
                                value={selectedOption ? selectedOption.stock : ''}
                                onChange={(e) => setSelectedOption({ ...selectedOption, stock: e.target.value})}
                            />
                        </Form.Group>

                        <Button className="option-btn">완료</Button>
                    </Form>
                )}
            </div>

        </div>
    )
}
export default ProductOptionForm;