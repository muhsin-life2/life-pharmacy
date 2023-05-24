import getSingleProductData from "@/lib/getSingleProductData"
import SingleProductsContent from "@/components/single-product-page"
const SingleProductPage = ({ singleProductData }: { singleProductData: any }) => {

    return (
        <SingleProductsContent pro_data={singleProductData} />
    )
}

export default SingleProductPage

export async function getServerSideProps({ locale, params }: { locale: any, params: any }) {
    const singleProductData = await getSingleProductData(locale, params.singleProduct);

    return {
        props: {
            singleProductData: singleProductData.data.product,
        },
    };
}