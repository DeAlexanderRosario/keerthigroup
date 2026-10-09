import { useState, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Search, Clock, ArrowRight, BookOpen, ChevronRight, Tag, PlusCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStoredBlogPosts, blogCategories } from '@/data/blog';
import { pageHead } from '@/lib/seo';
import { openQuoteModal } from '@/components/site/quote-modal';

export const Route = createFileRoute('/blog/')({
    head: () =>
        pageHead(
            'Keerthi Insights — Building Materials, Hardware & Sourcing Guides Kerala',
            'Expert knowledge, technical buying guides, TMT steel comparisons, plumbing manuals, electrical checklists and building construction insights from Keerthi Agencies.',
            '/blog',
            [{ name: 'Home', path: '/' }, { name: 'Insights & Blog', path: '/blog' }]
        ),
    component: BlogListingPage,
});

function BlogListingPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const allPosts = useMemo(() => getStoredBlogPosts(), []);

    const publishedPosts = useMemo(() => {
        return allPosts.filter(p => p.status === 'Published');
    }, [allPosts]);

    const filteredPosts = useMemo(() => {
        return publishedPosts.filter(post => {
            const matchesCat =
                selectedCategory === 'All' ||
                post.category.toLowerCase() === selectedCategory.toLowerCase() ||
                post.tags.some(t => t.toLowerCase() === selectedCategory.toLowerCase());

            const query = searchQuery.trim().toLowerCase();
            const matchesSearch =
                !query ||
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.tags.some(t => t.toLowerCase().includes(query));

            return matchesCat && matchesSearch;
        });
    }, [publishedPosts, selectedCategory, searchQuery]);

    const featuredPost = useMemo(() => {
        return publishedPosts.find(p => p.isFeatured) || publishedPosts[0];
    }, [publishedPosts]);

    const gridPosts = useMemo(() => {
        if (selectedCategory !== 'All' || searchQuery.trim()) {
            return filteredPosts;
        }
        return filteredPosts.filter(p => p.id !== featuredPost?.id);
    }, [filteredPosts, featuredPost, selectedCategory, searchQuery]);

    return (
        <div className="bg-slate-50 min-h-screen py-8 border-b border-amber-500/20">
            <div className="site-width">

                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span aria-current="page">KEERTHI INSIGHTS</span>
                </nav>

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200 gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                            Technical & Commercial Knowledge Hub
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mt-1">
                            KEERTHI INSIGHTS & BUYING GUIDES
                        </h1>
                        <p className="text-sm text-slate-600 max-w-2xl mt-2">
                            Expert knowledge, product selection guides, structural steel specs, plumbing standards, and commercial building updates from Keerthi.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/blog/admin"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 px-3 py-2 rounded-md shadow-xs"
                        >
                            <Settings className="h-4 w-4 text-amber-600" /> CMS Admin Studio
                        </Link>
                        <Button onClick={() => openQuoteModal()} variant="gold" size="sm" className="font-bold">
                            GET A QUICK QUOTE <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>

                {/* Search & Category Filter Bar */}
                <div className="space-y-4 mb-8">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search construction guides, TMT steel, plumbing..."
                            className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 shadow-xs focus:border-amber-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-xs font-bold text-slate-500 mr-2">Categories:</span>
                        {blogCategories.map(cat => {
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${isActive
                                            ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                                            : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400'
                                        }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Article Count */}
                <div className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">
                    Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
                </div>

                {/* Featured Editorial Article (only on All filter without search) */}
                {selectedCategory === 'All' && !searchQuery.trim() && featuredPost && (
                    <div className="mb-12">
                        <div className="rounded-2xl border border-amber-500/30 bg-white overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12">
                            <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] bg-slate-100">
                                <img
                                    src={featuredPost.featuredImage}
                                    alt={featuredPost.imageAlt}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-4 left-4 text-xs font-extrabold uppercase bg-amber-500 text-slate-950 px-3 py-1 rounded-md shadow">
                                    FEATURED ARTICLE • {featuredPost.category}
                                </span>
                            </div>
                            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center text-xs text-slate-500 gap-3 mb-3">
                                        <span className="flex items-center gap-1 font-medium">
                                            <Clock className="h-3.5 w-3.5 text-amber-600" /> {featuredPost.readingTime}
                                        </span>
                                        <span>•</span>
                                        <span>{featuredPost.publishedDate}</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 leading-tight hover:text-amber-600 transition-colors">
                                        <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                                            {featuredPost.title}
                                        </Link>
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                                    <div className="text-xs font-semibold text-slate-700">
                                        By {featuredPost.author.name}
                                    </div>
                                    <Button asChild variant="gold" size="sm" className="font-bold">
                                        <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                                            Read Featured Article <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Article Cards Grid */}
                {gridPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gridPosts.map(post => (
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
                        <h3 className="text-xl font-bold text-slate-900">No articles found</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                            We couldn't find any articles matching your search query or category filter.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedCategory('All');
                                setSearchQuery('');
                            }}
                            className="mt-4"
                        >
                            Reset Search & Filters
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}
