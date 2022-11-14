import React from 'react';
import './style.scss'

export const DetailAccount = ({ userdetail }) => {
    return (
        <div className='detailaccount'>
            <div className='detailaccount__container'>
                <div className='detailaccount__title'>
                    <p className='detailaccount__title--p'>THÔNG TIN </p>
                    <span className='detailaccount__title--span'>TÀI KHOẢN</span>
                </div>
                <div className='detailaccount__label'>
                    <p className='detailaccount__label--p'> PTNKTP CINEMA</p>
                    <span className='detailaccount__label--span'>ptnktpcinema@email.com</span>
                </div>
                <form className='detailaccount__form'>
                    <div className='detailaccount__form--item'>
                        <div className='detailaccount__form--title'>
                            <p>Họ và tên </p>
                        </div>
                        <div className='detailaccount__form--input'>
                            <input readOnly value={userdetail.name ?? ""}></input>
                        </div>
                    </div>
                    <div className='detailaccount__form--item'>
                        <div className='detailaccount__form--title'>
                            <p>Số điện thoại </p>
                        </div>
                        <div className='detailaccount__form--input'>
                            <input readOnly value={userdetail.phoneNumber ?? ""} ></input>
                        </div>
                    </div>
                    <div className='detailaccount__form--date'>
                        <div className='detailaccount__form--title'>
                            <span>Ngày tháng năm sinh:</span>
                        </div>
                        <div className='detailaccount__form--date-dropdown'>
                            <input readOnly value={userdetail.dateOfBirth ?? ""} type="date" name="namsinh" />
                        </div>
                    </div>
                    <div className='detailaccount__form--sex'>
                        <div className='detailaccount__form--title'>
                            <span>Giới tính:</span>
                        </div>
                        <div className='detailaccount__form--sex-dropdown'>
                            <select readOnly value={userdetail.gender ?? ""} id="sex" name="sex">

                                <option value={false}>Nữ</option>
                                <option value={true}>Nam</option>
                                <option value="Khac">Khác</option>
                            </select>
                        </div>
                    </div>
                    <div className='detailaccount__form--item'>
                        <div className='detailaccount__form--title'>
                            <p>Email</p>
                        </div>
                        <div className='detailaccount__form--input'>
                            <input readOnly value={userdetail.email ?? ""} ></input>
                        </div>
                    </div>
                    <div className='detailaccount__form--item'>
                        <div className='detailaccount__form--title'>
                            <p>Địa chỉ</p>
                        </div>
                        <div className='detailaccount__form--input'>
                            <input readOnly value={userdetail.address ?? ""}></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

