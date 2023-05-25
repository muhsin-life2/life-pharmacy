
export default async function getProductsDataByCat(filterPath:string, noOfProducts:number, isProductsPage:boolean, lang:any) {

    const urlPath =`https://prodapp.lifepharmacy.com/api/web/products?${isProductsPage ? "" : `${filterPath}&` }order_by=popularity&type=cols&skip=${noOfProducts}&take=40&new_method=true&lang=${lang}`;
    console.log(urlPath);
    
    const res = await fetch(urlPath)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}

