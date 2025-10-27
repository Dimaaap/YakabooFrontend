export const firstParagraph = (description) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(description, "text/html");
    const firstP = doc.querySelector("p")?.outerHTML;

    return firstP || null
}