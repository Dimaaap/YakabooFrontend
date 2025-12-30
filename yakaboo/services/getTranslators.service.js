import Endpoints from "../endpoints"

export const getTranslators = async (searchValue) => {
    const url = searchValue?.trim()
        ? Endpoints.SEARCH_TRANSLATOR(searchValue)
        : Endpoints.ALL_TRANSLATORS

    const res = await fetch(url)
    if (!res.ok) {
        throw new Error("Failed to fetch translators")
    }
    return res.json()
}
