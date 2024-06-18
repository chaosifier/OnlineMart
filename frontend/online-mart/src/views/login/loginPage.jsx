
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await dispatch(loginUser({username: "abc", password: "pwd"})).unwrap();
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return <div>
        <button onClick={handleLogin}>Login</button>
    </div>
}

export default LoginPage;