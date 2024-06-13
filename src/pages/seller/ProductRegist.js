import ReactQuill, {Quill} from 'react-quill';
import TextEditor from "../../components/items/TextEditor";
import React, {useEffect, useRef, useState} from 'react';
import {Form} from "react-bootstrap";
import ProductOptionForm from "../../components/form/ProductOptionForm";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import ProductForm from "../../components/form/ProductForm";
import {AdminCategoryAPICalls} from "../../apis/AdminCategoryAPICalls";
import {callProductOptionListAPI, callSellerProductRegistAPI} from "../../apis/ProductAPI";
import {success} from "../../modules/AdminCategoryModules";
import ProductOptionAddForm from "../../components/form/ProductOptionAddForm";
import {registSuccess} from "../../modules/ProductModules";


const Delta = Quill.import('delta');


// 값 제대로 넘겨줘야함 sellablestatus 다시 넣어주고 카테고리 선택되면 setcategory 해줄 수 있는 함수 작성

function ProductRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { adminCategory, success, loading, error } = useSelector(state => state.category);
    const { saveSuccess } = useSelector(state => state.productReducer);

    // db 수정 후 상품 설명 추가 필요
    const [productForm, setProductForm] = useState({
        productName : '',
        sellableStatus: '',
        categoryCode: '',
        productDescription: '',
        // productImageUrl: ''
    });

    const [options, setOptions] = useState([]);
    const imageInput = useRef();
    /* 텍스트 에디터 */
    const [lastChange, setLastChange] = useState();
    const quillRef = useRef();


    useEffect(() => {
        if (saveSuccess === true) navigate('/seller/mystore/product');
    }, [saveSuccess]);


    useEffect(() => {
        dispatch(AdminCategoryAPICalls());
    }, [dispatch]);


    const removeOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const sellableStatus = ["Y", "N"]

    const submitProductRegistHandler = () => {
        const formData = new FormData();

        if (imageInput.current.files.length > 0) {
            formData.append('productImg', imageInput.current.files[0]);
        }

        console.log('productForm: ', productForm);
        console.log('options: ', options);
        formData.append('productCreateRequest', new Blob([JSON.stringify(productForm)], { type : 'application/json'}));
        formData.append('productOptionCreateRequest', new Blob([JSON.stringify(options)], { type : 'application/json'}));
        dispatch(callSellerProductRegistAPI({ formData }));
    }

    console.log('options: ', options);

    return (
        <div className="product-regist-page">

            <div>
                <ProductForm sellableStatus={sellableStatus} category={adminCategory} imageInput={imageInput} productForm={productForm} setProductForm={setProductForm}/>
            </div>

            <div>
                <label style={{marginBottom: "8px"}}>옵션</label>
                <ProductOptionAddForm options={options} setOptions={setOptions} removeOption={removeOption}/>
            </div>


            <label style={{marginBottom: "8px"}}>상세 설명</label>
            <TextEditor
                ref={quillRef}
                defaultValue={new Delta()
                    .insert('상품 상세설명')
                    .insert('\n')}
                onTextChange={setLastChange}
            />

            <div className="submit-btn-wrapper">
                <button className="submit-btn" onClick={submitProductRegistHandler}>상품 등록</button>
            </div>

        </div>
    )
}

export default ProductRegist;