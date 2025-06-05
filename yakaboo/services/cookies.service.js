export class CookiesWorker {

    static set(name, value){
        document.cookie = `${name}=${value || ""}; path=/`;
    }

    static delete(name){
        if(CookiesWorker.get(name)){
            document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        }
    }

    static setWithTimer(name, value, minutes){
        let expires = "";

        if(minutes){
            const date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            expires = "; expires=" + date.toUTCString()
        }

        document.cookie = `${name}=${value || ""}${expires}; path=/`;
    }

    static get(name){
       const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
       return match ? match[2] : null;
    }

    static saveCookies(data){
        let THREE_DAYS = 60 * 24 * 3;
        Object.entries(data).forEach(([key, value]) => {
            if(value){
                CookiesWorker.setWithTimer(key, value, THREE_DAYS)
            }
        })
    }
}