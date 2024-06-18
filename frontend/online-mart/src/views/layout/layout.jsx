import { useDispatch, useSelector } from 'react-redux'; 
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector((state) => state.user.name);

    return <div>
        <h1>Hello {name}</h1>
        <Outlet/>
    </div>
}

export default Layout;