import { CookiesWorker } from "./cookies.service";
import Endpoints from "../endpoints";


export const changeUserPassword = async (data) => {
    const requestBody = {
        user_email: CookiesWorker.get("email"),
        current_password: data.old_password,
        new_password: data.new_password
    }

    const response = await fetch(Endpoints.USER_CHANGE_PASSWORD, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    })

    return response;
}

export const updateUserData = async(body, email) => {
    const res = await fetch(`http://localhost:8003/auth/user/update/${email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    return res
}