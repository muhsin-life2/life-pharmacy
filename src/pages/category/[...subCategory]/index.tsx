import { ProductsPage } from "@/components/products-page"
import getProductsDataByCat from "@/lib/getProductsDataByCat"

const subcategory = ({ params, categoryData }: { params: any, categoryData: any }) => {
    return <ProductsPage type={params.subCategory[params.length - 1]} categoryData={categoryData} menuData={["Category", String(params.subCategory[params.subCategory.length - 1]).replace(/-/g, ' ')]} />
}

export default subcategory

export async function getServerSideProps({ locale, params }: { locale: any, params: any }) {

    const categoryData = await getProductsDataByCat("categories", params.subCategory[params.subCategory.length - 1], 0, false, locale);

    return {
        props: {
            categoryData: categoryData.data,
            params
        },
    };
}

