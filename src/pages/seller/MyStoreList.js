import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {callStoreListAPI} from "../../apis/SellerAPICalls";
import StoreProfileItem from "../../components/items/StoreProfileItem";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

function MyStoreList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        sellerInfo } = useSelector(state => state.sellerReducer);

    useEffect(() => {
        dispatch(callStoreListAPI());
    }, []);

    const handleClick = (sellerCode) => {
        navigate(`/seller/mystore/${sellerCode}`);
    };

    return (
        <>
            <div className="fs-4 fw-semibold border-bottom border-2 border-dark-subtle p-2">스토어 목록</div>
            <Container className="mt-5" style={{marginBottom: "100px"}}>
                <Row className="justify-content-center">
                    {sellerInfo && sellerInfo.map(store => (
                        <Col
                            className="mb-3 col-lg-6"
                            key={store.sellerCode}
                            onClick={() => handleClick(store.sellerCode)}
                        >
                            <StoreProfileItem store={store}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default MyStoreList;
