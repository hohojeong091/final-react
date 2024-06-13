import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {NoticeAPICalls} from "../../apis/NoticeAPICalls";
import {useLocation, useNavigate} from "react-router-dom";

function Notice() {
    const dispatch = useDispatch();
    const { notice } = useSelector(state => state.noticeReducer);
    const location = useLocation();
    const noticeCode = location.state || {};
    const navigate = useNavigate();
    const onClickHandler = () => navigate(-1);

    useEffect(() => {
        console.log("noticecode: ",noticeCode);
        dispatch(NoticeAPICalls({ noticeCode }));
    }, [dispatch]);
    return (

        notice &&

        <Container className="mt-5">
            <Card>
                <Card.Header className="bg-light text-muted">커뮤니티 관리 &gt; 공지사항</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Button variant="success" size="sm" className="mb-2">공지</Button>
                        <span className="ml-2">{notice.noticeTitle}</span>
                    </Card.Text>
                    <Card.Text className="text-right text-muted">{notice.memberName} | {notice.noticeDate}</Card.Text>
                    <hr />
                    <div className="my-4">
                        <img src="your-logo-url" alt="Green Fire Logo" style={{ width: '100px' }} />
                        {notice.noticeContent}
                    </div>
                </Card.Body>
                <Card.Footer className="bg-light text-right">
                <span onClick={onClickHandler} style={{cursor: 'pointer'}}>
                                    〈 이전으로</span>{' '}
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default Notice;
