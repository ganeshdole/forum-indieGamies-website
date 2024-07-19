import axios from "axios";
import { createError, createUrl } from "./utils";

export const requestOtp = async (email) => {
    try {
        const body = {
            email
        }
        const result = await axios.post(createUrl("forgot-password/request-otp"), body);
        return result.data;
    }catch(error){
        return createError(error);
    }
}

export const verifyOtp = async (email, otp) =>{
    try {
        const body = {
            email,
            otp
        }
        const result = await axios.post(createUrl("forgot-password/verify-otp"), body);
        console.log(result.data)
        return result.data;
    }catch(error){
        console.log(error);
        return createError(error);
    }
}

