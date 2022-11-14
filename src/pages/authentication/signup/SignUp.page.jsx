import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../../api/userApi";
import { showNotification } from "../../../utils/MyUtils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập fullname"),
  username: yup
    .string()
    .required("Vui lòng nhập username")
    .max(15, "Tối đa 15 kí tự"),
  email: yup
    .string()
    .required("hông được để trống")
    .email("Không phải một email"),
  phoneNumber: yup
    .string()
    .required("hông được để trống")
    .min(10, "Số điện thoại gồm 10 chữ số")
    .max(10, "Số điện thoại gồm 10 chữ số"),
  dateOfBirth: yup.date().required("Không được để trống"),
  address: yup.string(),
  password: yup
    .string()
    .required("không được để trống")
    .min(6, "Mật khẩu phải nhiều hơn 6 kí tự"),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const initValue = {
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    gender: true,
    password: "",
  };
  const [formvalues, setFormvalues] = useState(initValue);

  const [confirmpassword, setConfirmpassword] = useState("");
  const nav = useNavigate();
  console.log("re-render");
  const onSubmit = async (data) => {
    console.log(data);
    if (formvalues.password === confirmpassword) {
      const res = await userApi.register(data.username, data.password, data);
      console.log(res);

      if (!res.status || res.status === 200) {
        showNotification(
          "success",
          "Sign up success !",
          "Please log in again",
          "OK"
        );
        nav("/signin");
      } else {
        showNotification(
          "error",
          "Sign up fail !",
          `Error: ${res.message}`,
          "OK"
        );
      }
    } else {
      showNotification(
        "error",
        "Sign up fail !",
        "Error: Confirm password doesn't match",
        "OK"
      );
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign Up Form</h3>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Full Name"
              className="form-control"
              {...register("name")}
            />
            {errors.name && (
              <p style={{ color: "red" }} className="error">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              {...register("username")}
            />
            {errors.username && (
              <p style={{ color: "red" }} className="error">
                {errors.username?.message}
              </p>
            )}
            <i className="zmdi zmdi-account" />
          </div>
          <div className="form-wrapper">
            <input
              type="email"
              placeholder="Email Address"
              className="form-control"
              {...register("email")}
              required
            />
            {errors.email && (
              <p style={{ color: "red" }} className="error">
                {errors.email?.message}
              </p>
            )}
            <i className="zmdi zmdi-email" />
          </div>
          <div className="form-wrapper">
            <input
              type="date"
              placeholder="date of birth"
              className="form-control"
              required
              {...register("dateOfBirth")}
            />
          </div>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Phone Number"
              className="form-control"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p style={{ color: "red" }} className="error">
                {errors.phoneNumber?.message}
              </p>
            )}
            <i className="zmdi zmdi-phone" />
          </div>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Address"
              className="form-control"
              {...register("address")}
            />
            <i className="zmdi zmdi-pin" />
          </div>
          <div className="form-wrapper">
            <select className="form-control" {...register("gender")}>
              <option disabled>Gender</option>
              <option value={true}>Male</option>
              <option value={false}>Female</option>
            </select>
            <i className="zmdi zmdi-caret-down" style={{ fontSize: 17 }} />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              {...register("password")}
              required
            />
            {errors.password && (
              <p style={{ color: "red" }} className="error">
                {errors.password?.message}
              </p>
            )}
            <i className="zmdi zmdi-lock" />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              required
              {...register("confirmpassword")}
            />
            <i className="zmdi zmdi-lock" />
          </div>
          <div className="d-flex row">
            <button
              onClick={() => {
                nav(-1);
              }}
              className="btn-back"
            >
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
