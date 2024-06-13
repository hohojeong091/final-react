import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {callProductDetailAPI} from "../../apis/ProductAPI";
import ProductDetailItem from "../../components/items/ProductDetailItem";

function ProductDetail() {

    const dispatch = useDispatch();
    const { productCode} = useParams();
    const { product } = useSelector(state => state.productReducer);
    // const { option } = useSelector( state => state.optionReducer);

    const [selectOption, setSelectOption] = useState({
        optionName : '',
        optionPrice: ''
    });

    useEffect(() => {
        dispatch(callProductDetailAPI({productCode}));
    }, []);


    console.log('product', product);
    return (
        <>
            {
                product &&
                    <div>
                        <ProductDetailItem product={product.productInfo} option={product.productOptions} selectOption={selectOption} setSelectOption={setSelectOption}/>
                    </div>
            }
        </>
    );
}

export default ProductDetail;