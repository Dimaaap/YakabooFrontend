const getDataFromLocalStorage = (setState, localStorageName) => {
    const SIX_HOURS = 6 * 60 * 60 * 1000

    const cached = localStorage.getItem(localStorageName)
    const cachedTime = localStorage.getItem(`${localStorageName}_time`);
    let now = Date.now();

    if(cached && cachedTime && now - parseInt(cachedTime) < SIX_HOURS){
        const parsedItem = JSON.parse(cached);
        setState(parsedItem);
        return;
    }
}


const setDataIntoLocalStorate = (data, localStorageName) => {
    let now = Date.now();
    localStorage.setItem(localStorageName, JSON.stringify(data))
    localStorage.setItem(`${localStorageName}_time`, now.toString())
}


export const fetchData = async(fetchUrl, setState, localStorageName=null) => {
    try {   
        if(localStorageName){
            getDataFromLocalStorage(setState, localStorageName);
            return;
        }

        const res = await fetch(fetchUrl);
        const data = await res.json();
        setState(data);

        if(localStorageName) {
            setDataIntoLocalStorate(data, localStorageName)
        }

    } catch(error){
        console.error("Помилка", error)
    }
}
