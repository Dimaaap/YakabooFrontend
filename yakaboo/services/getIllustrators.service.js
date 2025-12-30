import Endpoints from "../endpoints"

export const getIllustrators = async (searchValue) => {
    const url = searchValue?.trim()
        ? Endpoints.SEARCH_ILLUSTRATOR(searchValue)
        : Endpoints.ALL_ILLUSTRATORS

    const res = await fetch(url)
    if (!res.ok) {
        throw new Error("Failed to fetch illustrators")
    }
    return res.json()
}
