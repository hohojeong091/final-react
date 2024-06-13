import React from 'react';
import { Row, Col, Button, Image, Card } from 'react-bootstrap';

const Order = ({ storeOrders }) => {
    return (
        <>
            {storeOrders && storeOrders.map((storeOrder) => (
                <div key={storeOrder.storeOrderCode} className="mt-3">
                    <div className="light-green-bg">{storeOrder.orderStatus}</div>
                    <Card>
                        {storeOrder.orderDetails.map((orderDetail) => (
                            <div key={orderDetail.orderDetailCode}>
                                <Row className="align-items-center" key={orderDetail.productCode}>
                                    <Col md={2} className="text-center m-3">
                                        <Image className="square-img"
                                               src={orderDetail.productImg} fluid
                                               alt={orderDetail.productName}/>
                                    </Col>
                                    <Col md={5}>
                                        <div>
                                            <Card.Title>{orderDetail.productName}</Card.Title>
                                            <Card.Text>{orderDetail.optionName}</Card.Text>
                                            <Card.Text>가격 {orderDetail.optionPrice} ·
                                                수량 {orderDetail.orderQuantity}</Card.Text>
                                        </div>
                                    </Col>
                                    <Col className="text-center">
                                        <Button variant="outline-success" style={{width: '80%'}}>문의</Button>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </Card>
                </div>
            ))}
        </>
    );
};

export default Order;
