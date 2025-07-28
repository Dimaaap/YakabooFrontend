import Endpoints from '../endpoints';

const getDataFromLocalStorage = (setState, localStorageName) => {
  if (typeof window === 'undefined') return false;

  const SIX_HOURS = 6 * 60 * 60 * 1000;

  const cached = localStorage.getItem(localStorageName);
  const cachedTime = localStorage.getItem(`${localStorageName}_time`);
  let now = Date.now();

  if (cached && cachedTime && now - parseInt(cachedTime) < SIX_HOURS) {
    const parsedItem = JSON.parse(cached);
    setState(parsedItem);
    return true;
  } else {
    return false;
  }
};

const setDataIntoLocalStorage = (data, localStorageName) => {
  let now = Date.now();
  localStorage.setItem(localStorageName, JSON.stringify(data));
  localStorage.setItem(`${localStorageName}_time`, now.toString());
};

export const fetchData = async (
  fetchUrl,
  setState,
  localStorageName = null
) => {
  try {
    if (localStorageName) {
      if (getDataFromLocalStorage(setState, localStorageName)) {
        return;
      } else {
        const res = await fetch(fetchUrl);
        const data = await res.json();
        setState(data);

        if (localStorageName) {
          setDataIntoLocalStorage(data, localStorageName);
        }
      }
    } else {
      const res = await fetch(fetchUrl);
      const data = await res.json();
      setState(data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchSearchResults = async (
  query,
  setResults,
  authors = false,
  literaturePeriods = false
) => {
  console.log(query)
  try {
    let res = null;
    if (literaturePeriods) {
       res = await fetch(
        `http://127.0.0.1:8006/literature_period/search/?query=${query}`
      )
      console.log("Res", res)
    } else if(authors){
      res = await fetch(
        `http://127.0.0.1:8006/authors/search/?query=${query}`
      );
    } else {
      res = await fetch(
        `http://127.0.0.1:8006/publishing/search/?query=${query}`
      );
    }

    const data = await res.json();
    setResults(data);
  } catch (err) {
    console.error(err);
  }
};
