import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callOrderDetailAPI } from '../../apis/OrderAPICalls';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import Order from "../../components/items/Order";

const OrderDetails = () => {
    const { orderCode } = useParams();
    const orders = useSelector(state => state.orderReducer.orders) || [];
        // const orderDetail = useSelector(state => state.orderReducer.orderDetail) || [];

    const order = orders.data.find(order => order.orderCode == orderCode);
    // const order = orderDetail.data.find(order => order.orderCode === orderCode);

    console.log("orderCode" , orderCode);
    console.log("order" , order);
    console.log("orders" , orders);
    console.log("orders.data" , orders.data);

    if (!order) {
        return <div>주문을 찾을 수 없습니다.</div>;
    }

    return (
        order &&
        <>
            <Container className="mt-4">
                <h1>주문 ∙ 배송 > 주문 상세</h1>
                <hr/>
                <h3 className="mb-4 shipping-info-title">{order.orderDate} 주문 | (주문번호 {order.orderCode})</h3>

                <h3 className="mt-4 shipping-info-title">배송지 정보</h3>
                <Card className="mt-2 mb-4">
                    <Row>
                        <Col md={2} className="m-4 text-md-right text-sm-left">
                            <p><strong>받는 사람</strong></p>
                            <p><strong>연락처</strong></p>
                            <p><strong>주소</strong></p>
                        </Col>
                        <Col className="m-4">
                            <p>{order.receiverName}</p>
                            <p>{order.contactNumber}</p>
                            <p>({order.addressZonecode}) {order.address} {order.addressDetail}</p>
                        </Col>
                    </Row>
                </Card>

                <h3 className="mt-4 shipping-info-title">주문 상품</h3>
                <Card className="mt-2 mb-4">
                    <Card.Body>
                        <Order storeOrders={order.storeOrders}/>

                    </Card.Body>
                </Card>

                <Row>
                    <Col md={6}>
                        <h3 className="mt-4 shipping-info-title">결제 정보</h3>
                        <Card className="mt-2 mb-4">
                            <Row className="m-4">
                                <Col md={5}>
                                    <p><strong>총 상품 금액</strong></p>
                                    <p><strong>배송비</strong></p>
                                    <p><strong>할인 금액</strong></p>
                                </Col>
                                <Col className="text-right">
                                    <p>{order.totalOrderAmount}원</p>
                                    <p>{order.totalDeliveryAmount}원</p>
                                    <p>{order.totalDiscountAmount}원</p>
                                </Col>
                                <Col md={12}>
                                    <hr className="my-4"/>
                                </Col>
                                <Col md={5}>
                                    <p><strong>주문 금액</strong></p>
                                    <p><strong>카드라고 하려면 결제 테이블도 조인을 해야함</strong></p>
                                </Col>
                                <Col className="text-right">
                                    <p>{order.totalRealPayment}원</p>
                                    <p>{order.totalRealPayment}원</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col className="text-center d-flex justify-content-center align-items-center">
                        <Button variant="success" style={{width: '80%'}}>취소 신청</Button>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default OrderDetails;