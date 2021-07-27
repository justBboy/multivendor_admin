import { db } from "../../Firebase"


export const fetchCategoriesApi = async () => {
    const productCategories = await db.collection("product_categories").get();
    const data = productCategories.docs.map(category => {
        if(category.exists){
           return category.data();
        }
    })
    return data;
}