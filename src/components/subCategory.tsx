import { ProductsPage } from "./products-page"
import { useRouter } from 'next/router';

const Subcategory = ({ }) => {
    const router = useRouter()
    const { query } = router
    // console.log(router.query.subCategory[(router.query.subCategory?.length)-1]);
    let routerQueryLength = router.query.subCategory?.length
    if (routerQueryLength === undefined) {
        routerQueryLength = 0
    }
    if (router.query.subCategory === undefined) {
        router.query.subCategory = "categories"
    }
    const category = router.query.subCategory[(routerQueryLength) - 1]

    if (routerQueryLength <= 3) {

        return <ProductsPage cat={"categories"} type={category} menuData={["Category",String(query.subCategory).replace(/-/g, ' ')] } />
    }
    else {
        return <div className="text-3xl font-bold text-center py-9">404 ERROR</div>
    }
}

export default Subcategory