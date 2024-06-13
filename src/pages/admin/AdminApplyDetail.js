import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import {
    callAdminApplyAcceptAPI,
    callAdminApplyRejectAPI,
    callAdminApplyDetailAPI
} from "../../apis/ApplyAPICalls";
import { toast } from "react-toastify";

const AdminApplyDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { sellerCode } = useParams();
    const { adminApplyDetail, isLoading } = useSelector(state => state.applyReducer);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        dispatch(callAdminApplyDetailAPI(sellerCode));
    }, [dispatch, sellerCode]);

    const handleApprove = async () => {
        try {
            const applyRequest = {
                storeName: adminApplyDetail.storeName,
                storeRepresentativeName: adminApplyDetail.storeRepresentativeName,
                businessNumber: adminApplyDetail.businessNumber,
                mosNumber: adminApplyDetail.mosNumber,
                storeType: adminApplyDetail.storeType,
                applyContent: adminApplyDetail.applyContent,
                applyStatus: 'APPLY'
            };

            await dispatch(callAdminApplyAcceptAPI({ sellerCode, applyRequest }));
            toast.success("신청이 승인되었습니다.");
            navigate(`/admin/dashboard/applies`);
        } catch (error) {
            console.error('Error approving apply info:', error);
            toast.error("신청 승인 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const handleReject = async () => {
        try {
            const applyRequest = {
                storeName: adminApplyDetail.storeName,
                storeRepresentativeName: adminApplyDetail.storeRepresentativeName,
                businessNumber: adminApplyDetail.businessNumber,
                mosNumber: adminApplyDetail.mosNumber,
                storeType: adminApplyDetail.storeType,
                applyContent: adminApplyDetail.applyContent,
                rejectReason: rejectReason
            };

            await dispatch(callAdminApplyRejectAPI({ sellerCode, applyRequest }));
            toast.success("신청이 반려되었습니다.");
            setShowRejectModal(false);
            navigate(`/admin/dashboard/applies`);
        } catch (error) {
            console.error('Error rejecting apply info:', error);
            toast.error("신청 반려 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    if (isLoading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="mt-5">
            <Row className="justify-content-md-center">
                <Col className="col-8">
                    <div className="w-100 mb-5 fs-4 fw-semibold border-bottom border-2 border-dark-subtle p-2">반딧불이 스토어 신청 상세</div>
                    {adminApplyDetail && (
                        <div>
                            <Form.Group as={Row} className="mb-3" controlId="formStoreName">
                                <Form.Label column sm="3">상호명</Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={adminApplyDetail.storeName}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formStoreRepresentativeName">
                                <Form.Label column sm="3">대표자</Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={adminApplyDetail.storeRepresentativeName}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formBusinessNumber">
                                <Form.Label column sm="3">사업자등록번호</Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={adminApplyDetail.businessNumber}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formMosNumber">
                                <Form.Label column sm="3">통신판매업번호</Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={adminApplyDetail.mosNumber}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formStoreType">
                                <Form.Label column sm="3">전문분야</Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={adminApplyDetail.storeType}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formApplyContent">
                                <Form.Label column sm="3">신청 한 마디</Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={adminApplyDetail.applyContent}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formApplyDatetime">
                                <Form.Label column sm="3">신청일</Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={adminApplyDetail.applyDatetime}/>
                                </Col>
                            </Form.Group>
                            <div className="w-100 mb-1 fs-4 fw-semibold border-bottom border-2 border-dark-subtle p-2"></div>
                            <div className="d-flex justify-content-end mt-3">
                                <Button variant="outline-success" className="btn-md mx-1" onClick={handleApprove}>
                                    승인
                                </Button>
                                <Button variant="outline-danger" className="btn-md mx-1"
                                        onClick={() => setShowRejectModal(true)}>
                                    반려
                                </Button>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
            <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>반려 사유 입력</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formRejectReason">
                        <Form.Label>반려 사유</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowRejectModal(false)}>
                        취소
                    </Button>
                    <Button variant="outline-danger" onClick={handleReject}>
                        반려
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminApplyDetail;
