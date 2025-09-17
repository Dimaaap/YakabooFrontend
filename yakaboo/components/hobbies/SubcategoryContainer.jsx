import { Breadcrumbs, CardsContainer, Filters } from "../shared"

export const HobbySubcategoryContainer = ({ subCategory, breadcrumbsLink, subCategoryLink=null, isHobbies=false, isNotebooks=false, isGifts=false }) => {
    let extendedBreadcrumbs = {...breadcrumbsLink}
    
    if(subCategoryLink){
        extendedBreadcrumbs = {
            ...breadcrumbsLink,
            [subCategory?.title]: subCategoryLink
        }    
    }
    
    return (

        <div className="subcategory">
            <div className="subcategory__header">
                <Breadcrumbs linksList={ extendedBreadcrumbs } />
                <h3 className="subcategory__title">
                    { subCategory?.title }
                </h3>
            </div>
            <div className="hobby__main-container hobby__subcategory-container subcategory__container">
                <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false }
                needCategories={ false } needBrands={ true } needTheme={ false } needFilters={ false }
                needAuthors={ false } needPrice={ false } needDifficultLevel={ false } 
                needAge={ true }/>

                <CardsContainer booksList={ subCategory?.hobbies || subCategory?.notebooks || subCategory?.gifts } 
                isHobbies={ isHobbies } isNotebooks={ isNotebooks } isGifts={ isGifts } />
            </div>    
        </div>
        
    )
}