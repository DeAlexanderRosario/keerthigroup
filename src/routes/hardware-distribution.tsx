import { createFileRoute } from '@tanstack/react-router';
import { DistributionPage } from '@/components/site/pages';
import { pageHead } from '@/lib/seo';
export const Route = createFileRoute('/hardware-distribution')({
 head: () => pageHead('Hardware Distribution in Kerala — Keerthi Agencies', 'Hardware and building material distribution for dealers, retailers, builders and contractors across Kerala.', '/hardware-distribution', [{name:'Home',path:'/'},{name:'Hardware Distribution',path:'/hardware-distribution'}]),
 component: DistributionPage,
});
