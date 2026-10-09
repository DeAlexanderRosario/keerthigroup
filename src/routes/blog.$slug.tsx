import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
    Clock,
    ChevronRight,
    ArrowLeft,
    ArrowRight,
    Share2,
    MessageCircle,
    CheckCircle2,
    HelpCircle,
    Building2,
    Tag,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBlogPostBySlug, getStoredBlogPosts } from '@/data/blog';
import { categories, business } from '@/data/site';
import { pageHead } from '@/lib/seo';
import { openQuoteModal } from '@/components/site/quote-modal';

export const Route = createFileRoute('/blog/$slug')({
    head: ({ params }) => {
        const post = getBlogPostBySlug(params.slug);
        if (!post) {
            return pageHead('Article Not Found | Keerthi Agencies', 'Article could not be found.', '/blog');
        }
        return pageHead(
            post.seo.seoTitle || post.title,
            post.seo.seoDescription || post.excerpt,
            `/blog/${post.slug}`,
            [
                { name: 'Home', path: '/' },
                { name: 'Insights', path: '/blog' },
                { name: post.title, path: `/blog/${post.slug}` }
            ],
            {
                ogImage: post.featuredImage,
                keywords: post.seo.keywords || post.tags,
                article: {
                    publishedDate: post.publishedDate,
                    updatedDate: post.updatedDate,
                    authorName: post.author.name,
                    category: post.category,
                    tags: post.tags
                },
                faqs: post.faqs
            }
        );
    },
    component: SingleBlogPage,
});

