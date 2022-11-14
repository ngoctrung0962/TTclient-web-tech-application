import { useState } from "react";
import { useNavigate } from "react-router-dom"
import userApi from "../../../api/userApi";
import { showNotification } from "../../../utils/MyUtils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Vui lòng nhập fullname"),
  username: yup
    .string()
    .required("Vui lòng nhập username")
    .max(10, "Tối đa 10 kí tự"),
  email: yup
    .string()
    .required("hông được để trống").email("Không phải một email"),
  phoneNumber: yup
    .string()
    .required("hông được để trống")
    .min(10, "Số điện thoại gồm 10 chữ số").max(10, "Số điện thoại gồm 10 chữ số"),
  dateOfBirth: yup
    .date().required("Không được để trống"),
  address: yup
    .string(),
  password: yup
    .string()
    .required("không được để trống")
    .min(6, "Mật khẩu phải nhiều hơn 6 kí tự")

});

function SignUp() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const initValue = { name: "", username: "", email: "", phoneNumber: "", dateOfBirth: "", address: "", gender: true, password: "" }
  const [formvalues, setFormvalues] = useState(initValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  }
  const [confirmpassword, setConfirmpassword] = useState("")
  const nav = useNavigate();
  const onSubmit = async (e, data) => {
    e.preventDefault();
    console.log("hehehe")
    console.log(data ? data.name : "")
    // console.log(formvalues)
    // if (formvalues.password === confirmpassword) {
    //   const res = await userApi.register(
    //     formvalues.username,
    //     formvalues.password,
    //     formvalues
    //   );
    //   console.log(res)

    //   if (!res.status || res.status === 200) {

    //     showNotification('success', 'Sign up success !', 'Please log in again', 'OK')
    //     nav("/signin")
    //   }
    //   else {
    //     showNotification('error', 'Sign up fail !', `Error: ${res.message}`, 'OK')
    //   }
    // }
    // else {
    //   showNotification('error', 'Sign up fail !', "Error: Confirm password doesn't match", 'OK')
    // }

  };
  return (
    <div
      className="wrapper"
      style={{ backgroundImage: 'url("img/signup/bg-tech.jpg")' }}
    >
      <div className="inner">
        <div className="image-holder">
          <img src="img/signup/ip13.jpg" alt="Image Sign Up" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
          <h3>Sign Up Form</h3>
          <div className="form-wrapper">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              className="form-control"
              onChange={handleChange}
              ref={register}
            />
            {errors.name &&
              <p style={{ color: "red" }} className="error">{errors.name?.message}</p>}
          </div>
          <div className="form-wrapper">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              className="form-control"
              onChange={handleChange}
              ref={register}
            />
            {errors.username &&
              <p style={{ color: "red" }} className="error">{errors.username?.message}</p>}
            <i className="zmdi zmdi-account" />
          </div>
          <div className="form-wrapper">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              className="form-control"
              onChange={handleChange}
              ref={register}
              required
            />
            {errors.email &&
              <p style={{ color: "red" }} className="error">{errors.email?.message}</p>}
            <i className="zmdi zmdi-email" />
          </div>
          <div className="form-wrapper">
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              placeholder="date of birth"
              className="form-control"
              onChange={handleChange}
              required
            />

          </div>
          <div className="form-wrapper">
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              className="form-control"
              onChange={handleChange}
              ref={register}
            />
            {errors.phoneNumber &&
              <p style={{ color: "red" }} className="error">{errors.phoneNumber?.message}</p>}
            <i className="zmdi zmdi-phone" />
          </div>
          <div className="form-wrapper">
            <input id="address" name="address" onChange={handleChange} type="text" placeholder="Address" className="form-control" />
            <i className="zmdi zmdi-pin" />
          </div>
          <div className="form-wrapper">
            <select onChange={handleChange} name="gender" id="gender" className="form-control" >
              <option disabled>Gender</option>
              <option value={true} >Male</option>
              <option value={false}>Female</option>
            </select>
            <i className="zmdi zmdi-caret-down" style={{ fontSize: 17 }} />
          </div>
          <div className="form-wrapper">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={handleChange}
              ref={register}
              required
            />
            {errors.password &&
              <p style={{ color: "red" }} className="error">{errors.password?.message}</p>}
            <i className="zmdi zmdi-lock" />
          </div>
          <div className="form-wrapper">
            <input

              type="password"
              placeholder="Confirm Password"
              className="form-control"
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
            />
            <i className="zmdi zmdi-lock" />
          </div>
          <div className="d-flex row">
            <button onClick={() => { nav(-1) }} className="btn-back">
              <i className="zmdi zmdi-arrow-left" />
              Back
            </button>
            <button type="submit" className="btn-Register">
              SIGN UP
              <i className="zmdi zmdi-arrow-right" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
