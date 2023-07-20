import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Email Validation
export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData, { withCredentials: true });
        if (response.statusText === "OK") {
            toast.success("User registered successfully");
        }
        return response.data;
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message)
            || err.message || err.toString();
        toast.error(message);
    }
};

// Login User
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);
        if (response.statusText === "OK") {
            toast.success("Login Successful...");
        }
        return response.data;
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message)
            || err.message || err.toString();
        toast.error(message);
    }
};

// Logout User
export const logoutUser = async () => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message)
            || err.message || err.toString();
        toast.error(message);
    }
};

// Forgot Password
export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, userData);
        toast.success(response.data.message);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message)
            || err.message || err.toString();
        toast.error(message);
    }
};

// Reset Password
export const resetPassword = async (userData, resetToken) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData);
        return response.data;
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message)
            || err.message || err.toString();
        toast.error(message);
    }
};

// Get Login Status
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
        console.log(response);
        return response.data;
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message)
            || err.message || err.toString();
        toast.error(message);
    }
};