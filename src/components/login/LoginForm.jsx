import React, { useState } from 'react';
import './styles.css';
function LoginForm({ Login, error }) {
    const [detail, setDetail] = useState({ username: "", password: "" })
    const submidHandler = e => {
        e.preventDefault();
        Login(detail);
        setDetail({ username: detail.username, password: "" });
    }
    return (
        <div className='containerLogin'>
            <form onSubmit={submidHandler}>
                <div className="form-inner">
                    <h2>SIGN IN</h2>

                    <div className="form-group">
                        <label htmlFor="username" >Username</label>
                        <input type="text" name="username" id="username" onChange={e => setDetail({ ...detail, username: e.target.value })} value={detail.username} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={e => setDetail({ ...detail, password: e.target.value })} value={detail.password} />
                    </div>

                    {(error !== "") ? (<div className="error"> {error}</div>) : ""}
                    <input type="submit" value="LOGIN" />
                </div>
            </form>
        </div>

    );
}

export default LoginForm;