import { createFileRoute, notFound } from '@tanstack/react-router';
import { categories } from '@/data/site';
import { CategoryPage } from '@/components/site/pages';
import { pageHead } from '@/lib/seo';
export const Route = createFileRoute('/products/$slug')({
 loader: ({params}) => {const category=categories.find(c=>c.slug===params.slug);if(!category)throw notFound();return category;},
 head: ({loaderData}) => loaderData ? pageHead(`${loaderData.name} in Pathanamthitta — Keerthi Agencies`,loaderData.description,`/products/${loaderData.slug}`,[{name:'Home',path:'/'},{name:'Products',path:'/products'},{name:loaderData.name,path:`/products/${loaderData.slug}`}]) : {meta:[{title:'Category Not Found — Keerthi'},{name:'robots',content:'noindex'}]},
 component: ProductCategory,
});
function ProductCategory(){const {slug}=Route.useParams();return <CategoryPage slug={slug}/>}
