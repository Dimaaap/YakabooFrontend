import { CardsContainer, Filters } from "../shared"

export const HobbyCategoryContainer = ({ categories }) => {
    return (
        <div className="hobby__main-container hobby-category__container">
            { console.log(categories) }
            <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false }
            needCategories={ false } needBrands={ true } needTheme={ true } needFilters={ false } 
            needAuthors={ false } needPrice={ false } needDifficultLevel={ true } />
            { categories && (
                <CardsContainer booksList={ categories } isHobbies={ true } />    
            ) }
        </div>
    )
}