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