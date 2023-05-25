import { ProductsPage } from "@/components/products-page"
import getProductsDataByCat from "@/lib/getProductsDataByCat"

const subcategory = ({ params, categoryData, filterPath, selectedBrands }: { params: any, categoryData: any, filterPath:any, selectedBrands:string }) => {
    return <ProductsPage filterPath={filterPath} isSearchPage={false}  categoryData={categoryData} menuData={["Category", String(params.subCategory[params.subCategory.length - 1]).replace(/-/g, ' ')]} selectedBrands = { selectedBrands } />
}

export default subcategory

export async function getServerSideProps({ locale, params, query }: { locale: any, params: any, query: any }) {
    let filterPath = `categories`
    const subCategory = params.subCategory[params.subCategory.length - 1]
    if (subCategory) {
        filterPath += `=${subCategory}`
    }
    if (query.brands) {
        if (filterPath != "categories") {
            filterPath += `&brands=${query.brands}`
        }
    }

    const categoryData = await getProductsDataByCat(filterPath, 0, false, locale);

    return {
        props: {
            categoryData: categoryData.data,
            filterPath,
            params
        },
    };
}

