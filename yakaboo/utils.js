import { CookiesWorker } from "./services"


export const getUserFullName = () => {
    const firstName = CookiesWorker.get("first_name")
    const lastName = CookiesWorker.get("last_name")

    return `${ firstName } ${ lastName }`
}


export const getUniqueErrorField = errorStr => {
    const errorField = errorStr.msg?.split(":")[1]
    return errorField?.trim();
}
