import Image from "next/image"
import Link from "next/link"

const MobileApp = () => {
    return(
        <div className="mobile-app">
            <div className="mobile-app__row">
                <div className="mobile-app__image-container">
                    <Image src="/icons/short-logo.svg" alt="Yakaboo" width="30" height="30" />
                </div>
                <p className="mobile-app__text">
                    Читайте і слухайте книжки в мобільному застосунку
                </p>
            </div>
            <div className="mobile-app__row">
                <Link href="https://play.google.com/store/apps/details?id=ua.yakaboo&hl=uk&gl=US" className="mobile-app__link-btn">
                    <Image src="/icons/social/google-play.svg" alt="" width="80" height="40" className="mobile-app__link-img" />
                </Link>
                <Link href="https://apps.apple.com/ua/app/yakaboo-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8-%D1%87%D0%B8%D1%82%D0%B0%D1%82%D0%B8-%D1%81%D0%BB%D1%83%D1%85%D0%B0%D1%82%D0%B8/id1558352848#?platform=iphone" 
                className="mobile-app__link-btn">
                    <Image src="/icons/social/apple-store.svg" alt="" width="80" height="40" className="mobile-app__link-img" />
                </Link>
            </div>
        </div>
    )
}

export default MobileApp