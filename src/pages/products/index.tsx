
import { ProductsPage } from "@/components/products-page"
import { useRouter } from 'next/router';


const Products = ({ }) => {
    const router = useRouter()
    const { query } = router
    const category = Object.keys(router.query)[0]
const queryData = query.collections ? query.collections : query.categories ? query.categories : query.collections ? query.collections : null

    return <ProductsPage cat={category} type={router.query[`${category}`]} menuData={["Products", String(queryData).replace(/-/g, ' ')
]} />
}


// export async  function getServerSideProps(){
// const productsData = await getProductsDataByCat("", "", 0, true)
// console.log(productsData);

// }

export default Products