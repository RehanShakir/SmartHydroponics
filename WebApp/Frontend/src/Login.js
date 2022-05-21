import { Button, Form, Input } from "antd";
// import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Globle.css";
import { loginAction } from "./redux/actions/auth.actions";
import { Link } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        window.location.pathname = "/dashboard";
      }
    }
  }, [loading, isAuthenticated]);

  return (
    <>
      <div
        style={{ display: `${loading ? "none" : "flex"}` }}
        className='login_page'>
        <div className='flex1'>
          {/* <img className='login_img1' src='/images/logopen.svg' alt=''></img>
          <p style={{ marginBottom: "" }} className='login_text'>
            Welcome! Let’s get started where you left.
          </p> */}

          <img src='/images/logo.jpeg' alt=''></img>
        </div>
        <div className='flex2'>
          <img className='phone_sec' src='/images/logo.jpeg' alt=''></img>
          <p className='login_title'>Smart Hydroponics</p>

          <Form
            style={{ width: "100%", marginLeft: "100px" }}
            autoComplete='off'
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            onFinish={(values) => {
              dispatch(loginAction(values));
            }}
            onFinishFailed={(error) => {}}>
            <div className='inputs_login'>
              <div className='input_lable'>Email</div>
              <Form.Item
                className='email_input'
                name='email'
                // label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                  { type: "email", message: "Please enter a valid email" },
                ]}
                hasFeedback>
                <Input placeholder='Enter Email' />
              </Form.Item>
            </div>
            <div className='inputs_login'>
              <div className='input_lable'>Password</div>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                  },
                  { min: 8 },
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(""),
                  },
                ]}
                hasFeedback>
                <Input.Password placeholder='Enter Password' />
              </Form.Item>
            </div>

            <Form.Item style={{ marginTop: -100, marginLeft: "100px" }}>
              <div style={{ textAlign: "center" }}>
                <Button
                  loading={loading}
                  className='login_btn'
                  htmlType='submit'>
                  Login
                </Button>
                <p>
                  Don't Have an account?{" "}
                  <Link
                    to='/signup'
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      fontWeight: "bold",
                    }}>
                    SignUp
                  </Link>
                </p>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
