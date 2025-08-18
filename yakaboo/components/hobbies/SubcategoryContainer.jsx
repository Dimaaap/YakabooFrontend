import { CardsContainer, Filters } from "../shared"

export const HobbySubcategoryContainer = ({ subCategory }) => {
    return (
        <div className="hobby__main-container hobby__subcategory-container subcategory-container">
            <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false }
            needCategories={ false } needBrands={ true } needTheme={ false } needFilters={ false }
            needAuthors={ false } needPrice={ false } needDifficultLevel={ false } 
            needAge={ true }/>

            <CardsContainer booksList={ subCategory?.hobbies } isHobbies={ true } />
        </div>
    )
}