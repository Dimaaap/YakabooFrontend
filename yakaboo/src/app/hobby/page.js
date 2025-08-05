import { Filters, HobbyCategories } from "../../../components";

export default function HobbyPage() {
    return (
        <div className="hobby-container">
            <HobbyCategories />

            <div className="hobby-container__main-content">
                <Filters withPublishers={ false } needLanguages={ false } needBookTypes = { false } needAuthors = { false } 
                needCategories = { false } needBrands={ true } />
            </div>
        </div>
    )
}