function SingleBlogPage() {
    const { slug } = Route.useParams();
    const navigate = useNavigate();

    const post = getBlogPostBySlug(slug);

    if (!post) {
        return (
            <div className="site-width py-16 text-center">
                <h1 className="text-3xl font-bold font-display text-slate-900">Article Not Found</h1>
                <p className="text-sm text-slate-600 mt-2 mb-6">
                    The requested technical article could not be located.
                </p>
                <Button asChild variant="gold">
                    <Link to="/blog">Back to All Insights</Link>
                </Button>
            </div>
        );
    }

    const allPosts = getStoredBlogPosts().filter(p => p.status === 'Published');
    const relatedPosts = allPosts.filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))).slice(0, 3);

    const relatedCategory = categories.find(c => c.slug === post.relatedProductSlug);

    function handleShare() {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Article link copied to clipboard!');
        }
    }

    return (
        <article className="bg-white min-h-screen py-8 border-b border-amber-500/20">
            <div className="site-width">

                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link to="/blog">Insights</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span aria-current="page" className="truncate max-w-[240px] sm:max-w-none">
                        {post.title}
                    </span>
                </nav>

                {/* Header Header Info */}
                <header className="max-w-4xl mx-auto mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-extrabold uppercase bg-amber-500 text-slate-950 px-3 py-1 rounded-md shadow-xs">
                            {post.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-amber-600" /> {post.readingTime}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display leading-tight mb-4">
                        {post.title}
                    </h1>

                    <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-6 border-l-4 border-amber-500 pl-4 py-1">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100 text-xs text-slate-600">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-base">
                                {post.author.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{post.author.name}</div>
                                <div className="text-[11px] text-slate-500">{post.author.role}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div>
                                <span className="text-slate-400">Published:</span> <strong className="text-slate-700">{post.publishedDate}</strong>
                            </div>
                            {post.updatedDate && (
                                <div>
                                    <span className="text-slate-400">Updated:</span> <strong className="text-slate-700">{post.updatedDate}</strong>
                                </div>
                            )}
                            <Button size="sm" variant="outline" onClick={handleShare} className="text-xs gap-1.5">
                                <Share2 className="h-3.5 w-3.5" /> Share
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="max-w-4xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                    <img
                        src={post.featuredImage}
                        alt={post.imageAlt}
                        width={1200}
                        height={675}
                        className="w-full h-[320px] sm:h-[450px] object-cover"
                    />
                    <figcaption className="p-3 text-xs text-center text-slate-500 bg-slate-50 border-t border-slate-200">
                        {post.imageAlt} — Verified sourcing by Keerthi Agencies, Pathanamthitta.
                    </figcaption>
                </div>

                {/* Main Article Body */}
                <div className="max-w-3xl mx-auto space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
                    {/* Formatted Content */}
                    <div
                        className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h2:text-slate-900 prose-h3:text-xl prose-h3:text-slate-800 prose-a:text-amber-600 prose-a:font-semibold hover:prose-a:underline prose-strong:text-slate-900 prose-li:marker:text-amber-500"
                        dangerouslySetInnerHTML={{
                            __html: post.content
                                .replace(/^## (.*$)/gim, '<h2 className="text-2xl font-bold font-display text-slate-900 mt-8 mb-4">$1</h2>')
                                .replace(/^### (.*$)/gim, '<h3 className="text-xl font-bold font-display text-slate-800 mt-6 mb-3">$1</h3>')
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\n\n/g, '<p className="mb-4 text-slate-700 leading-relaxed"></p>')
                        }}
                    />

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                <Tag className="h-3.5 w-3.5" /> Tags:
                            </span>
                            {post.tags.map(t => (
                                <span
                                    key={t}
                                    className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium border border-slate-200"
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* FAQs Section if available */}
                    {post.faqs && post.faqs.length > 0 && (
                        <div className="my-10 p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                            <div className="flex items-center gap-2 text-slate-900 font-bold font-display text-xl">
                                <HelpCircle className="h-5 w-5 text-amber-500" />
                                Frequently Asked Questions
                            </div>
                            <div className="space-y-4 pt-2">
                                {post.faqs.map((faq, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                                        <h4 className="font-bold text-sm text-slate-900 font-display mb-1">
                                            Q: {faq.question}
                                        </h4>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contextual Product Link Box */}
                    {relatedCategory && (
                        <div className="my-8 p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                                    Direct Material Sourcing
                                </span>
                                <h3 className="font-bold text-base font-display text-slate-900">
                                    Need {relatedCategory.name} for Your Construction Project?
                                </h3>
                                <p className="text-xs text-slate-600">
                                    {relatedCategory.description}
                                </p>
                            </div>
                            <Button asChild variant="gold" size="sm" className="shrink-0 font-bold">
                                <Link to="/products/$slug" params={{ slug: relatedCategory.slug }}>
                                    View Category <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                </Link>
                            </Button>
                        </div>
                    )}

                    {/* Conversion CTA Box */}
                    <div className="my-10 p-8 rounded-2xl bg-slate-900 text-white text-center space-y-4 shadow-lg border border-amber-500/30">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                            Commercial Quote & Stock Availability
                        </span>
                        <h3 className="text-2xl font-extrabold font-display text-white">
                            Planning Material Sourcing with Keerthi?
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                            Get direct manufacturer pricing, commercial terms, and scheduled site delivery across Kerala.
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                onClick={() => openQuoteModal(post.category)}
                                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5"
                            >
                                REQUEST A QUICK QUOTE <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-slate-700 text-white hover:bg-slate-800 px-5 py-2.5"
                            >
                                <a href={business.whatsapp} target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" /> WhatsApp Sourcing
                                </a>
                            </Button>
                        </div>
                    </div>

                </div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <div className="max-w-4xl mx-auto pt-12 border-t border-slate-200 mt-12">
                        <h2 className="text-2xl font-bold font-display text-slate-900 mb-6">
                            RELATED TECHNICAL GUIDES
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {relatedPosts.map(rel => (
                                <Link
                                    key={rel.id}
                                    to="/blog/$slug"
                                    params={{ slug: rel.slug }}
                                    className="rounded-lg border border-slate-200 bg-white p-4 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="text-[10px] font-extrabold text-amber-600 uppercase bg-amber-500/10 px-2 py-0.5 rounded">
                                            {rel.category}
                                        </span>
                                        <h3 className="font-bold text-sm font-display text-slate-900 group-hover:text-amber-600 transition-colors mt-2 line-clamp-2">
                                            {rel.title}
                                        </h3>
                                    </div>
                                    <div className="text-[11px] text-amber-600 font-bold flex items-center gap-1 mt-4">
                                        Read Article <ArrowRight className="h-3 w-3" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </article>
    );
}
