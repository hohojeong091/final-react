import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {callProductListAPI} from "../../apis/ProductAPI";
import {AdminCategoryAPICalls} from "../../apis/AdminCategoryAPICalls";

function ProductForm(props) {

    const [imageUrl, setImageUrl] = useState(props.productForm.productImageUrl);

    const onChangeHandler = e => {
        props.setProductForm && props.setProductForm({
            ...props.productForm,
            [e.target.name] : e.target.value

        })
    }

    const onClickImageUpload = () => {
        props.imageInput.current.click();
    }

    const onChangeImageUpload = () => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            if(result) setImageUrl(result);
        }
        if(props.imageInput.current.files[0])
            fileReader.readAsDataURL(props.imageInput.current.files[0]);
    }


return (
    <div>
        <Form className="product-regist-forms">
            <Form.Group className="product-info-form" controlId="productName">
                <Form.Label>상품명</Form.Label>
                <Form.Control
                    type="text"
                    name="productName"
                    onChange={onChangeHandler}
                    value={props.productForm.productName}
                />
            </Form.Group>

            <Form.Group className="product-info-form" controlId="productStatus">
                <Form.Label>판매 상태</Form.Label>
                <Form.Select name="sellableStatus" value={props.productForm.sellableStatus} onChange={onChangeHandler}>
                    <option value="Y">판매중</option>
                    <option value="N">구매불가</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="product-info-form" controlId="productCategory">
                <Form.Label>카테고리</Form.Label>
                <Form.Select name="categoryCode" value={props.productForm.categoryCode} onChange={onChangeHandler}>
                    {props.category.map(ct => (
                        <option key={ct.categoryCode} value={ct.categoryCode}>
                            {ct.categoryTitle}
                        </option>
                    ))
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="productThumbnail">
                <Form.Label>대표 사진</Form.Label>
                <Form.Control accept='image/jpg,image/png,image/jpeg,image/gif'
                              ref={ props.imageInput }
                              onChange={ onChangeImageUpload }
                              type="file"/>
                <button onClick={ onClickImageUpload } type="button">
                    이미지 업로드
                </button>
            </Form.Group>
        </Form>
    </div>

    );
}

export default ProductForm;