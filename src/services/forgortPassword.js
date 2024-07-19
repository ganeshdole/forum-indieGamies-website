import axios from "axios";
import { createError, createUrl } from "./utils";

const requestOtp = async (email) => {
    try {
        const body = {
            email
        }
        const result = await axios.post(createUrl("forgot-password/send-otp"), body);
        return result.data;
    }catch(error){
        return createError(error);
    }
}