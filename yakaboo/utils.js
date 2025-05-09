export const fetchData = async(fetchUrl, setState, localStorageName=null) => {
    try {   
        if(localStorageName){
            const cached = localStorage.getItem(localStorageName);
            const cachedTime = localStorage.getItem(`${localStorageName}_time`);
            var now = Date.now()
            const SIX_HOURS = 6 * 60 * 60 * 1000

            if(cached && cachedTime && now - parseInt(cachedTime) < SIX_HOURS){
                const parsedItem = JSON.parse(cached);
                setState(parsedItem);
                return;
            }
        }

        const res = await fetch(fetchUrl);
        const data = await res.json();
        setState(data);

        if(localStorageName) {
            localStorage.setItem(localStorageName, JSON.stringify(data))
            localStorage.setItem(`${localStorageName}_time`, now.toString())
        }

    } catch(error){
        console.error("Помилка", error)
    }
}


export const getTimeLeft = endDate => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if(!endDate) return;

    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return `${days} днів, ${hours} годин, ${minutes} хвилин`
}


export const setCookies = (name, value) => {
    document.cookie = `${name}=${value || ""}; path=/`;
}

export const setCookiesWithTimer = (name, value, minutes) => {
    let expires = ""

    if(minutes) {
        const date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000))
        expires = "; expires=" + date.toUTCString()
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const getCookie = name => {
    const match = document.cookie.match(new RegExp('(^| )' + name + "=([^;]+)"));

    if(match) {
        return match[2]
    }

    return null;
}

export const getUserFullName = () => {
    const firstName = getCookie("first_name")
    const lastName = getCookie("last_name")

    return `${ firstName } ${ lastName }`
}
