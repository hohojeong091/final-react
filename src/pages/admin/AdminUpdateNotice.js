import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from 'react-redux';
import { AdminNoticeModifyAPICalls, NoticeAPICalls } from '../../apis/NoticeAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import '../../style.css';

const AdminEditNotice = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const editorRef = useRef(null);

    const noticeCode = location.state ? location.state : null; // 공지사항 정보 가져오기

    const { notice } = useSelector(state => state.noticeReducer);

    const [form, setForm] = useState({
        noticeTitle: notice?.noticeTitle || '',
        noticeContent: notice?.noticeContent || ''
    });

    useEffect(() => {
        if (noticeCode) {
            dispatch(NoticeAPICalls({ noticeCode }));
        }
    }, [noticeCode, dispatch]);

    useEffect(() => {
        if (notice) {
            setForm({
                noticeTitle: notice.noticeTitle,
                noticeContent: notice.noticeContent
            });
        }
    }, [notice]);

    const handleNoticeTitleChange = (event) => {
        setForm({
            ...form,
            noticeTitle: event.target.value
        });
    };

    const handleNoticeContentChange = (content) => {
        setForm({
            ...form,
            noticeContent: content
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const confirmSubmit = window.confirm("수정하시겠습니까?");
        if (!confirmSubmit) {
            return;
        }

        dispatch(AdminNoticeModifyAPICalls({
            noticeCode: noticeCode,
            modifyRequest: {
                noticeTitle: form.noticeTitle,
                noticeContent: form.noticeContent
            }
        }));

        navigate('/notice'); // 수정 완료 후 목록 페이지로 이동
    };

    return (
        <Container fluid className="edit-notice-container mt-4 px-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="edit-notice-title">공지사항 수정</h2>
                <Button variant="success" onClick={handleSubmit}>수정 완료</Button>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" className="mb-4">
                    <Form.Label>제목</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="제목을 입력하세요"
                        name="noticeTitle"
                        value={form.noticeTitle}
                        onChange={handleNoticeTitleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formContent">
                    <Form.Label>내용</Form.Label>
                    <ReactQuill
                        value={form.noticeContent}
                        onChange={handleNoticeContentChange}
                        ref={editorRef}
                    />
                </Form.Group>
            </Form>
        </Container>
    );
};

export default AdminEditNotice;
