import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { login } from '../../../redux/apiCalls';
import { showNotification } from '../../../utils/MyUtils';
import userApi from '../../../api/userApi';
function Reset() {
    const location = useLocation();
    const nav = useNavigate();
    const [accountName, setAccountName] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmpass, setConfirmPass] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        setToken(token);
        console.log(token);

    }, [])

    const handleClick = async (e) => {
        e.preventDefault();
        if (newPass !== confirmpass) {
            showNotification('error', 'WARNING', "Confirm password doesn't match!", 'OK');
        }
        else
            if (newPass) {
                const res = await userApi.resetPass(newPass, token);
                if (!res.status || res.status === 200) {
                    showNotification('success', 'Great', 'New pass has been applied', 'Signin', () => nav('/signin'))
                }
                else {
                    showNotification('error', 'Thay đổi password thất bại !', `Lỗi: ${res.message}`, 'OK')
                }
            }
            else {
                showNotification('error', 'WARNING', 'Please type a new password', 'OK');
            }
    };

    return (
        <div
            className="wrapper"
            style={{ backgroundImage: 'url("img/signup/bg-tech.jpg")' }}
        >
            <div className="inner">
                <div className="image-holder">
                    <img src="img/signup/ip13.jpg" />
                </div>
                <form onSubmit={handleClick} >
                    <h3>RESET PASSWORD</h3>

                    <div className="form-wrapper">
                        <input
                            type="password"
                            placeholder="New password"
                            className="form-control"
                            required
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                        <i className="zmdi zmdi-account" />
                    </div>
                    <div className="form-wrapper">

                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="form-control"
                            required
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        <i className="zmdi zmdi-account" />

                    </div>
                    {/* {error ? <h5 style={{ color: "red" }}>Username or password do not match</h5> : ""} */}
                    <div className="d-flex row">
                        {/* <button onClick={(e) => requestOtp(e)} className="btn-back">
                            <i className="zmdi zmdi" />
                            GET OTP
                        </button> */}
                        <button type='submit' className="btn-Register" >
                            RESET
                            <i className="zmdi zmdi" />
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Reset;