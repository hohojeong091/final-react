import {Col, Dropdown, Row} from "react-bootstrap";
import ArrangeDrop from "../../components/items/ArrangeDrop";
import ProductItem from "../../components/items/ProductItem";
import PagingBar from "../../components/common/PagingBar";
import StoreBanner from "../../components/items/StoreBanner";
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {request} from "../../apis/api";
import {callProductListAPI} from "../../apis/ProductAPI";
import productReducer from "../../modules/ProductModules";


function ProductMain() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {products} = useSelector(state => state.productReducer);


    useEffect(() => {
        dispatch(callProductListAPI({currentPage}));
    }, [currentPage, dispatch]);

    return(
        <div className="store-main-page">

            <div className="store-banner-wrapper">
                <StoreBanner/>
            </div>

            <div className="product-list-top-wrapper">
                <div className="amount-num-wrapper">
                    <p>총 {products && products.data ? products.data.length : 0} 개</p>
                </div>
                <div className="arrange-wrapper">
                    <ArrangeDrop/>
                </div>
            </div>

            {
                products &&
                <>
                    <div className="product-list-wrapper" style={{marginTop: '15px'}}>
                        <Row>
                            {products.data.map(product => (
                                <Col key={product.productCode} style={{marginTop: '5px', marginBottom: '10px'}}>
                                    <ProductItem product={product}/>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <PagingBar/>
                </>
            }


        </div>
    );
}

export default ProductMain;