import Endpoints from "../endpoints"

export const getSeries = async (searchValue) => {
    const url = searchValue?.trim()
        ? Endpoints.SEARCH_SERIA(searchValue)
        : Endpoints.ALL_SERIES

    const res = await fetch(url)
    if (!res.ok) {
        throw new Error("Failed to fetch series")
    }
    return res.json()
}
