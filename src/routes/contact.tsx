import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/site/pages';
import { pageHead } from '@/lib/seo';
export const Route = createFileRoute('/contact')({
 head: () => pageHead('Contact Keerthi Agencies — Athikkayam, Pathanamthitta', 'Contact Keerthi Agencies for hardware and building material enquiries. Call +91 7907524465 or visit us in Athikkayam, Kerala.', '/contact', [{name:'Home',path:'/'},{name:'Contact',path:'/contact'}]),
 component: ContactPage,
});
