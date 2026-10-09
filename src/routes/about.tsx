import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@/components/site/pages';
import { pageHead } from '@/lib/seo';
export const Route = createFileRoute('/about')({
 head: () => pageHead('About Keerthi — Building Trust. Creating Value.', 'Meet Keerthi Agencies, your retail, wholesale and hardware distribution partner in Athikkayam, Pathanamthitta.', '/about', [{name:'Home',path:'/'},{name:'About',path:'/about'}]),
 component: AboutPage,
});
