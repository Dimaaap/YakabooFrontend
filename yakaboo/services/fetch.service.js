const getDataFromLocalStorage = (setState, localStorageName) => {
    const SIX_HOURS = 6 * 60 * 60 * 1000

    const cached = localStorage.getItem(localStorageName)
    console.log(cached)
    const cachedTime = localStorage.getItem(`${localStorageName}_time`);
    console.log(cachedTime)
    let now = Date.now();

    if(cached && cachedTime && now - parseInt(cachedTime) < SIX_HOURS){
        const parsedItem = JSON.parse(cached);
        setState(parsedItem);
        return true;
    } else {
        return false;
    }
}


const setDataIntoLocalStorage = (data, localStorageName) => {
    let now = Date.now();
    localStorage.setItem(localStorageName, JSON.stringify(data))
    localStorage.setItem(`${localStorageName}_time`, now.toString())
}


export const fetchData = async(fetchUrl, setState, localStorageName=null) => {
    try {   
        if(localStorageName){
            if(getDataFromLocalStorage(setState, localStorageName)){
                return;
            } else {
                const res = await fetch(fetchUrl);
                const data = await res.json();
                setState(data);

                if(localStorageName) {
                    setDataIntoLocalStorage(data, localStorageName)
                }
            }
        }
    } catch(error){
        console.error("Помилка", error)
    }
}
