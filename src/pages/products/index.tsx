
import { ProductsPage } from "@/components/products-page"
import { useRouter } from 'next/router';
import getProductsDataByCat from "@/lib/getProductsDataByCat";

const Products = ({ type, productsData, cat }: { type: any, productsData: any, cat: any }) => {

    return <ProductsPage type={type} categoryData={productsData} menuData={["Products", String(cat).replace(/-/g, ' ')
    ]} />
}


// export async  function getServerSideProps(){
// const productsData = await getProductsDataByCat("", "", 0, true)
// console.log(productsData);

// }

export default Products

export async function getServerSideProps({ locale, query }: { locale: any, query: any }) {
    let type = ""
    let cat = ""
    if (query.collections) {
        type = "collections"
        cat = query.collections
    }

    const productsData = await getProductsDataByCat(type, cat, 0, false, locale);

    return {
        props: {
            productsData: productsData.data,
            type,
            cat,
        }
    }
}
