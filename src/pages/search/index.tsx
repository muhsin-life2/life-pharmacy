
import { ProductsPage } from "@/components/products-page"
import { useRouter } from 'next/router';
import getProductsDataByCat from "@/lib/getProductsDataByCat";
import getProductsSearchData from "@/lib/getProductsSearchData";

const SearchProducts = ({ type, productsData }: { type: any, productsData: any}) => {

    return <ProductsPage type={type} categoryData={productsData} menuData={["Products", " "
    ]} />
}


// export async  function getServerSideProps(){
// const productsData = await getProductsDataByCat("", "", 0, true)
// console.log(productsData);

// }

export default SearchProducts

export async function getServerSideProps({ locale, query }: { locale: any, query: any }) {

    let term = ""
    let type = "search"


    const productsData = await getProductsSearchData(query.term, 0);

    return {
        props: {
            productsData: productsData.data,
            type
        }
    }
}
