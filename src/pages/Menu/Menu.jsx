import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import * as api from '../../services/productServices';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Menu() {
    const userInfo = useSelector((state) => state.user);

    const getdata = async () => {
        const res = await api.productGetAll();
        console.log(res);
    };

    useEffect(() => {
        getdata();
    }, []);
    return <div>Menu page</div>;
}

export default Menu;
