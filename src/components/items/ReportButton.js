import { Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";

function ReportButton({ memberCode }) {
    const navigate = useNavigate();

    const handleReportClick = (event) => {
        event.stopPropagation(); // 이벤트 전파 중지
        navigate("/members/mypage/report", { state: { memberCode } });
    };

    return (
        <>
            <Button variant="success" onClick={handleReportClick}>신고하기</Button>
        </>
    );
}

export default ReportButton;