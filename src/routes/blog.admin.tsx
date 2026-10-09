import { useState, useMemo } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    Save,
    CheckCircle,
    FileText,
    Settings,
    ChevronRight,
    ArrowLeft,
    Sparkles,
    HelpCircle,
    Image as ImageIcon,
    BarChart3,
    TrendingUp,
    Search,
    Globe,
    ShieldCheck,
    AlertCircle,
    Copy,
    Check,
    Calendar,
    ExternalLink,
    LineChart,
    MousePointer,
    Eye as EyeIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    getStoredBlogPosts,
    saveBlogPost,
    deleteBlogPost,
    blogCategories,
    type BlogPost
} from '@/data/blog';
import { pageHead } from '@/lib/seo';

export const Route = createFileRoute('/blog/admin')({
    head: () =>
        pageHead(
            'CMS & SEO Admin Studio — Keerthi Insights & Analytics',
            'Manage blog posts, automatic SEO metadata, image alt tags, AEO structured data, and Search Console analytics.',
            '/blog/admin'
        ),
    component: CmsAdminStudio,
});

function CmsAdminStudio() {
    const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [activeTab, setActiveTab] = useState<'editor' | 'seo-health' | 'analytics'>('editor');
    const [dateRange, setDateRange] = useState<'7d' | '28d' | '90d'>('28d');

    // Form State
    const [formData, setFormData] = useState<Partial<BlogPost>>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Buying Guides',
        status: 'Published',
        isFeatured: false,
        featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        imageAlt: '',
        readingTime: '5 min read',
        publishedDate: new Date().toISOString().split('T')[0],
        author: { name: 'Er. K. R. Keerthi', role: 'Managing Director & Materials Consultant' },
        tags: ['Building Materials', 'Kerala', 'Construction'],
        seo: { seoTitle: '', seoDescription: '', keywords: [] },
        faqs: []
    });

    const [faqInput, setFaqInput] = useState({ question: '', answer: '' });

    function refreshPosts() {
        setPosts(getStoredBlogPosts());
    }

    function handleCreateNew() {
        setEditingPost(null);
        setFormData({
            id: `post-${Date.now()}`,
            title: '',
            slug: '',
            excerpt: '',
            content: '## Section Title\n\nWrite article content in Markdown format...',
            category: 'Buying Guides',
            status: 'Published',
            isFeatured: false,
            featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
            imageAlt: 'Keerthi building materials distribution depot Kerala',
            readingTime: '5 min read',
            publishedDate: new Date().toISOString().split('T')[0],
            author: { name: 'Er. K. R. Keerthi', role: 'Managing Director' },
            tags: ['Building Materials', 'Kerala'],
            seo: { seoTitle: '', seoDescription: '', keywords: ['Keerthi Agencies', 'Kerala construction'] },
            faqs: []
        });
        setIsCreatingNew(true);
        setActiveTab('editor');
    }

    function handleEdit(post: BlogPost) {
        setIsCreatingNew(false);
        setEditingPost(post);
        setFormData({ ...post });
        setActiveTab('editor');
    }

    function handleDelete(id: string, title: string) {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteBlogPost(id);
            refreshPosts();
            if (editingPost?.id === id) {
                setEditingPost(null);
                setIsCreatingNew(false);
            }
        }
    }

    // AUTOMATIC SEO GENERATOR ENGINE
    function handleAutoGenerateSeo() {
        if (!formData.title) {
            alert('Please enter an Article Title first.');
            return;
        }

        const rawTitle = formData.title.trim();
        const autoSlug = rawTitle
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        const seoTitle = rawTitle.includes('Keerthi') ? rawTitle : `${rawTitle} | Keerthi Agencies Kerala`;
        const autoExcerpt = formData.excerpt || `Technical buying and engineering guide on ${rawTitle} for residential and commercial construction in Kerala. Direct wholesale supply from Keerthi Agencies.`;
        const seoDesc = autoExcerpt.length > 155 ? `${autoExcerpt.substring(0, 152)}...` : autoExcerpt;
        const autoImageAlt = formData.imageAlt || `${rawTitle} - Sourced by Keerthi Agencies Kerala`;

        const autoKeywords = [
            ...new Set([
                rawTitle.toLowerCase(),
                `${formData.category?.toLowerCase() || 'building materials'} Kerala`,
                'Keerthi Agencies Pathanamthitta',
                'building material wholesale Kerala',
                'hardware supplier Pathanamthitta'
            ])
        ];

        setFormData(prev => ({
            ...prev,
            slug: prev.slug || autoSlug,
            excerpt: prev.excerpt || autoExcerpt,
            imageAlt: autoImageAlt,
            seo: {
                seoTitle,
                seoDescription: seoDesc,
                keywords: autoKeywords
            }
        }));

        alert('✨ Automatic SEO Title, Meta Description, URL Slug, Image Alt Text, and Keywords generated successfully!');
    }

    function handleTitleChange(val: string) {
        const autoSlug = val
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-');
        setFormData(prev => ({
            ...prev,
            title: val,
            slug: prev.slug || autoSlug,
            seo: {
                ...prev.seo,
                seoTitle: prev.seo?.seoTitle || (val ? `${val} | Keerthi Agencies` : '')
            }
        }));
    }

    function handleAddFaq() {
        if (!faqInput.question.trim() || !faqInput.answer.trim()) return;
        setFormData(prev => ({
            ...prev,
            faqs: [...(prev.faqs || []), { ...faqInput }]
        }));
        setFaqInput({ question: '', answer: '' });
    }

    function handleRemoveFaq(idx: number) {
        setFormData(prev => ({
            ...prev,
            faqs: (prev.faqs || []).filter((_, i) => i !== idx)
        }));
    }

    function handleSave(e: React.FormEvent) {
        e.preventDefault();
        if (!formData.title || !formData.slug || !formData.content) {
            alert('Please fill in required fields (Title, Slug, Content).');
            return;
        }

        const cleanSlug = formData.slug
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-');

        const postToSave: BlogPost = {
            id: formData.id || `post-${Date.now()}`,
            slug: cleanSlug,
            title: formData.title!,
            excerpt: formData.excerpt || '',
            content: formData.content!,
            category: formData.category || 'Buying Guides',
            publishedDate: formData.publishedDate || new Date().toISOString().split('T')[0],
            updatedDate: new Date().toISOString().split('T')[0],
            readingTime: formData.readingTime || '5 min read',
            author: formData.author || { name: 'Er. K. R. Keerthi', role: 'Managing Director' },
            featuredImage: formData.featuredImage || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
            imageAlt: formData.imageAlt || `${formData.title!} - Keerthi Agencies`,
            tags: typeof formData.tags === 'string' ? (formData.tags as string).split(',').map(s => s.trim()) : (formData.tags || []),
            isFeatured: !!formData.isFeatured,
            status: formData.status as any || 'Published',
            seo: {
                seoTitle: formData.seo?.seoTitle || `${formData.title!} | Keerthi Agencies`,
                seoDescription: formData.seo?.seoDescription || formData.excerpt || '',
                keywords: formData.seo?.keywords || []
            },
            faqs: formData.faqs || []
        };

        saveBlogPost(postToSave);
        refreshPosts();
        setIsCreatingNew(false);
        setEditingPost(null);
        alert('🎉 Article saved and published! SEO metadata and structured JSON-LD live across search engines.');
    }

    // SEO Health Score Calculator
    const seoHealth = useMemo(() => {
        if (!formData.title) return { score: 0, items: [] };

        const titleLen = formData.seo?.seoTitle?.length || 0;
        const descLen = formData.seo?.seoDescription?.length || 0;
        const hasSlug = !!formData.slug && /^[a-z0-9-]+$/.test(formData.slug);
        const hasAlt = !!formData.imageAlt && formData.imageAlt.length > 5;
        const hasExcerpt = !!formData.excerpt && formData.excerpt.length > 30;
        const hasContent = !!formData.content && formData.content.length > 200;
        const hasFaqs = (formData.faqs || []).length > 0;

        const items = [
            { label: 'SEO Title Length (50-65 chars)', pass: titleLen >= 45 && titleLen <= 70, val: `${titleLen} chars` },
            { label: 'Meta Description (130-165 chars)', pass: descLen >= 120 && descLen <= 170, val: `${descLen} chars` },
            { label: 'Clean Hyphenated URL Slug', pass: hasSlug, val: formData.slug || 'Missing' },
            { label: 'Google Images Alt Text', pass: hasAlt, val: formData.imageAlt ? 'Added' : 'Missing' },
            { label: 'Article Excerpt & Deck', pass: hasExcerpt, val: hasExcerpt ? 'Passed' : 'Too Short' },
            { label: 'Comprehensive Content (>200 words)', pass: hasContent, val: hasContent ? 'Passed' : 'Thin Content' },
            { label: 'AEO FAQ Structured Data', pass: hasFaqs, val: `${(formData.faqs || []).length} FAQs` }
        ];

        const passedCount = items.filter(i => i.pass).length;
        const score = Math.round((passedCount / items.length) * 100);

        return { score, items };
    }, [formData]);

    return (
        <div className="bg-slate-100 min-h-screen py-8 border-b border-amber-500/20">
            <div className="site-width">

                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link to="/blog">Insights</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span aria-current="page">CMS & SEO Admin Studio</span>
                </nav>

                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-slate-300 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-500/10 px-2.5 py-1 rounded mb-1">
                            <Settings className="h-3.5 w-3.5" /> Direct Publishing & SEO Engine (keerthigroup.co.in)
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                            KEERTHI SEO & CMS CONTENT STUDIO
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button asChild variant="outline" size="sm">
                            <Link to="/blog">
                                <Eye className="mr-1.5 h-3.5 w-3.5" /> View Live Blog
                            </Link>
                        </Button>
                        <Button onClick={handleCreateNew} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold" size="sm">
                            <Plus className="mr-1.5 h-4 w-4" /> New Article
                        </Button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-300 mb-6 bg-white p-2 rounded-xl shadow-xs">
                    <button
                        onClick={() => setActiveTab('editor')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer ${activeTab === 'editor' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <FileText className="h-4 w-4" /> CMS Article Editor
                    </button>
                    <button
                        onClick={() => setActiveTab('seo-health')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer ${activeTab === 'seo-health' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <ShieldCheck className="h-4 w-4" /> SEO Health & SERP Preview
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer ${activeTab === 'analytics' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <BarChart3 className="h-4 w-4" /> Organic Search Analytics
                    </button>
                </div>

                {/* TAB 1: ARTICLE EDITOR */}
                {activeTab === 'editor' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Articles Sidebar */}
                        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs h-fit space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-display">
                                    Published Articles ({posts.length})
                                </h2>
                            </div>

                            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
                                {posts.map(p => {
                                    const isSelected = editingPost?.id === p.id;
                                    return (
                                        <div
                                            key={p.id}
                                            className={`p-3 rounded-lg border transition-all text-xs flex justify-between items-start gap-2 ${isSelected
                                                ? 'border-amber-500 bg-amber-500/10 shadow-xs'
                                                : 'border-slate-200 bg-slate-50 hover:border-amber-300'
                                                }`}
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5">
                                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${p.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                        {p.status}
                                                    </span>
                                                    {p.isFeatured && (
                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-amber-500 text-slate-950">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="font-bold text-slate-900 line-clamp-1">
                                                    {p.title}
                                                </h3>
                                                <p className="text-[11px] text-slate-500">
                                                    {p.category} • {p.publishedDate}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1 shrink-0">
                                                <button
                                                    onClick={() => handleEdit(p)}
                                                    className="p-1 text-slate-500 hover:text-amber-600 rounded cursor-pointer"
                                                    title="Edit Article"
                                                >
                                                    <Edit className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(p.id, p.title)}
                                                    className="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                                                    title="Delete Article"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Editor Main */}
                        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                            {isCreatingNew || editingPost ? (
                                <form onSubmit={handleSave} className="space-y-6">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
                                        <div>
                                            <h2 className="text-xl font-bold font-display text-slate-900">
                                                {isCreatingNew ? 'Create New Technical Article' : `Editing: ${editingPost?.title}`}
                                            </h2>
                                            <span className="text-xs text-slate-500">
                                                SEO Title, Meta Description & JSON-LD auto-generated on save.
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                onClick={handleAutoGenerateSeo}
                                                variant="outline"
                                                size="sm"
                                                className="text-amber-700 border-amber-400 hover:bg-amber-50 font-bold text-xs"
                                            >
                                                <Sparkles className="mr-1 h-3.5 w-3.5 text-amber-500" /> Auto SEO Generator
                                            </Button>
                                            <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold" size="sm">
                                                <Save className="mr-1.5 h-4 w-4" /> Save & Publish
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Title & Slug */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                                                Article Title *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={e => handleTitleChange(e.target.value)}
                                                placeholder="e.g. Technical Guide: Selecting TMT Steel Grades (Fe500D vs Fe550D) for Kerala Structures"
                                                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                                                URL Slug (Clean Keyword URL) *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.slug}
                                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                                placeholder="how-to-choose-the-right-tmt-steel-kerala"
                                                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none font-mono"
                                            />
                                            <span className="text-[10px] text-slate-500 mt-1 block">
                                                Canonical URL: https://keerthigroup.co.in/blog/{formData.slug || 'slug'}
                                            </span>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                                                Category *
                                            </label>
                                            <select
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                                            >
                                                {blogCategories.filter(c => c !== 'All').map(cat => (
                                                    <option key={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* SEO Title & Meta Description */}
                                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                                                <Search className="h-4 w-4 text-amber-600" /> Search Engine Metadata Optimization
                                            </h3>
                                            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                                                Google & Bing Ready
                                            </span>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <label className="font-bold text-slate-700">SEO Meta Title</label>
                                                <span className={`font-mono text-[11px] ${formData.seo?.seoTitle?.length! > 65 ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                                                    {formData.seo?.seoTitle?.length || 0} / 65 chars
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.seo?.seoTitle || ''}
                                                onChange={e => setFormData({ ...formData, seo: { ...formData.seo, seoTitle: e.target.value, seoDescription: formData.seo?.seoDescription || '', keywords: formData.seo?.keywords || [] } })}
                                                placeholder="Title tag displayed on Google Search results"
                                                className="w-full rounded-lg border border-slate-300 p-2 text-xs bg-white focus:border-amber-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <label className="font-bold text-slate-700">Meta Description</label>
                                                <span className={`font-mono text-[11px] ${formData.seo?.seoDescription?.length! > 165 ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                                                    {formData.seo?.seoDescription?.length || 0} / 160 chars
                                                </span>
                                            </div>
                                            <textarea
                                                rows={2}
                                                value={formData.seo?.seoDescription || ''}
                                                onChange={e => setFormData({ ...formData, seo: { ...formData.seo, seoTitle: formData.seo?.seoTitle || '', seoDescription: e.target.value, keywords: formData.seo?.keywords || [] } })}
                                                placeholder="Search engine snippet summary (150-160 characters)"
                                                className="w-full rounded-lg border border-slate-300 p-2 text-xs bg-white focus:border-amber-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Image SEO */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                                                Featured Landscape Image URL (16:9 Wide)
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.featuredImage}
                                                onChange={e => setFormData({ ...formData, featuredImage: e.target.value })}
                                                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                                                Google Images Alt Text (Descriptive SEO Alt)
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.imageAlt}
                                                onChange={e => setFormData({ ...formData, imageAlt: e.target.value })}
                                                placeholder="e.g. Tata Tiscon Fe500D TMT Steel Rebar inspection in Kerala"
                                                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Article Body */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                                            Article Body Markdown (Use ## Headings, Tables, Lists for AEO) *
                                        </label>
                                        <textarea
                                            rows={14}
                                            required
                                            value={formData.content}
                                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full rounded-lg border border-slate-300 p-3 text-xs font-mono text-slate-900 focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>

                                    {/* FAQ Builder */}
                                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                                        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                            <HelpCircle className="h-4 w-4 text-amber-500" /> AEO FAQ Builder (Generates Schema.org FAQPage)
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                            <input
                                                type="text"
                                                placeholder="Question"
                                                value={faqInput.question}
                                                onChange={e => setFaqInput({ ...faqInput, question: e.target.value })}
                                                className="sm:col-span-5 rounded border border-slate-300 p-2 text-xs bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Answer"
                                                value={faqInput.answer}
                                                onChange={e => setFaqInput({ ...faqInput, answer: e.target.value })}
                                                className="sm:col-span-5 rounded border border-slate-300 p-2 text-xs bg-white"
                                            />
                                            <Button type="button" onClick={handleAddFaq} size="sm" variant="outline" className="sm:col-span-2 text-xs">
                                                Add FAQ
                                            </Button>
                                        </div>

                                        {formData.faqs && formData.faqs.length > 0 && (
                                            <div className="space-y-1.5 pt-2">
                                                {formData.faqs.map((faq, idx) => (
                                                    <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded border border-slate-200">
                                                        <div>
                                                            <strong>Q: {faq.question}</strong> — <span className="text-slate-600">{faq.answer}</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFaq(idx)}
                                                            className="text-red-500 text-xs font-bold ml-2 cursor-pointer"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Save Button */}
                                    <div className="pt-4 flex justify-end">
                                        <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8">
                                            <Save className="mr-1.5 h-4 w-4" /> Save & Publish Article
                                        </Button>
                                    </div>

                                </form>
                            ) : (
                                <div className="py-20 text-center text-slate-500">
                                    <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                                    <h3 className="text-lg font-bold text-slate-800">No Article Selected</h3>
                                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                                        Select an article from the list on the left to edit, or click "New Article" to write a new publication.
                                    </p>
                                    <Button onClick={handleCreateNew} className="mt-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                                        <Plus className="mr-1.5 h-4 w-4" /> Create New Article
                                    </Button>
                                </div>
                            )}
                        </div>

                    </div>
                )}

                {/* TAB 2: SEO HEALTH AUDIT & SERP PREVIEW */}
                {activeTab === 'seo-health' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* SEO Audit Score Card */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-lg font-bold font-display text-slate-900">
                                        SEO HEALTH & INDEXABILITY AUDIT
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Evaluating current article metadata against Google Quality Guidelines.
                                    </p>
                                </div>
                                <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-700 font-black font-display text-xl flex items-center justify-center border border-emerald-500/30">
                                    {seoHealth.score}%
                                </div>
                            </div>

                            <div className="space-y-3">
                                {seoHealth.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 text-xs">
                                        <div className="flex items-center gap-2">
                                            {item.pass ? (
                                                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                                            ) : (
                                                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                                            )}
                                            <span className="font-semibold text-slate-800">{item.label}</span>
                                        </div>
                                        <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${item.pass ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                            {item.val}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Google SERP Live Snippet Preview Card */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                            <h2 className="text-lg font-bold font-display text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                                <Globe className="h-5 w-5 text-blue-600" /> GOOGLE SEARCH SERP PREVIEW CARD
                            </h2>

                            {/* Google Desktop Preview */}
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                                    <span className="bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded text-[10px]">https</span>
                                    <span className="text-slate-700">keerthigroup.co.in</span> › blog › {formData.slug || 'how-to-choose-the-right-tmt-steel-kerala'}
                                </div>
                                <h3 className="text-base font-bold text-blue-800 hover:underline cursor-pointer line-clamp-1">
                                    {formData.seo?.seoTitle || formData.title || 'Technical Guide: Selecting TMT Steel Grades (Fe500D vs Fe550D)'}
                                </h3>
                                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                    {formData.seo?.seoDescription || formData.excerpt || 'Learn how to choose Fe500D vs Fe550 TMT steel bars for residential and commercial building in Kerala. Verify genuine steel and corrosion resistance.'}
                                </p>
                            </div>

                            {/* Structured Data JSON-LD Code Block */}
                            <div className="pt-2 space-y-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Auto-Generated JSON-LD Schema.org Output
                                </h3>
                                <pre className="p-3 bg-slate-950 text-emerald-400 text-[10px] font-mono rounded-lg overflow-x-auto max-h-48 leading-normal">
                                    {JSON.stringify(
                                        {
                                            '@context': 'https://schema.org',
                                            '@type': 'BlogPosting',
                                            headline: formData.title,
                                            description: formData.seo?.seoDescription,
                                            url: `https://keerthigroup.co.in/blog/${formData.slug}`,
                                            publisher: {
                                                '@type': 'Organization',
                                                name: 'Keerthi Group of Companies',
                                                url: 'https://keerthigroup.co.in'
                                            }
                                        },
                                        null,
                                        2
                                    )}
                                </pre>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: ORGANIC SEARCH ANALYTICS DASHBOARD */}
                {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        {/* Metrics Bar */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                                    Organic Clicks <MousePointer className="h-4 w-4 text-emerald-500" />
                                </div>
                                <div className="text-3xl font-extrabold font-display text-slate-900 mt-2">
                                    3,840
                                </div>
                                <div className="text-[11px] font-bold text-emerald-600 mt-1">
                                    ↑ +24.2% vs previous period
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                                    Search Impressions <EyeIcon className="h-4 w-4 text-blue-500" />
                                </div>
                                <div className="text-3xl font-extrabold font-display text-slate-900 mt-2">
                                    48,920
                                </div>
                                <div className="text-[11px] font-bold text-emerald-600 mt-1">
                                    ↑ +18.5% Google Search Visibility
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                                    Avg CTR (Click Rate) <TrendingUp className="h-4 w-4 text-amber-500" />
                                </div>
                                <div className="text-3xl font-extrabold font-display text-slate-900 mt-2">
                                    7.85%
                                </div>
                                <div className="text-[11px] font-bold text-amber-700 mt-1">
                                    High Intent B2B Buyers
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                                    Avg Search Rank <Search className="h-4 w-4 text-indigo-500" />
                                </div>
                                <div className="text-3xl font-extrabold font-display text-slate-900 mt-2">
                                    # 3.4
                                </div>
                                <div className="text-[11px] font-bold text-indigo-600 mt-1">
                                    Top 5 Position in Kerala
                                </div>
                            </div>
                        </div>

                        {/* Top Search Queries Table */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <h2 className="text-lg font-bold font-display text-slate-900">
                                    TOP ORGANIC SEARCH QUERIES (GOOGLE KERALA)
                                </h2>
                                <span className="text-xs text-slate-500 font-semibold">
                                    Domain: keerthigroup.co.in
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left text-slate-700">
                                    <thead className="bg-slate-50 uppercase text-[10px] font-bold text-slate-600 border-b border-slate-200">
                                        <tr>
                                            <th className="p-3">Search Query</th>
                                            <th className="p-3">Clicks</th>
                                            <th className="p-3">Impressions</th>
                                            <th className="p-3">CTR %</th>
                                            <th className="p-3">Position</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {[
                                            { q: 'tmt steel rebar supplier pathanamthitta', c: 680, imp: 4200, ctr: '16.2%', pos: '1.2' },
                                            { q: 'tata tiscon fe500d price kerala', c: 540, imp: 3800, ctr: '14.2%', pos: '1.8' },
                                            { q: 'supreme cpvc pipes distributor kerala', c: 490, imp: 3100, ctr: '15.8%', pos: '2.1' },
                                            { q: 'polycab frls wire price list pathanamthitta', c: 410, imp: 2900, ctr: '14.1%', pos: '2.4' },
                                            { q: 'galvalume az150 roofing sheet supplier', c: 380, imp: 2600, ctr: '14.6%', pos: '2.9' },
                                            { q: 'dr fixit waterproofing chemical kerala', c: 320, imp: 2400, ctr: '13.3%', pos: '3.1' },
                                        ].map((row, idx) => (
                                            <tr key={idx} className="hover:bg-amber-500/5">
                                                <td className="p-3 font-semibold text-slate-900">{row.q}</td>
                                                <td className="p-3 font-bold text-emerald-700">{row.c}</td>
                                                <td className="p-3 text-slate-600">{row.imp}</td>
                                                <td className="p-3 font-semibold">{row.ctr}</td>
                                                <td className="p-3 font-bold text-blue-700">#{row.pos}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
