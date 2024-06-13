import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {callOrdersAPI} from "../../apis/OrderAPICalls";
import Order from "../../components/items/Order";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

function OrderList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage,setCurrentPage] = useState(1);
    const orders = useSelector(state => state.orderReducer.orders) || [];

    const onClickOrderDetailsHandler = (order) => {
        console.log(order);
        navigate(`${order.orderCode}`);
    }

    useEffect(() => {
        dispatch(callOrdersAPI({currentPage}));
    }, [currentPage]);

    const orderData = orders.data

    return(
        orders &&
        <>
        <h1>주문배송목록</h1>
        <Container className="px-5 mt-4">
            {orderData && orderData.map((order) => (
                <div key={order.orderCode} className="mb-4 mt-5">
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col>
                                <Card.Title className="order-date-title">
                                    {order.orderDate} 주문 (주문번호 : {order.orderCode})
                                </Card.Title>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button
                                    variant="outline-success" style={{borderColor: 'transparent'}}
                                    onClick={e => {
                                        onClickOrderDetailsHandler(order);
                                    }}>주문상세 >
                                </Button>
                            </Col>
                        </Row>
                        <Order storeOrders={order.storeOrders} />
                    </Card.Body>
                </div>
            ))}
        </Container>
</>
);
}

export default OrderList;