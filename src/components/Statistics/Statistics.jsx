import { Fragment, useEffect, useState } from 'react';
import styles from './Statistics.module.scss';
import classNames from 'classnames/bind';
import * as api from '../../services/orderServices';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function Statistics({ isShow }) {
    const [list, setList] = useState();
    const [renderList, setRenderList] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [filterYearList, setFilterYearList] = useState();

    const [filterYear, setFilterYear] = useState();
    const [filterMonth, setFilterMonth] = useState();
    const [totalAmount, setTotalAmount] = useState(0);

    const getOrders = async () => {
        const res = await api.orderGetAll();
        if (res) {
            setRenderList(res);
            setList(res);
        }
    };

    const handleConfirmClick = async (orderId) => {
        setIsLoading(true);
        await api
            .orderConfirm(orderId)
            .then((res) => {
                alert(res.message);
                setIsLoading(false);
            })
            .catch((error) => {
                alert(error.message);
                setIsLoading(false);
            });
        getOrders();
    };

    const handleChangeYear = () => {
        setFilterYear(document.getElementsByName('year')[0].value);
    };

    const handleChangeMonth = () => {
        setFilterMonth(document.getElementsByName('month')[0].value);
    };

    const convertDate = (date) => {
        const dateObj = new Date(date.toString());
        const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
        const formattedTime = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
        return `${formattedDate} ${formattedTime}`;
    };

    useEffect(() => {
        if (isShow) document.getElementsByClassName(cx('wrapper'))[0].classList.add(cx('active'));
        else document.getElementsByClassName(cx('wrapper'))[0].classList.remove(cx('active'));
    }, [isShow]);

    useEffect(() => {
        let temp = [];
        if (filterYear !== 'all') {
            temp = list?.filter((order) => {
                const dateObj = new Date(order.date.toString());
                const year = dateObj.getFullYear();
                return year.toString() === filterYear;
            });
        } else {
            temp = list;
        }
        if (filterMonth !== 'all') {
            temp = temp?.filter((order) => {
                const dateObj = new Date(order.date.toString());
                const month = dateObj.getMonth() + 1;
                return month.toString() === filterMonth;
            });
        }
        setTotalAmount(
            temp?.reduce((prev, curr) => {
                if (curr.isCompleted) return prev + curr.totalAmount;
                return prev;
            }, 0),
        );
        setRenderList(temp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterMonth, filterYear]);

    useEffect(() => {
        getOrders();
        const currentYear = new Date().getFullYear();
        let temp = [];
        for (let i = 0; i <= 10; i++) temp.push(currentYear - i);
        setFilterYearList(temp);
        setFilterYear('all');
        setFilterMonth('all');
    }, []);

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('statistics')}>
                    <label for="year">Năm: </label>
                    <select id="year" name="year" onChange={handleChangeYear}>
                        <option value="all">All</option>
                        {filterYearList?.map((year) => (
                            <option value={year}>{year}</option>
                        ))}
                    </select>
                    &nbsp;&nbsp;&nbsp;
                    <label for="month">Tháng: </label>
                    <select id="month" name="month" onChange={handleChangeMonth}>
                        <option value="all">All</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                            <option value={month}>{month}</option>
                        ))}
                    </select>
                    &nbsp;&nbsp;&nbsp;
                    <p>Tổng doanh số: {totalAmount?.toLocaleString()} VND</p>
                </div>
                <div className={cx('table-container')}>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>Mã khách hàng</th>
                                <th>Thời gian</th>
                                <th>Món ăn đã đặt</th>
                                <th>Tổng thanh toán</th>
                                <th>Phương thức thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderList &&
                                renderList.map(
                                    (order, index) =>
                                        !order.isAdmin && (
                                            <tr key={index}>
                                                <td>{order.customerId}</td>
                                                <td>{convertDate(order.date)}</td>
                                                <td>
                                                    {order.products.reduce(
                                                        (prev, curr) => prev + curr.name + ' x ' + curr.quantity + ', ',
                                                        '',
                                                    )}
                                                </td>
                                                <td>{order.totalAmount.toLocaleString()} VND</td>
                                                <td>{order.paymentMethod}</td>
                                                <td>{order.isCompleted ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                                                <td className={cx('method')}>
                                                    <button
                                                        className={
                                                            !order.isCompleted
                                                                ? cx('method-btn', 'active')
                                                                : cx('method-btn')
                                                        }
                                                        onClick={() => handleConfirmClick(order._id)}
                                                        disabled={order.isCompleted ? true : false}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                </td>
                                            </tr>
                                        ),
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Loading isLoading={isLoading} />
        </Fragment>
    );
}

export default Statistics;
