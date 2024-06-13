import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { callAppliesAdminAPI } from "../../apis/ApplyAPICalls";
import { Col, Row } from "react-bootstrap";
import { formatDate } from "../../utils/FormatDateUtil";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/items/CustomTable";
import Button from "react-bootstrap/Button";

const AdminApplyList = () => {
    const dispatch = useDispatch();
    const { adminApplyInfo } = useSelector(state => state.applyReducer);
    const [currentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callAppliesAdminAPI({ currentPage }));
    }, [dispatch, currentPage]);

    useEffect(() => {
        console.log(adminApplyInfo); // applyInfo 구조를 확인
    }, [adminApplyInfo]);

    const headers = [
        '번호', '신청코드', '상호명', '대표자', '신청일', '상태'
    ];

    const rows = adminApplyInfo && adminApplyInfo.data
        ? adminApplyInfo.data.map((info, index) => ({
            number: index + 1,
            sellerCode: info.sellerCode,
            storeName: info.storeName,
            storeRepresentativeName: info.storeRepresentativeName,
            applyDatetime: formatDate(info.applyDatetime),
            applyStatus: info.applyStatus
        }))
        : [];

    const handleRowClick = useCallback((row) => {
        navigate(`/admin/dashboard/applies/${row.sellerCode}`);
    }, [navigate]);

    const handleButtonClick = useCallback((row) => {
        console.log('Button clicked for row:', row); // 버튼 클릭 시 처리할 로직
        // 필요한 버튼 클릭 로직 추가
    }, []);

    return (
        <Row>
            <Col className="mt-5">
                <div className="fs-4 fw-semibold border-bottom border-2 border-dark-subtle p-2">신청 내역</div>
                <div className="d-flex justify-content-end mt-5">
                    {/*<Button variant="success" className="btn-sm" onClick={() => navigate("/members/mypage/apply/regist")}>*/}
                    {/*    신규 신청*/}
                    {/*</Button>*/}
                </div>
                <CustomTable
                    headers={headers}
                    rows={rows}
                    onRowClick={handleRowClick}
                    onButtonClick={handleButtonClick}
                />
            </Col>
        </Row>
    );
};

export default React.memo(AdminApplyList);
