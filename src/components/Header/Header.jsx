import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { paths } from '../../routes';
import { Fragment, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faUserAlt, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import * as api from '../../services/userServices';
import { resetUser } from '../../redux/slices/userSlice';
import Loading from '../Loading';
import defaultAvatar from '../../assets/images/avatar.png';

const cx = classNames.bind(styles);

function Header() {
    const headerSectionRef = useRef();

    const userInfo = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleOpenMenuClick = (e) => {
        e.preventDefault();
        headerSectionRef.current.classList.add(cx('active'));
    };

    const handleCloseMenuClick = (e) => {
        // e.preventDefault();
        headerSectionRef.current.classList.remove(cx('active'));
    };

    const handleAccountClick = (e) => {
        e.preventDefault();
        navigate(paths.profile);
    };

    const handleLogoutClick = (e) => {
        e.preventDefault();
        setIsLoading(true);
        api.userLogout()
            .then((res) => {
                setIsLoading(false);
                alert(res.message);
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error.message);
            });
        dispatch(resetUser());
        localStorage.removeItem('access_token');
    };

    return (
        <Fragment>
            <header className={cx('header')}>
                <Link className={cx('header-logo')} to={paths.home}>
                    <img src={logo} alt="logo" />
                </Link>
                <button className={cx('header-button')} onClick={handleOpenMenuClick}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className={cx('header-section')} ref={headerSectionRef}>
                    <ul className={cx('header-items')}>
                        <li className={cx('header-item')}>
                            <Link to={paths.menu} onClick={handleCloseMenuClick}>
                                <p>Thực đơn</p>
                            </Link>
                        </li>
                        <li className={cx('header-item')}>
                            <Link to={paths.about} onClick={handleCloseMenuClick}>
                                <p>Giới thiệu</p>
                            </Link>
                        </li>
                        <li className={cx('header-item')}>
                            <Link to={paths.contact} onClick={handleCloseMenuClick}>
                                <p>Liên hệ</p>
                            </Link>
                        </li>
                    </ul>
                    {userInfo?.name ? (
                        <div className={cx('header-user')}>
                            <Link className={cx('header-user-avatar')} to={paths.profile}>
                                <img src={userInfo.avatar ? userInfo.avatar : defaultAvatar} alt="avatar" />
                                <div className={cx('header-popup')}>
                                    <p className={cx('header-user-name')}>{userInfo.name}</p>
                                    <hr />
                                    <div className={cx('header-popup-btns')}>
                                        <div className={cx('header-popup-btn')} onClick={handleAccountClick}>
                                            Tài khoản
                                        </div>
                                        <div className={cx('header-popup-btn')} onClick={handleLogoutClick}>
                                            Đăng xuất
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('header-btn-mobile')} onClick={handleLogoutClick}>
                                    Đăng xuất
                                </div>
                            </Link>
                            <button className={cx('header-user-cart')}>
                                <FontAwesomeIcon icon={faCartShopping} />
                            </button>
                        </div>
                    ) : (
                        <div className={cx('header-login')}>
                            <div className={cx('header-login-icon')}>
                                <FontAwesomeIcon icon={faUserAlt} />
                            </div>
                            <div className={cx('header-login-btns')}>
                                <Link className={cx('header-login-btn')} to={paths.register}>
                                    Đăng ký
                                </Link>
                                <Link className={cx('header-login-btn')} to={paths.login}>
                                    Đăng nhập
                                </Link>
                            </div>
                        </div>
                    )}
                    <div className={cx('header-section-button')}>
                        <button onClick={handleCloseMenuClick}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            </header>
            <Loading isLoading={isLoading} />
        </Fragment>
    );
}

export default Header;
