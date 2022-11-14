import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userApi from '../../../../../../api/userApi';
import { Logout } from '../../../../../../redux/userRedux';
import { showNotification } from '../../../../../../utils/MyUtils';
import './style.scss'

export const UpdatePassword = ({ userdetail }) => {
    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const dispatch = useDispatch()
    const [confirmpassword, setConfirmpassword] = useState("");
    const [errorconfirm, setErrorconfirm] = useState("");
    const [erroroldpass, setErroroldpass] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("oldPassword", oldpassword)
        formData.append("newPassword", newpassword)
        if (newpassword !== confirmpassword) {
            setErrorconfirm("Confirm was wrong!")
            setErroroldpass("")
        }
        else {
            try {
                const res = await userApi.changepassword(userdetail.username, formData)

                if (!res.status || res.status === 200) {
                    showNotification('success', 'Great', 'Change password success! Please login again', 'OK')
                    dispatch(Logout())
                    setErrorconfirm("")
                    setErroroldpass("")
                }
                else {
                    setErroroldpass("Wrong password!")
                    setErrorconfirm("")
                }
            } catch (error) {
                setErroroldpass("Wrong password!")
                setErrorconfirm("")
            }
        }

    }
    console.log("1", errorconfirm)
    console.log("2", erroroldpass)
    return (
        <div className='updatepassword'>
            <div className='updatepassword__container'>
                <div className='updatepassword__title'>
                    <p className='updatepassword__title--p'>THAY ĐỔI MẬT KHẨU</p>
                </div>
                <form onSubmit={handleSubmit} className='updatepassword__form'>

                    <div className='updatepassword__form--item'>
                        <div className='updatepassword__form--title'>
                            <p>Mật khẩu cũ </p>
                        </div>
                        <div className='updatepassword__form--input'>
                            <input
                                name="oldpassword"
                                type="password"
                                onChange={(e) => setOldpassword(e.target.value)}
                                required
                            ></input>
                            <p style={{ color: "red" }}>{erroroldpass}</p>
                        </div>
                    </div>
                    <div className='updatepassword__form--item'>
                        <div className='updatepassword__form--title'>
                            <p>Mật khẩu mới</p>
                        </div>
                        <div className='updatepassword__form--input'>
                            <input
                                name="newpassword"
                                type="password"
                                onChange={(e) => setNewpassword(e.target.value)}
                                required
                            ></input>
                        </div>
                    </div>
                    <div className='updatepassword__form--item'>
                        <div className='updatepassword__form--title'>
                            <p>Nhập lại mật khẩu mới</p>
                        </div>
                        <div className='updatepassword__form--input'>
                            <input
                                name="confirmpassword"
                                type="password"
                                onChange={(e) => setConfirmpassword(e.target.value)}
                                required
                            ></input>
                            <p style={{ color: "red" }}>{errorconfirm}</p>
                        </div>
                    </div>
                    <button type='submit' className='updatepassword__form--button'>
                        <span>Cập nhật</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

