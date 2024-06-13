import React, {useEffect, useRef, useState} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import ReactQuill from "react-quill";
import { useDispatch } from 'react-redux';
import { AdminNoticeCreateAPICalls, AdminNoticeModifyAPICalls } from '../../apis/NoticeAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import '../../style.css';

const AdminCreateNotice = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const notice = location.state ? location.state.notice : null;
    const editorRef = useRef(null); // React Quill 참조


    const [form, setForm] = useState({
        noticeTitle: "",
        noticeContent: ""
    });

    useEffect(() => {
        if (notice) {
            console.log(notice)
            setForm({
                noticeTitle: notice.noticeTitle,
                noticeContent: notice.noticeContent
            });
        }
    }, [notice]);

    const handleNoticeTitleChange = (event) => {
        const title = event.target.value || ""; // 값이 null이면 빈 문자열로 설정
        console.log(form)
        setForm({
            ...form,
            noticeTitle: title
        });
    };

    const handleNoticeContentChange = (content) => {
        // Delta 객체를 가져와서 HTML 형식의 문자열로 변환합니다.
        // const htmlContent = editorRef.current?.getEditor().root.innerHTML || "";
        setForm({
            ...form,
            noticeContent: content
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const confirmSubmit = window.confirm("등록하시겠습니까?");
        if (!confirmSubmit) {
            return;
        }

        console.log("f: ",form);

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('noticeCreateRequest', new Blob([JSON.stringify(form)], {type : 'application/json'}));

        try {
            if (notice) {
                // 수정하기 페이지에서 작성 완료 버튼을 눌렀을 때
                await dispatch(AdminNoticeModifyAPICalls({ noticeCode: notice.noticeCode, modifyRequest: formData }));
            } else {
                // 새로운 공지사항을 등록할 때
                await dispatch(AdminNoticeCreateAPICalls({ noticeCreateRequest: formData }));
            }
            navigate('/notice'); // 작성 완료 후 /notice 페이지로 이동
        } catch (error) {
            console.error("Failed to create notice:", error);
        }
    };


    return (
        <Container fluid className="create-notice-container mt-4 px-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="create-notice-title">공지사항 작성</h2>
                <Button variant="success" onClick={handleSubmit}>작성 완료</Button>
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
                        ref={editorRef} // React Quill 참조 설정
                    />
                </Form.Group>
            </Form>
        </Container>
    );
};

export default AdminCreateNotice;