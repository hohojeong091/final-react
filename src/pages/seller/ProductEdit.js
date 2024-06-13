import ReactQuill, {Quill} from 'react-quill';
import TextEditor from "../../components/items/TextEditor";
import React, { useRef, useState } from 'react';
import {Form} from "react-bootstrap";
import ProductOptionForm from "../../components/form/ProductOptionForm";
import Button from "react-bootstrap/Button";

const Delta = Quill.import('delta');

function ProductEdit() {

    // const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();

    const quillRef = useRef();

    const productCategory = [
        { id: 1, name: '카테고리1' },
        { id: 2, name: '카테고리2' },
    ];

    const productOption = [
        { id: 1, name: '옵션명1', price: 12000, stock: 5 },
        { id: 2, name: '옵션명2', price: 9000, stock: 3 },
        { id: 3, name: '옵션명3', price: 16000, stock: 2 },
        { id: 3, name: '옵션명3', price: 16000, stock: 2 },
        { id: 3, name: '옵션명3', price: 16000, stock: 2 },
        { id: 3, name: '옵션명3', price: 16000, stock: 2 },
        { id: 3, name: '마지막', price: 16000, stock: 2 },
    ];

    /* 옵션 불러오기 */

    // const { productOption } = useSelector(state => state.option);
    //
    // useEffect(() => {
    //     dispatch(callProductOptionListAPI({productCode}));
    // }, [productCode]);

    return (
        <div className="product-regist-page">

            <Form className="product-regist-forms">
                <Form.Group className="product-info-form" controlId="productName">
                    <Form.Label>상품명</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group className="product-info-form" controlId="productStatus">
                    <Form.Label>판매 상태</Form.Label>
                    <Form.Select>
                        <option value="true">판매중</option>
                        <option value="false">구매불가</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="product-info-form" controlId="productCategory">
                    <Form.Label>카테고리</Form.Label>
                    <Form.Select>
                        {productCategory.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="productThumbnail">
                    <Form.Label>대표 사진</Form.Label>
                    <Form.Control type="file"/>
                </Form.Group>
            </Form>

            <div>
                <label style={{marginBottom: "8px"}}>옵션</label>
                <ProductOptionForm optionInfo={productOption}/>
            </div>


            <label style={{marginBottom: "8px"}}>상세 설명</label>
            <TextEditor
                ref={quillRef}
                defaultValue={new Delta()
                    .insert('상품 상세설명')
                    // .insert('\n', {header: 1})
                    // .insert('Some ')
                    // .insert('initial', {bold: true})
                    // .insert(' ')
                    // .insert('content', {underline: true})
                    .insert('\n')}
                // onSelectionChange={setRange}
                onTextChange={setLastChange}
            />

            <div className="submit-btn-wrapper">
                <button className="submit-btn">상품 등록</button>
            </div>

        </div>
    )
}

export default ProductEdit;