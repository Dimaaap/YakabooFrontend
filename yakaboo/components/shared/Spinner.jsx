import Image from "next/image"

export const Spinner = () => {
  return (
    <div className="spinner">
        <Image src="/icons/spinner.svg" alt="" width="20" height="20" />
    </div>
  )
}
