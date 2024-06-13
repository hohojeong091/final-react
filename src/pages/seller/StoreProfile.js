import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import { callStoreAPI, callUpdateStoreAPI, callPauseStoreAPI, callModifyNewStoreAPI } from '../../apis/SellerAPICalls';
import {Container, Row, Col, Button, Image, Form, Modal} from 'react-bootstrap';
import { PiStorefrontLight } from 'react-icons/pi';
import { formatDate } from '../../utils/FormatDateUtil';
import { FcCancel } from 'react-icons/fc';
import { FaEdit, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';

function StoreProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { sellerCode } = useParams();
    const { storeInfo } = useSelector(state => state.sellerReducer);
    const [isEditing, setIsEditing] = useState(false);
    const [showPauseModal, setShowPauseModal] = useState(false);
    const [suspendedEndDate, setSuspendedEndDate] = useState('');
    const [form, setForm] = useState({
        storeName: '',
        storeInfo: '',
        address: '',
        addressDetail: ''
    });

    useEffect(() => {
        if (sellerCode) {
            dispatch(callStoreAPI(sellerCode));
        }
    }, [dispatch, sellerCode]);

    useEffect(() => {
        if (storeInfo) {
            setForm({
                storeName: storeInfo.storeName || '',
                storeInfo: storeInfo.storeInfo || '',
                address: storeInfo.address || '',
                addressDetail: storeInfo.addressDetail || ''
            });
        }
    }, [storeInfo]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (storeInfo) {
            setForm({
                storeName: storeInfo.storeName || '',
                storeInfo: storeInfo.storeInfo || '',
                address: storeInfo.address || '',
                addressDetail: storeInfo.addressDetail || ''
            });
        }
    };

    const handleSave = async () => {
        try {
            const storeRequest = {
                storeName: form.storeName,
                storeInfo: form.storeInfo,
                address: form.address,
                addressDetail: form.addressDetail,
            };

            if (storeInfo.storeStatus === 'PRE_OPEN') {
                await dispatch(callModifyNewStoreAPI({ sellerCode, storeRequest }));
            } else {
                await dispatch(callUpdateStoreAPI({ sellerCode, storeRequest }));
            }

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating store info:', error);
            toast.error("스토어 정보 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const handlePause = async () => {
        try {
            await dispatch(callPauseStoreAPI(sellerCode, suspendedEndDate));
            setShowPauseModal(false);
            navigate(`/seller/mystore/main`);
        } catch (error) {
            console.error('Error pausing store:', error);
            toast.error("스토어 정지 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    return (
        storeInfo && (
            <>
                <div className="fs-4 fw-semibold border-bottom border-2 border-dark-subtle p-2">스토어 정보</div>
                <Container className="mt-5" style={{ marginBottom: '100px' }}>
                    <Row className="py-5 bg-body-tertiary fs-5 flex-fill rounded-4">
                        <Col className="col-4 d-flex justify-content-center py-2 m-3">
                            {storeInfo.profilePicture ? (
                                <Image
                                    src={storeInfo.profilePicture}
                                    roundedCircle
                                    className="mx-auto d-block mb-3"
                                    style={{ width: '130px', height: '130px' }}
                                />
                            ) : (
                                <PiStorefrontLight style={{ width: '130px', height: '130px' }} />
                            )}
                        </Col>
                        <Col>
                            <div className="pt-2 fw-bolder fs-3">{storeInfo.storeName}</div>
                            <div className="pt-2">{storeInfo.storeInfo}</div>
                            <div className="pt-2 fs-6 text-secondary">스토어 승인일 : {formatDate(storeInfo.applyProcessingDate)}</div>
                            <Button variant="outline-info" className="me-2 w-50 mt-3">스토어 바로가기</Button>
                        </Col>
                    </Row>
                    <Container className="p-4 mt-3">
                        {storeInfo.storeStatus !== 'CLOSED' && storeInfo.storeStatus !== 'QUIT' && (
                            <div className="d-flex justify-content-end border-bottom border-2 pb-3">
                                {isEditing ? (
                                    <>
                                        <Button variant="outline-secondary" className="btn-sm mx-1" onClick={handleCancel}>
                                            <FcCancel /> 취소
                                        </Button>
                                        <Button variant="outline-success" className="btn-sm mx-1" onClick={handleSave}>
                                            <FaSave /> 저장
                                        </Button>
                                    </>
                                ) : (
                                    <Button variant="outline-secondary" className="btn-sm mx-1" onClick={handleEdit}>
                                        <FaEdit /> 편집
                                    </Button>
                                )}
                            </div>
                        )}
                        <Row className="mt-5 justify-content-center">
                            <Col md={8}>
                                <Form>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5}>상호명</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control
                                                plaintext={!isEditing}
                                                readOnly={!isEditing}
                                                name="storeName"
                                                value={form.storeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5}>스토어 운영 상태</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control plaintext readOnly defaultValue={storeInfo.storeStatus} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5}>사업자번호</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control plaintext readOnly defaultValue={storeInfo.businessNumber} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5}>통신판매업번호</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control plaintext readOnly defaultValue={storeInfo.mosNumber} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5}>스토어 소개</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control
                                                plaintext={!isEditing}
                                                readOnly={!isEditing}
                                                name="storeInfo"
                                                value={form.storeInfo}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5}>주소</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control
                                                plaintext={!isEditing}
                                                readOnly={!isEditing}
                                                name="address"
                                                value={form.address}
                                                onChange={handleChange}
                                            />
                                            <Form.Control
                                                plaintext={!isEditing}
                                                readOnly={!isEditing}
                                                name="addressDetail"
                                                value={form.addressDetail}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5}>대표자</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control plaintext readOnly defaultValue={storeInfo.storeRepresentativeName} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5}>고객센터</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control plaintext readOnly defaultValue={storeInfo.contactNumber} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5}>주 카테고리</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control plaintext readOnly defaultValue={storeInfo.storeType} />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        {storeInfo.storeStatus !== 'QUIT' && (
                            <div className="d-flex justify-content-between mt-5">
                                {storeInfo.storeStatus === 'CLOSED' ? (
                                    <Button variant="outline-success" className="me-2 w-100">정지 해제</Button>
                                ) : (
                                    <>
                                        <Button variant="outline-secondary" className="me-2 w-50" onClick={() => setShowPauseModal(true)}>운영 정지</Button>
                                        <Button variant="outline-danger" className="w-50">스토어 삭제</Button>
                                    </>
                                )}
                            </div>
                        )}
                    </Container>
                </Container>
                <Modal show={showPauseModal} onHide={() => setShowPauseModal(false)} style={{marginTop: 300}}>
                    <Modal.Header closeButton>
                        <Modal.Title>스토어 운영 정지</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="suspendedEndDate">
                            <Form.Label className="mb-3">정지 종료 날짜를 선택해 주세요.</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="suspendedEndDate"
                                value={suspendedEndDate}
                                onChange={(e) => setSuspendedEndDate(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setShowPauseModal(false)}>
                            취소
                        </Button>
                        <Button variant="outline-info" onClick={handlePause}>
                            저장
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    );
}

export default StoreProfile;
