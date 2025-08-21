import { create } from "zustand"

export const useHobbyDescriptionStore = create(() => ({
    isSingle: null,
    firstParagraph: "",
    showAll: false
}))

export const setDescription = html => {
    if(!html){
        useHobbyDescriptionStore.setState({ isSingle: null, firstParagraph: "" })
        return
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html")

    const paragraphs = doc.querySelectorAll("p")
    const isSingle = paragraphs.length === 1;
    const firstP = doc.querySelector("p")
    const firstParagraph = firstP ? firstP.outerHTML : ""

    useHobbyDescriptionStore.setState({ isSingle, firstParagraph })
}

export const setShowAll = val => useHobbyDescriptionStore.setState({ showAll: val })