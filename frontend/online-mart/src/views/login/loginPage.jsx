
import { useDispatch, useSelector } from 'react-redux'; 
import { login } from '../../reducers/userReducer';

const LoginPage = () => {
    const dispatch = useDispatch();
    const name = useSelector((state) => state.user.name);

    return <div>
    <button onClick={() => dispatch(login('Tom'))}>Login</button>
    <h1>Hello {name}</h1>
    </div>
}

export default LoginPage;