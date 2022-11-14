import React, { useEffect, useState } from 'react';
import userApi from '../../../../../../api/userApi';
import { useSelector } from 'react-redux';
import './style.scss'
import { Navigate } from 'react-router-dom';
import { showNotification } from '../../../../../../utils/MyUtils';


export const UpdateProfile = ({ userdetail, setUserdetail }) => {
    const [formvalues, setFormvalues] = useState({ name: "", username: "", email: "", phoneNumber: "", address: "", dateOfBirth: "", gender: "" });
    useEffect(() => {
        setFormvalues({
            name: userdetail && userdetail.name,
            username: userdetail && userdetail.username,
            email: userdetail && userdetail.email,
            phoneNumber: userdetail && userdetail.phoneNumber,
            address: userdetail && userdetail.address,
            dateOfBirth: userdetail && userdetail.dateOfBirth,
            gender: userdetail && userdetail.gender,
        })
    }, [userdetail])
    console.log("v", formvalues)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormvalues({ ...formvalues, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await userApi.update(userdetail.username, formvalues)
            console.log("e", formvalues)
            showNotification('success', 'Great', 'Update information success', 'OK')
            setUserdetail(data);
        } catch (error) {
            showNotification('error', 'Oh no', 'Update information fail', 'OK')
        }

    }

    return (
        <div className='updateprofile'>
            <div className='updateprofile__container'>
                <div className='updateprofile__title'>
                    <p className='updateprofile__title--p'>Chỉnh sửa thông tin tài khoản</p>
                </div>
                <form onSubmit={handleSubmit} className='updateprofile__form'>
                    <div className='updateprofile__form--item'>
                        <div className='updateprofile__form--title'>
                            <p>Họ và tên</p>
                        </div>
                        <div className='updateprofile__form--input'>
                            <input
                                value={formvalues.name}

                                id="name"
                                name="name"
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className='updateprofile__form--item'>
                        <div className='updateprofile__form--title'>
                            <p>Số điện thoại</p>
                        </div>
                        <div className='updateprofile__form--input'>
                            <input
                                value={formvalues.phoneNumber}
                                id="phoneNumber"
                                name="phoneNumber"
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className='updateprofile__form--date'>
                        <div className='updateprofile__form--title'>
                            <span>Ngày sinh</span>
                        </div>
                        <div className='updateprofile__form--date-dropdown'>
                            <input
                                value={formvalues.dateOfBirth}
                                id="dateOfBirth"
                                name="dateOfBirth"
                                onChange={handleChange}
                                type="date"
                            />
                        </div>
                    </div>
                    <div className='updateprofile__form--sex'>
                        <div className='updateprofile__form--title'>
                            <span>Giới tính</span>
                        </div>
                        <div className='updateprofile__form--sex-dropdown'>
                            <select value={formvalues.gender} option={formvalues.gender} onChange={handleChange} id="gender" name="gender">
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                                <option value="Khac">Khác</option>
                            </select>
                        </div>
                    </div>
                    <div className='updateprofile__form--item'>
                        <div className='updateprofile__form--title'>
                            <p>Email</p>
                        </div>
                        <div className='updateprofile__form--input'>
                            <input
                                value={formvalues.email}
                                id="email"
                                name="email"
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className='updateprofile__form--item'>
                        <div className='updateprofile__form--title'>
                            <p>Địa chỉ</p>
                        </div>
                        <div className='updateprofile__form--input'>
                            <input
                                value={formvalues.address}
                                id="address"
                                name="address"
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>
                    <button type='submit' className='updateprofile__form--button'>
                        <span>Update</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

