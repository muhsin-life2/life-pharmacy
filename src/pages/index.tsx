import getHomePageData from '@/lib/getHomePageData'
import Image from 'next/image'
import PageStructure from '@/components/page-structure';
import Products from '@/components/products';
import { useLanguage } from '@/hooks/useLanguage';
export default function Home({ homePageData, locale }: { homePageData: any, locale:any }) {
  return (
    <div className='max-w-[1450px] px-[10px] mx-auto'>
      {
        homePageData.data.content.map((data: any, ind: number) => (
          <PageStructure data={data} lang={locale} setLoading={ind === 0 ? true : false}>
            <Products lang={locale} slug={data.section_data_object?.slug} type_key={data.section_data_object?.type_key} />
          </PageStructure>))
      }
    </div>
  )
}

export async function getServerSideProps({ locale }: { locale: any }) {

  const homePageData = await getHomePageData(locale);

  return {
    props: {
      homePageData,
      locale
    }
  }

}
