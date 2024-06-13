import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {Form} from "react-bootstrap";

function ProductDetailItem(props) {

    const navigate = useNavigate();
    const [amount, setAmount] = useState(1);

    const onClickOrderBtnHandler = () => {
        // 주문 기능 작성
    }

    const onChangeHandler = e => {
        props.setSelectOption && props.setSelectOption({
            ...props.selectOption,
            [e.target.name] : e.target.value

        })
    }

    return (

        <div>
            <div className="product-img-wrapper">
                <img src={props.product.productImg} alt={props.product.productName}/>
            </div>

            <div className="product-info-wrapper">
                <table className="product-info-table">
                    <tbody>
                    <tr>
                        <th>상품명</th>
                        <td>{props.product.productName}</td>
                    </tr>
                    <tr>
                        <th>판매자</th>
                        <td>{props.product.storeName}</td>
                    </tr>
                    <tr>
                        <th>분류</th>
                        <td>{props.product.categoryTitle}</td>
                    </tr>
                    <tr>
                        <th>구매 수량</th>
                        <td>
                            <input
                                type="number"
                                min="1"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>

                <Form.Group>
                    <Form.Label>옵션</Form.Label>
                    <Form.Select name="optionCode" value={props.option.optionCode} onChange={onChangeHandler}>
                        {props.option.map(op => (
                            <option key={op.optionCode} value={op.optionCode}>
                                {op.optionName} | 가격: {op.optionPrice}
                            </option>
                        ))
                        }
                    </Form.Select>
                </Form.Group>

                <button onClick={onClickOrderBtnHandler}>구매</button>
            </div>
        </div>

    )
}

export default ProductDetailItem;