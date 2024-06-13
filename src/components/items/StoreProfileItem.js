import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { PiStorefrontLight } from "react-icons/pi";
import Image from "react-bootstrap/Image";
import Badge from 'react-bootstrap/Badge';
import '../../style.css';
import {useNavigate} from "react-router-dom";

function StoreProfileItem({ store }) {

    const navigate = useNavigate();

    const handleClick = (sellerCode) => {
        navigate(`/seller/mystore/${sellerCode}`);
    };

    const getOverlayText = (status) => {
        switch (status) {
            case 'PRE_OPEN':
                return '등록이 필요한 스토어입니다.';
            case 'CLOSED':
                return '정지된 스토어입니다.';
            case 'QUIT':
                return '삭제된 스토어입니다.';
            default:
                return '';
        }
    };

    const showOverlay = ['PRE_OPEN', 'CLOSED', 'QUIT'].includes(store.storeStatus);

    return (
        <div className="store-position-relative">
            <Card key={store.storeCode} className="mb-4">
                <div className="store-position-relative">
                    <Card.Title className="d-flex justify-content-center py-2 m-3">
                        {store.profilePicture ? (
                            <Image
                                src={store.profilePicture}
                                roundedCircle
                                className="mx-auto d-block mb-3"
                                style={{width: "130px", height: "130px"}}
                            />
                        ) : (
                            <PiStorefrontLight style={{width: "130px", height: "130px"}}/>
                        )}
                        {store.storeStatus === 'PRE_OPEN' && (
                            <Badge
                                bg="success"
                                className="position-absolute"
                                style={{top: '10px', right: '10px', zIndex: 2}}
                            >
                                New
                            </Badge>
                        )}
                    </Card.Title>
                    <Card.Body className="text-center">
                        <Card.Title>{store.storeName}</Card.Title>
                        <Card.Text>
                            대표자: {store.storeRepresentativeName}<br/>
                            상태: {store.storeStatus}
                        </Card.Text>
                        <Button
                            variant="outline-success"
                            onClick={() => handleClick(store.sellerCode)}>
                            스토어 바로가기
                        </Button>
                    </Card.Body>
                    {showOverlay && (
                        <div className="store-card-overlay">
                            <div className="store-card-overlay-text">
                                {getOverlayText(store.storeStatus)}
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default StoreProfileItem;