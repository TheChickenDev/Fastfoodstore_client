import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { homeImg } from '../../assets/images/home';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { paths } from '../../routes';

const cx = classNames.bind(styles);

function Home() {
    const pcBannersRef = useRef();
    const mobileBannersRef = useRef();

    const bannerIndexRef = useRef(1);
    const [bannerIndex, setBannerIndex] = useState(1);

    const handleChangeBanner = (e, isLeftBtn) => {
        e?.preventDefault();
        setBannerIndex(isLeftBtn ? 0 : 2);
    };

    const handleTransitionedEnd = () => {
        if (bannerIndexRef.current === 0) {
            pcBannersRef.current.appendChild(pcBannersRef.current.firstElementChild);
            mobileBannersRef.current.appendChild(mobileBannersRef.current.firstElementChild);
        } else {
            pcBannersRef.current.prepend(pcBannersRef.current.lastElementChild);
            mobileBannersRef.current.prepend(mobileBannersRef.current.lastElementChild);
        }
        pcBannersRef.current.style.transition = 'none';
        pcBannersRef.current.style.transform = 'translateX(0)';
        mobileBannersRef.current.style.transition = 'none';
        mobileBannersRef.current.style.transform = 'translateX(0)';
        setTimeout(() => {
            pcBannersRef.current.style.transition = 'transform linear 0.3s';
            mobileBannersRef.current.style.transition = 'transform linear 0.3s';
            setBannerIndex(1);
        });
    };

    useEffect(() => {
        pcBannersRef.current.addEventListener('transitionend', () => handleTransitionedEnd());
        mobileBannersRef.current.addEventListener('transitionend', () => handleTransitionedEnd());

        let isDragging = false;
        let changeToLeft = false;
        let startPos;
        mobileBannersRef.current.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isDragging = true;
            startPos = e.touches[0].clientX;
        });
        mobileBannersRef.current.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const pos = e.touches[0].clientX;
            if (pos > startPos + 20) {
                mobileBannersRef.current.style.transform = `translateX(${(pos - startPos) / 10}%)`;
                changeToLeft = true;
            } else if (pos < startPos - 20) {
                mobileBannersRef.current.style.transform = `translateX(${-(startPos - pos) / 10}%)`;
                changeToLeft = false;
            }
        });
        mobileBannersRef.current.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (isDragging) {
                handleChangeBanner(null, changeToLeft);
            }
            isDragging = false;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (bannerIndex !== 1) {
            bannerIndexRef.current = bannerIndex;
            const temp = bannerIndex === 0 ? 1 : -1;
            pcBannersRef.current.style.transform = `translateX(${temp * 33.33333}%)`;
            mobileBannersRef.current.style.transform = `translateX(${temp * 33.33333}%)`;
        }

        const timeOut = setTimeout(() => {
            setBannerIndex(2);
        }, 5000);
        return () => clearTimeout(timeOut);
    }, [bannerIndex]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <div className={cx('banner-pc')} ref={pcBannersRef}>
                    <Link
                        to={localStorage.getItem('access_token') ? paths.menu : paths.login}
                        className={cx('banner-item-pc')}
                    >
                        <img src={homeImg.banner1} alt="banner" />
                    </Link>
                    <Link
                        to={localStorage.getItem('access_token') ? paths.menu : paths.login}
                        className={cx('banner-item-pc')}
                    >
                        <img src={homeImg.banner2} alt="banner" />
                    </Link>
                    <Link
                        to={localStorage.getItem('access_token') ? paths.menu : paths.login}
                        className={cx('banner-item-pc')}
                    >
                        <img src={homeImg.banner3} alt="banner" />
                    </Link>
                </div>
                <div className={cx('banner-mobile')} ref={mobileBannersRef}>
                    <Link
                        to={localStorage.getItem('access_token') ? paths.menu : paths.login}
                        className={cx('banner-item-mobile')}
                    >
                        <img src={homeImg.bannerMobile1} alt="banner" />
                    </Link>
                    <Link
                        to={localStorage.getItem('access_token') ? paths.menu : paths.login}
                        className={cx('banner-item-mobile')}
                    >
                        <img src={homeImg.bannerMobile2} alt="banner" />
                    </Link>
                    <Link
                        to={localStorage.getItem('access_token') ? paths.menu : paths.login}
                        className={cx('banner-item-mobile')}
                    >
                        <img src={homeImg.bannerMobile3} alt="banner" />
                    </Link>
                </div>
                <button className={cx('banner-left-btn')} onClick={(e) => handleChangeBanner(e, true)}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className={cx('banner-right-btn')} onClick={(e) => handleChangeBanner(e, false)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className={cx('buttons')}>
                <Link className={cx('button')} to={localStorage.getItem('access_token') ? paths.menu : paths.login}>
                    Đặt hàng ngay
                </Link>
            </div>
        </div>
    );
}

export default Home;
