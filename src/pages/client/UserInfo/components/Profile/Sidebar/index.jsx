import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'


export const Sidebar = () => {
    const menu = [
        {
            title: "Thông tin tài khoản",
            href: "/account/detail"
        },
        {
            title: "Lịch sử mua hàng",
            href: "/account/history"
        },
        {
            title: "Thay đổi thông tin tài khoản",
            href: "/account/updateaccount"
        },
        {
            title: "Thay đổi mật khẩu",
            href: "/account/updatepassword"
        },
        {
            title: "Về trang chủ",
            href: "/"
        }
    ]
    return (
        <div className='sidebar'>
            <div className='sidebar__container'>
                <div className='sidebar__logo'>
                    <img
                        className='sidebar__logo'
                        src={require("../../../images/avatarTrung.jpg")}
                        alt="Logo" />
                </div>
                <div className='sidebar__tool'>
                    {
                        menu.map((item, index, menu) => {
                            return (
                                <p key={index} className='sidebar__tool--item'>
                                    <Link to={`${item.href}`}><span className='sidebar__tool--item-title'>{item.title}</span></Link>

                                </p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

