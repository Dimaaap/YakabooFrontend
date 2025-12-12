import Image from "next/image"

export const CommentsCount = ({ count = 0 }) => {
    return(
        <span className="comments">
            <Image src="/icons/comments.svg" alt="" width="18" height="18" />
            { count }
        </span>
    )
}