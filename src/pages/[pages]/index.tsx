import { GetStaticPaths, GetStaticProps } from "next"
import getHomePageData from "@/lib/getHomePageData"
import getSinglePageData from "@/lib/getSinglePageData"
import PageStructure from "@/components/page-structure"
import Products from "@/components/products"
const PageData = ({ pageData }: { pageData: any }) => {
    return (
        <div className="max-w-[1450px] px-[10px] mx-auto">
            
            {pageData.map((data: any, ind: number) => (
                <PageStructure data={data} lang={"ae-en"} setLoading={ind === 0 ? true : false}>
                    <Products lang={"ae-en"} slug={data.section_data_object?.slug} type_key={data.section_data_object?.type_key} />
                </PageStructure >
            ))}
        </div>
    )
}

export default PageData



export async function getServerSideProps(context:any) {
    // Fetch data from external API
    const pagesParams = context.params?.pages;
    const pageData = await getSinglePageData(pagesParams)
   
    // Pass data to the page via props
    return {    
        props: {
        pageData: pageData.data.content
    }, };
  }