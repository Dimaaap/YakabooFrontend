"use client";

import { usePathname } from "next/navigation";
import { CardsContainer, Filters } from "../shared"


export const HobbyCategoryContainer = ({ categories, notebooks=false, isNotebooks=false }) => {

    const pathname = usePathname();
    const categoryTitle = pathname.split("/")[3];
    console.log(categoryTitle)

    return (
        <div className="hobby__main-container hobby-category__container">
            { !notebooks ? (
                categoryTitle !== "aktyvnyi-vidpochynok" ? (
                    <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false }
                    needCategories={ false } needBrands={ true } needTheme={ true } needFilters={ false } 
                    needAuthors={ false } needPrice={ false } needDifficultLevel={ true } />    
                    ): (
                    <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false }
                    needCategories={ false } needBrands={ true } needTheme={ false } needFilters={ false }
                    needAuthors={ false } needPrice={ false } needDifficultLevel={ false } needAge={ true } />
                    )  
                    ) : (
                <Filters needPublishers={ true } needLanguages={ false } needBookTypes={ false }
                    needCategories={ false } needBrands={ false } needFilters={ true } needAuthors={ false } needPrice={ false }
                    needDifficultLevel={ false } needAge={ false } />
                )    
            }
            
            
            
            { categories && (
                <CardsContainer booksList={ categories } isHobbies={ !isNotebooks } isNotebooks={ isNotebooks } />    
            ) }
        </div>
    )
}