const pick = (arr=[], key) => arr.map(item => item[key])


export const getFilterData = (queries) => {
    const [
        categoriesQuery, brandsQuery, 
        hobbyThemesQuery, authorsQuery, 
        publishingsQuery, agesQuery, 
        accessoriesBrandsQuery, bookSeriesQuery
    ] = queries

    const categories = categoriesQuery?.data ?? [];
    const brands = brandsQuery?.data ?? [];
    const authors = authorsQuery?.data ?? [];
    const publishings = publishingsQuery?.data ?? [];
    const ages = agesQuery?.data ?? [];
    const accessoriesBrands = accessoriesBrandsQuery?.data ?? [];
    const hobbyThemes = hobbyThemesQuery?.data ?? [];
    const bookSeries = bookSeriesQuery?.data ?? [];
    

    return {
        categoriesTitle: pick(categories, "title"),
        brandsTitle: pick(brands, "title"),
        themesTitle: pick(hobbyThemes, "value"),
        authorsName: authors.map(a => `${a.first_name} ${a.last_name}`),
        publishingTitles: pick(publishings, "title"),
        gameAgesTitle: pick(ages, "age"),
        accessoriesBrandsTitle: pick(accessoriesBrands, "title"),
        bookSeriesTitle: pick(bookSeries, "title")
    }
}