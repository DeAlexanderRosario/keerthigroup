import { createFileRoute } from '@tanstack/react-router';
import { ProductsPage } from '@/components/site/pages';
import { pageHead } from '@/lib/seo';
export const Route = createFileRoute('/products/')({
 head: () => pageHead('Our Products — Keerthi Agencies', 'Explore hardware, building materials, plumbing, electrical and home solutions at Keerthi Agencies in Pathanamthitta.', '/products', [{name:'Home',path:'/'},{name:'Products',path:'/products'}]),
 component: ProductsPage,
});
