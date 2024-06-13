import Image from 'react-bootstrap/Image';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import React from "react";
import Button from "react-bootstrap/Button";
import {RiMedalLine} from "react-icons/ri";
import {GiGreenhouse} from "react-icons/gi";
import {PiStorefrontLight} from "react-icons/pi";
import StoreCategoryButtons from "./StoreCategoryButtons";
import {useNavigate} from "react-router-dom";

function MainItem() {

    const navigate = useNavigate();

    return (
        <>
            <Container style={{marginBottom: "100px"}}>
                <Row>
                    <Col className="d-flex align-items-center justify-content-center">
                        <Image src="/greenFire_logo.png" fluid/>
                    </Col>
                </Row>
                <Col className="text-center">
                    <h5>누구에게나 마음 속 초록불은 있다!<br/>당신의 마음에 초록불을 밝혀보세요.</h5>
                </Col>
            </Container>
            {/*<div className="border-bottom border-1 border-success" style={{marginTop: "100px"}}/>*/}
            <Row>
                <Col
                    style={{
                        backgroundColor: "rgba(181,208,181,0.25)",
                        height: "500px",
                        color: "rgba(181,208,181,0.25)",
                        fontSize: "100px",
                        fontWeight: "bolder",
                        letterSpacing: "80px",
                        overflow: "auto"
                    }}
                    className="col-lg-6 col-md-12 px-5 d-flex align-items-center justify-content-start text-end">
                    GREEN<br/>FIRE
                </Col>
                <Col
                    style={{
                        backgroundColor: "rgba(181,208,181,0.25)",
                        height: "500px",
                        color: "rgba(68,75,68,0.8)",
                        fontSize: "15px",
                        fontWeight: "lighter"
                    }}
                    className="col-lg-6 col-md-12 col-sm-auto px-5 d-flex align-items-center justify-content-start text-start">
                    <div
                        className="lh-lg"
                        style={{
                            maxHeight: "100%",
                            overflow: "auto",
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            paddingRight: "15px"
                        }}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: "30px"}}>지속 가능성과 윤리적 소비의 길을 밝히다.</div>
                            <br/>

                            <div style={{fontWeight: "bold", fontSize: "20px"}}>첫번째, 지구를 생각하는 지속 가능성</div>
                            <div>우리는 지구의 건강을 최우선으로 생각합니다. 모든 제품은 환경에 미치는 영향을 최소화하기 위해 엄격한 기준을 통과하며, 포장재부터 배송 방법까지 친환경적인
                                선택을
                                지향합니다.
                            </div>
                            <br/>
                            <div style={{fontWeight: "bold", fontSize: "20px"}}>두번째, 동물 복지와 윤리적 소비</div>
                            <div>초록불은 동물에게 고통을 주지 않는 비건 제품만을 제공합니다. 우리는 동물 복지를 존중하며, 윤리적 소비를 통해 모든 생명이 존중받는 세상을 만들어 나갑니다.</div>
                            <br/>
                            <div style={{fontWeight: "bold", fontSize: "20px"}}>세번째, 투명성과 신뢰</div>
                            <div>고객에게 정직하고 투명한 정보를 제공합니다. 제품의 성분, 원산지, 제조 과정 등에 대해 투명하게 공개하며, 신뢰를 바탕으로 한 고객 관계를 중요하게
                                생각합니다.</div>
                        </div>
                    </div>
                </Col>
            </Row>
            {/*<Card style={{ width: '18rem' }}>*/}
            <Container className="mt-5" style={{marginBottom: "100px"}}>
                <Row style={{marginTop: '5px', marginBottom: '10px'}}>
                    <Col>

                        <Card.Title
                            className="d-flex justify-content-center py-2 m-3"
                        ><RiMedalLine style={{width: "130px", height: "130px"}}/></Card.Title>
                        <Card.Body className="text-center">
                            <Card.Title>초록불 챌린지</Card.Title>
                            <Card.Text>
                                친환경 제품을 판매하는<br/> 초록불의 스토어입니다.
                            </Card.Text>
                            <Button
                                variant="outline-success"
                                onClick={() => navigate('/challenge')}
                            >스토어 바로가기</Button>
                        </Card.Body>
                    </Col>
                    <Col>

                        <Card.Title
                            className="d-flex justify-content-center py-2 m-3"
                        ><GiGreenhouse style={{width: "130px", height: "130px"}}/></Card.Title>
                        <Card.Body className="text-center">
                            <Card.Title>반딧불이 스토어</Card.Title>
                            <Card.Text>
                                친환경 제품을 판매하는<br/> 초록불의 스토어입니다.
                            </Card.Text>
                            <Button
                                variant="outline-success"
                                onClick={() => navigate('/product')}
                            >스토어 바로가기</Button>
                        </Card.Body>
                    </Col>
                    <Col>

                        <Card.Title
                            className="d-flex justify-content-center py-2 m-3"
                        ><PiStorefrontLight style={{width: "130px", height: "130px"}}/></Card.Title>
                        <Card.Body className="text-center">
                            <Card.Title>스토어 입점</Card.Title>
                            <Card.Text>
                                친환경 제품을 판매하는<br/> 초록불의 스토어입니다.
                            </Card.Text>
                            <Button
                                variant="outline-success"
                                onClick={() => navigate('/members/mypage')}
                            >스토어 바로가기</Button>
                        </Card.Body>
                    </Col>

                </Row>
            </Container>

            <Row>
                <Col
                    style={{
                        backgroundColor: "rgba(127,216,89,0.22)",
                        height: "500px",
                        color: "rgba(68,75,68,0.8)",
                        fontSize: "15px",
                        fontWeight: "lighter"
                    }}
                    className="col-lg-6 col-md-12 col-sm-auto px-5 d-flex align-items-center justify-content-start text-end">
                    <div
                        className="lh-lg"
                        style={{
                            maxHeight: "100%",
                            overflow: "auto",
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            paddingRight: "15px"
                        }}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: "30px"}}>초록불은 환경보호단체와 함께합니다.</div>
                            <br/>

                            <div style={{fontWeight: "bold", fontSize: "15px"}}>온실가스 배출 감소</div>
                            <div>비건 식단은 육류 및 유제품 생산에 비해 훨씬 적은 양의 온실가스를 배출합니다. 축산업은 전 세계 온실가스 배출의 약 14.5%를 차지하는데, 비건 생활은 이 배출을 크게 줄일 수 있습니다.
                            </div>
                            <br/>
                            <div style={{fontWeight: "bold", fontSize: "15px"}}>수자원 보호</div>
                            <div>비건 식단은 물 사용량을 크게 줄입니다. 육류 생산에는 대량의 물이 필요하지만, 식물 기반 식단은 상대적으로 적은 양의 물로도 충분합니다. 이는 소중한 수자원을 보호하는 데 중요한 역할을 합니다.
                            </div>
                            <br/>
                            <div style={{fontWeight: "bold", fontSize: "15px"}}>토지 사용 효율성</div>
                            <div>비건 식단은 토지 사용을 효율적으로 만듭니다. 육류 생산을 위해서는 넓은 목초지와 사료 재배지가 필요하지만, 식물 기반 식품은 훨씬 적은 토지로도 생산이 가능합니다. 이는 삼림 벌채와 서식지 파괴를 줄이는 데 기여합니다.
                            </div>
                        </div>
                    </div>
                </Col>
                <Col
                    style={{
                        backgroundColor: "rgba(127,216,89,0.22)",
                        height: "500px",
                        color: "rgba(181,208,181,0.25)",
                        fontSize: "100px",
                        fontWeight: "bolder",
                        letterSpacing: "80px",
                        overflow: "auto"
                    }}
                    className="col-lg-6 col-md-12 px-5 d-flex align-items-center justify-content-start text-start">
                    GREEN<br/>FIRE
                </Col>
            </Row>

            {/* 식품, 주방용품, 생활용품, 생필품 버튼*/}
            <StoreCategoryButtons/>

        </>
    );
}

export default MainItem;