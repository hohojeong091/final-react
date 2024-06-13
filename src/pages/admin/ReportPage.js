import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReportAPICalls } from '../../apis/ReportAPICalls';

const ReportPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { memberCode } = location.state || {}; // 전달된 memberCode
    const [form, setForm] = useState({
        memberCode: memberCode || 4, // 전달된 memberCode가 없으면 기본값 4를 사용
        reportReason : ""
    });
    const [screenshots, setScreenshots] = useState([]);

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const handleFileUpload = (e) => {
        setScreenshots([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('reportRequest', new Blob([JSON.stringify(form)], { type : 'application/json'}));
        screenshots.forEach((file, index) => {
            formData.append(`screenshot${index}`, file);
        });

        await dispatch(ReportAPICalls({ reportRequest: formData }));

        alert('신고가 접수되었습니다.');
        navigate(-1); // 이전 페이지로
    };

    return (
        <div className="report-page">
            <h2>신고하기</h2>
            <p>
                해당 사용자 또는 스토어를 신고하는 사유를 선택해주세요. (다중 선택 가능)
                신고 사유와 상세 사항을 남겨주시면 초록팀에서 확인 후 알맞은 조치를 취해요.
                동일인에 대한 중복신고는 한달에 최대 2회까지 가능하니 참고해주세요.
                자세한 신고 규정은 신고 규정과 정책을 확인 부탁드려요.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="reportDetails">신고 사유 관련 상세 사항을 남겨주세요.</label>
                    <textarea
                        id="reportDetails"
                        value={form.reportReason}
                        name="reportReason"
                        onChange={onChangeHandler}
                        maxLength="50"
                        placeholder="최대 20~50글자"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="screenshots">스크린샷을 업로드 해주세요 (최대 50mb, 9개)</label>
                    <input
                        type="file"
                        id="screenshots"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => window.history.back()}>취소하기</button>
                    <button type="submit">신고하기</button>
                </div>
            </form>
        </div>
    );
};

export default ReportPage;