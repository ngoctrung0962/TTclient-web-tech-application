import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../../../api/orderApi';
import './style.scss'

export const History = () => {
    const user = useSelector((state) => state.user.currentUser)

    const [loading, setLoading] = useState(true)
    const [orderdetail, setOrderdetail] = useState([])
    const [listorder, setListorder] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await orderApi.getallorderdetailbyusername(`${user.username}`);
                setOrderdetail(res)
                console.log(res)
                window.scrollTo(0, 0)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetchData();
    }, [user.username])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await orderApi.getallorderbyusername(`${user.username}`);
                setListorder(res)
                console.log(res)
                window.scrollTo(0, 0)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetchData();
    }, [user.username])


    const listDonHangbyusername = listorder.map((order) => {
        return (
            <div key={order.orderId} >
                <div className='history__table'>
                    <p>Đơn hàng: {order.orderId}  &emsp; &emsp; &emsp; Ngày mua: {order.purchaseDate.slice(0, 10)}  &emsp; &emsp; &emsp; Tổng tiền: {(order.totalPrices - order.discountPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                    <p>Địa chỉ: {order.address}  &emsp; &emsp; &emsp; Người nhận: {order.name} &emsp; &emsp; &emsp;  Số điện thoại: {order.phoneNumber}</p>
                    <table className='history__table--content' border="1">
                        <tbody>
                            <tr className='history__table--content-label' >
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                            {orderdetail.map((orderdetail, index) => {
                                if (order.orderId === orderdetail.id.orderId)
                                    return (

                                        <tr key={index}>
                                            <td>{orderdetail ? orderdetail.product.name : ""}</td>
                                            <td>{orderdetail ? orderdetail.product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : ""} </td>
                                            <td>{orderdetail ? orderdetail.quantity : ""}</td>
                                            <td>{orderdetail ? orderdetail.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : ""}</td>
                                        </tr>
                                    )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    })

    return (
        <div className='history'>
            <div className='history__container'>
                <div className='history__title'>
                    <p className='history__title--p'>LỊCH SỬ MUA HÀNG </p>
                </div>
                {listDonHangbyusername}
                {/* <div className='history__table'>
                    <p>Đơn hàng 1</p>
                    <table className='history__table--content' border="1">
                        <tbody>
                            <tr className='history__table--content-label' >
                                <th>STT</th>
                                <th>Tên Phim</th>
                                <th>Ghế</th>
                                <th>Rạp</th>
                                <th>Loại Vé</th>
                                <th>Thời gian đặt</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Thiên thần hộ mệnh  </td>
                                <td>D9</td>
                                <td>BHD Lê Văn Việt</td>
                                <td>Vé phim 2D</td>
                                <td>2021-05-05 19:30:30</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Lật mặt 48h</td>
                                <td>D9</td>
                                <td>CGV VinCom Thủ Đức</td>
                                <td>Vé phim 2D</td>
                                <td>2021-05-05 19:30:30</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Bố già</td>
                                <td>D9</td>
                                <td>BHD Lê Văn Việt</td>
                                <td>Vé phim 2D</td>
                                <td>2021-05-05 19:30:30</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Bố già</td>
                                <td>D9</td>
                                <td>BHD Lê Văn Việt</td>
                                <td>Vé phim 2D</td>
                                <td>2021-05-05 19:30:30</td>
                            </tr>



                        </tbody>
                    </table>
                </div> */}


            </div>
        </div>
    );
}

