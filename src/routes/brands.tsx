import { createFileRoute } from '@tanstack/react-router';
import { BrandsPage } from '@/components/site/pages';
import { pageHead } from '@/lib/seo';
export const Route = createFileRoute('/brands')({
 head: () => pageHead('Trusted Brands & Keerthi Own Brands — Keerthi', 'Explore Tata Tiscon, Polycab, Astral, Supreme, Havells and V-Guard, and discover Keerthi’s upcoming own brands.', '/brands', [{name:'Home',path:'/'},{name:'Brands',path:'/brands'}]),
 component: BrandsPage,
});
