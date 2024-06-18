
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        // login api call
        dispatch(login('Tom'));
        navigate("/")
    }

    return <div>
        <button onClick={handleLogin}>Login</button>
    </div>
}

export default LoginPage;