import { useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRight, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { getStoredBlogPosts, blogCategories } from '@/data/blog';
import { pageHead } from '@/lib/seo';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/blog/category/$category')({
    head: ({ params }) =>
        pageHead(
            `${params.category} Articles & Guides — Keerthi Insights`,
            `Browse technical knowledge, buying guides and industry updates in ${params.category} from Keerthi Agencies.`,
            `/blog/category/${params.category}`,
            [
                { name: 'Home', path: '/' },
                { name: 'Insights', path: '/blog' },
                { name: params.category, path: `/blog/category/${params.category}` }
            ]
        ),
    component: BlogCategoryPage,
});

function BlogCategoryPage() {
    const { category } = Route.useParams();

    const posts = useMemo(() => {
        const all = getStoredBlogPosts().filter(p => p.status === 'Published');
        return all.filter(
            p =>
                p.category.toLowerCase() === category.toLowerCase() ||
                p.tags.some(t => t.toLowerCase() === category.toLowerCase())
        );
    }, [category]);

    return (
        <div className="bg-slate-50 min-h-screen py-8 border-b border-amber-500/20">
            <div className="site-width">

                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link to="/blog">Insights</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span aria-current="page" className="capitalize">
                        {category}
                    </span>
                </nav>

                {/* Category Header */}
                <div className="mb-8 pb-6 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                        Category Archive
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mt-1 capitalize">
                        {category} Articles & Guides
                    </h1>
                    <p className="text-sm text-slate-600 max-w-xl mt-2">
                        Explore curated articles, technical specifications, and buying advice focused on {category}.
                    </p>
                </div>

                {/* Category Badges Bar */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                    {blogCategories.map(cat => (
                        <Link
                            key={cat}
                            to={cat === 'All' ? '/blog' : '/blog/category/$category'}
                            params={{ category: cat }}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${cat.toLowerCase() === category.toLowerCase()
                                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400'
                                }`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                {/* Grid Posts */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <article
                                key={post.id}
                                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col group"
                            >
                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                    <img
                                        src={post.featuredImage}
                                        alt={post.imageAlt}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                    <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase bg-amber-500 text-slate-950 px-2.5 py-1 rounded shadow">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center text-[11px] text-slate-500 gap-3 mb-2">
                                            <span className="flex items-center gap-1 font-medium">
                                                <Clock className="h-3 w-3 text-amber-600" /> {post.readingTime}
                                            </span>
                                            <span>•</span>
                                            <span>{post.publishedDate}</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-900 font-display line-clamp-2 group-hover:text-amber-600 transition-colors">
                                            <Link to="/blog/$slug" params={{ slug: post.slug }}>
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 mt-5 flex items-center justify-between">
                                        <span className="text-[11px] font-semibold text-slate-600">
                                            By {post.author.name}
                                        </span>
                                        <Link
                                            to="/blog/$slug"
                                            params={{ slug: post.slug }}
                                            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                                        >
                                            Read Article <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 text-center bg-white rounded-xl border border-slate-200">
                        <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-slate-900">No articles in this category yet</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                            Check back soon as we publish new technical guides and industry updates.
                        </p>
                        <Button asChild variant="outline" className="mt-4">
                            <Link to="/blog">View All Insights</Link>
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}
