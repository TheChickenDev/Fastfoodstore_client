import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import * as api from '../../services/productServices';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBlender,
    faBowlFood,
    faBowlRice,
    faBurger,
    faCake,
    faCartShopping,
    faCookieBite,
    faDrumstickBite,
    faList,
    faMagnifyingGlass,
    faMartiniGlassCitrus,
    faPizzaSlice,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Menu() {
    const [filteredProducts, setFilteredProducts] = useState();
    const [products, setProducts] = useState();
    const [input, setInput] = useState('');
    const searchInputRef = useRef(null);
    const [typeIndex, setTypeIndex] = useState(0);

    const getdata = async () => {
        const res = await api.productGetAll();
        setProducts(res);
        setFilteredProducts(res);
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        searchInputRef.current?.classList.toggle(cx('active'));
        searchInputRef.current?.focus();
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    useEffect(() => {
        getdata();
    }, []);

    useEffect(() => {
        const typeActiveTag = document.getElementsByClassName(cx('type', 'active'));
        typeActiveTag[0]?.classList.remove(cx('active'));
        const typeTags = document.getElementsByClassName(cx('type'));
        typeTags[typeIndex]?.classList.add(cx('active'));
    }, [typeIndex]);

    useEffect(() => {
        setFilteredProducts(products?.filter((product) => product.name.toLowerCase().includes(input.toLowerCase())));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    return (
        <div className={cx('wrapper')}>
            <section className={cx('types')}>
                <div className={cx('types-header')}>
                    <h4 className={cx('types-label')}>Thực đơn</h4>
                    <div className={cx('search')}>
                        <input
                            type="text"
                            className={cx('search-input')}
                            ref={searchInputRef}
                            value={input}
                            onChange={handleInputChange}
                        />
                        <button className={cx('search-btn')} onClick={handleSearchClick}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
                <hr />
                <div className={cx('types-list')}>
                    <button className={cx('type')} onClick={() => setTypeIndex(0)}>
                        <FontAwesomeIcon icon={faList} />
                        <p className={cx('type-name')}>Tất cả</p>
                    </button>
                    <button className={cx('type')} onClick={() => setTypeIndex(1)}>
                        <FontAwesomeIcon icon={faPizzaSlice} />
                        <p className={cx('type-name')}>Pizza</p>
                    </button>
                    <button className={cx('type')} onClick={() => setTypeIndex(2)}>
                        <FontAwesomeIcon icon={faBurger} />
                        <p className={cx('type-name')}>Burger</p>
                    </button>
                    <button className={cx('type')} onClick={() => setTypeIndex(3)}>
                        <FontAwesomeIcon icon={faDrumstickBite} />
                        <p className={cx('type-name')}>Gà</p>
                    </button>
                    <button className={cx('type')} onClick={() => setTypeIndex(4)}>
                        <FontAwesomeIcon icon={faBowlRice} />
                        <p className={cx('type-name')}>Cơm</p>
                    </button>
                    <button className={cx('type')} onClick={() => setTypeIndex(5)}>
                        <FontAwesomeIcon icon={faBowlFood} />
                        <p className={cx('type-name')}>Mỳ Ý</p>
                    </button>
                    <button className={cx('type')} onClick={() => setTypeIndex(6)}>
                        <FontAwesomeIcon icon={faCake} />
                        <p className={cx('type-name')}>Bánh</p>
                    </button>
                    <button className={cx('type')} onClick={() => setTypeIndex(7)}>
                        <FontAwesomeIcon icon={faCookieBite} />
                        <p className={cx('type-name')}>Món ăn kèm</p>
                    </button>
                    <button className={cx('type')} onClick={() => setTypeIndex(8)}>
                        <FontAwesomeIcon icon={faMartiniGlassCitrus} />
                        <p className={cx('type-name')}>Thức uống</p>
                    </button>
                    <button className={cx('type')} onClick={() => setTypeIndex(9)}>
                        <FontAwesomeIcon icon={faBlender} />
                        <p className={cx('type-name')}>Combo</p>
                    </button>
                </div>
            </section>
            <section className={cx('products')}>
                {filteredProducts?.map((product) => (
                    <div className={cx('product')}>
                        <img
                            src="https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/b/k/bk_cb_single_chic_n_lover_small_1.png"
                            alt="product"
                            className={cx('product-img')}
                        />
                        <p className={cx('product-name')}>{product?.name}</p>
                        <p className={cx('product-desc')}>{product?.desc}</p>
                        <p className={cx('product-price')}>{product?.price} VND</p>
                        <button className={cx('product-btn')}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Menu;
