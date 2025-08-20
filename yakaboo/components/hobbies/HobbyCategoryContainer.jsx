"use client";

import { usePathname } from "next/navigation";
import { CardsContainer, Filters } from "../shared"


export const HobbyCategoryContainer = ({ categories }) => {

    const pathname = usePathname();
    const categoryTitle = pathname.split("/")[3];
    console.log(categoryTitle)

    return (
        <div className="hobby__main-container hobby-category__container">
            { categoryTitle !== "aktyvnyi-vidpochynok" ? (
                <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false }
                needCategories={ false } needBrands={ true } needTheme={ true } needFilters={ false } 
                needAuthors={ false } needPrice={ false } needDifficultLevel={ true } />    
            ): (
                <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false }
                needCategories={ false } needBrands={ true } needTheme={ false } needFilters={ false }
                needAuthors={ false } needPrice={ false } needDifficultLevel={ false } needAge={ true } />
            ) }
            
            { categories && (
                <CardsContainer booksList={ categories } isHobbies={ true } />    
            ) }
        </div>
    )
}