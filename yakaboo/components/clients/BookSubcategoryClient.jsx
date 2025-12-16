"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchData } from "../../services";
import Endpoints from "../../endpoints";
import { Breadcrumbs, CardsContainer, Filters} from "../shared";;

export const BookSubcategoryClient = () => {
    const [category, setCategory] = useState(null);
    const [subcategory, setSubcategory] = useState(null)
    const [doubleSubcategories, setDoubleSubcategories] = useState([]);
    const [subcategoryBooks, setSubcategoryBooks] = useState([]);

    const pathname = usePathname();
    const subcategorySlug = pathname.split("/")[3];
    const categorySlug = pathname.split("/")[2];

    useEffect(() => {
        fetchData(Endpoints.CATEGORY_BY_SLUG(categorySlug), setCategory)
    }, [])

    useEffect(() => {
        fetchData(Endpoints.SUBCATEGORY_BY_SLUG(subcategorySlug), setSubcategory)
    }, [])

    useEffect(() => {
        if(subcategory){
            fetchData(Endpoints.SUBCATEGORY_BOOKS(subcategorySlug), setSubcategoryBooks)    
        } else {
            return
        }       
    }, [subcategory])

    useEffect(() => {
        if(subcategory){
            fetchData(Endpoints.DOUBLE_SUBCATEGORIES(subcategory.id), setDoubleSubcategories)
        } else {
            return 
        }
    }, [subcategory])



    const breadcrumbsLink = {
        Книжки: "/books",
    }

    if(category) {
        breadcrumbsLink[category.title] = `/book-categories/${categorySlug}`
    } else {
        return
    }

    return(
        <div className="subcategory">
            <Breadcrumbs linksList={ breadcrumbsLink } />
            { subcategory && (
                <h3 className="subcategory__header-title">
                    { subcategory.title }
                </h3>    
            ) }
            
            <div className="subcategory__container">
                { doubleSubcategories?.length > 0 ? (
                    <Filters needDifficultLevel={ false } needTheme={ false } needCategories={ false }
                    needBookCategories={ true } bookCategories={ doubleSubcategories } categorySlug={ categorySlug }  />
                ) : (
                    <Filters needDifficultLevel={ false } needTheme={ false } needCategories={ false }/>
                ) }
                
                { subcategoryBooks.length > 0 && (
                    <CardsContainer booksList={ subcategoryBooks } categoryTitle={ subcategory.title } />    
                ) }
            </div>
           
        </div>
    )
}