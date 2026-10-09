import { createFileRoute } from '@tanstack/react-router';
import { ServicesPage } from '@/components/site/pages';
import { pageHead } from '@/lib/seo';
export const Route = createFileRoute('/services')({
 head: () => pageHead('Retail, Wholesale & Supply Services — Keerthi Agencies', 'Dealer supply, bulk orders, contractor supply and retail support from Keerthi Agencies in Pathanamthitta.', '/services', [{name:'Home',path:'/'},{name:'Services',path:'/services'}]),
 component: ServicesPage,
});
