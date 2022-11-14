
import { Fragment } from 'react';
import React, { Component } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import Footer from "../../../components/footer/Footer.component";
import Header from "../../../components/header/Header.component";
import Instagram from "../../../components/instagram/Instagram.component";
import OffCanvasMenu from "../../../components/offCanvasMenu/OffCanvasMenu.component";
import BreadCrump from "../../../components/breadcrumb/breadcrumb.component"
import Preloder from '../../../components/proloder/Preloder.component';

import { formatVND, showNotification } from '../../../utils/MyUtils';
import { insertOrderApi } from '../../../api/ordersApi';
import { getListCartApi } from '../../../api/cartApi';
import { getListDeliveriesApi } from '../../../api/deliveryApi';

function Checkout() {

    const location = useLocation();
    let navigate = useNavigate();
    const user = useSelector(state => state.user.currentUser);

    const [listCart, setListCart] = useState([]);
    const [listDelivery, setListDelivery] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState('');
    const [delivery, setDelivery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!location.state?.listCarts) {
                navigate('/cart')
            }
            const listDeliveries = await getListDeliveriesApi();
            setListDelivery(listDeliveries);
            setDelivery(listDeliveries[0].deliveryId);
            setListCart(location.state.listCarts);
            await setCoupon(location.state.coupon);
            setIsLoading(false);
            //console.log(location.state.coupon);
            console.log(delivery)
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (user === null) {
            navigate('/signin')
        }
    }, [user])

    const caculateTotalPrice = (quantity, price) => {
        return formatVND(quantity * price);
    }

    const totalMerchandise = (listCart) => {
        let sum = 0;
        if (listCart.length > 0) {
            sum = listCart.reduce((total, cur) => total + cur.quantity * cur.product.price, 0)
        }
        return formatVND(sum);
    }

    const totalPayment = (listCart) => {
        let sum = 0;
        if (listCart.length > 0) {
            sum = listCart.reduce((total, cur) => total + cur.quantity * cur.product.price, 0)
        }

        if (coupon)
            sum -= coupon.discount;

        if (sum >= 0)
            return formatVND(sum);
        else
            return formatVND(0);
    }

    const showListCart = (listCart) => {
        let listDom = null;
        if (listCart.length > 0) {
            listDom = listCart.map((item, index) => {
                return (
                    <li key={index} >
                        {`${item.product.name} x ${item.quantity} `}
                        <span>{caculateTotalPrice(item.quantity, item.product.price)}</span>
                    </li>
                )
            })
        }
        else {
            console.log(listCart)
        }
        return listDom;
    }

    var isChecked = (item) => delivery === item.deliveryId ? "checked-item" : "not-checked-item";

    const showDeliveries = (listDelivery) => {
        let listDom = null;
        if (listDelivery.length > 0) {
            listDom = listDelivery.map((item, index) => {
                return (
                    <div key={index}>
                        <input value={item.deliveryId}
                            type="radio"
                            checked={item.deliveryId === delivery}
                            onChange={() => setDelivery(item.deliveryId)} />
                        <span className={isChecked(item.deliveryId)}>{item.name}</span>
                    </div>
                )
            })
        }
        else {
            console.log(listDelivery)
        }
        return listDom;
    }

    const addOrderHandler = async (e) => {
        e.preventDefault()
        let sum = 0;
        if (listCart.length > 0) {
            sum = listCart.reduce((total, cur) => total + cur.quantity * cur.product.price, 0)
        }

        const { firstname, lastname, country, address, town, phone, email } = e.target.elements
        const day = new Date();
        const today = day.toISOString();
        const order = {
            "user": {
                "username": user.username
            },
            "name": `${lastname.value} ${firstname.value}`,
            "address": `${address.value} ${town.value} ${country.value}`,
            "phoneNumber": phone.value,
            "purchaseDate": today,
            "totalPrices": 0,
            "delivery": {
                "deliveryId": delivery
            },
            "status": "preparing",
            "discountPrice": `${coupon ? coupon.discount : 0}`
        }

        if (coupon !== undefined || coupon !== null || coupon !== '')
            order.couponId = coupon.couponId;

        console.log(order)
        const listOrderDetails = listCart.map((item) => {
            return {
                "id": {
                    "orderId": null,
                    "productId": item.id.productId
                },
                "quantity": item.quantity,
                "price": item.product.price,
                "totalPrice": item.product.price * item.quantity
            }
        })

        const res = await insertOrderApi(order, user.username, listOrderDetails);
        console.log(res);
        if (res.status === 200) {
            showNotification('success', 'Great!!',
                'Your Orders will be delivered as soon as possible', 'Continue Shopping',
                () => navigate('/shop'))
        } else {
            showNotification('error', 'Oops!!',
                'Something went wrong', 'Please check quantity',
                () => navigate('/checkout'))
        }
    }

    return (
        <Fragment>
            <OffCanvasMenu />
            <Header />
            <BreadCrump />
            {isLoading ? <Preloder /> :
                <section className="checkout spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h6 className="coupon__link"><span className="icon_tag_alt" /> <Link to="/cart">Have a coupon?</Link> Click
                                    here to enter your code.</h6>
                            </div>
                        </div>
                        <form className="checkout__form" onSubmit={addOrderHandler}>
                            <div className="row">
                                <div className="col-lg-8">
                                    <h5>Billing detail</h5>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="checkout__form__input">
                                                <p>First Name <span>*</span></p>
                                                <input type="text" required id='firstname' />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="checkout__form__input">
                                                <p>Last Name <span>*</span></p>
                                                <input type="text" required id='lastname' />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="checkout__form__input">
                                                <p>Country <span>*</span></p>
                                                <input type="text" required id="country" />
                                            </div>
                                            <div className="checkout__form__input">
                                                <p>Address <span>*</span></p>
                                                <input type="text" placeholder="Street Address" required id='address' />
                                            </div>
                                            <div className="checkout__form__input">
                                                <p>Town/City <span>*</span></p>
                                                <input type="text" required id="town" />
                                            </div>

                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="checkout__form__input">
                                                <p>Phone <span>*</span></p>
                                                <input type="text" required id='phone' />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="checkout__form__input">
                                                <p>Email <span>*</span></p>
                                                <input type="text" required id='email' />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="checkout__order">
                                        <h5>Your order</h5>
                                        <div className="checkout__order__product">
                                            <ul>
                                                <li>
                                                    <span className="top__text">Product</span>
                                                    <span className="top__text__right">Total</span>
                                                </li>
                                                {showListCart(listCart)}
                                            </ul>
                                        </div>
                                        <div className="checkout__order__total">
                                            <ul>
                                                <li>Total Merchandise <span>{totalMerchandise(listCart)}</span></li>
                                                {
                                                    coupon ? <li>Discount <span>{`- ${formatVND(coupon.discount)}`}</span></li> : ''
                                                }
                                                <li>Total payment <span>{totalPayment(listCart)}</span></li>
                                            </ul>
                                        </div>
                                        {/* <div className="checkout__order__widget">
                                        </div> */}
                                        {showDeliveries(listDelivery)}
                                        <button type="submit" className="site-btn">Place oder</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>}
            <Instagram />
            <Footer />
        </Fragment>
    )
}

export default Checkout;