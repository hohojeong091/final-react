import SignupForm from "../../components/form/SignupForm";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {reset} from "../../modules/MemberModules";
import {ToastContainer} from "react-toastify";

function Signup() {

    const { success } = useSelector(state => state.memberReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (success === true) {
            navigate(`/`);
            dispatch(reset());
        }
    }, [success]);

    return (
        <>
            {/*<ToastContainer hideProgressBar={true} position="top-center"/>*/}
            <SignupForm/>
        </>
    );
}

export default Signup;