import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRight, CheckCircle2, MessageCircle, Send, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, business } from '@/data/site';
import { pageHead } from '@/lib/seo';
import { trackEvent } from '@/lib/analytics';

export const Route = createFileRoute('/request-a-quote')({
    head: () =>
        pageHead(
            'Request Commercial Quotation — Keerthi Agencies Kerala',
            'Get direct commercial pricing, bulk material rates, and stock availability for hardware, TMT steel, plumbing and electrical from Keerthi Agencies.',
            '/request-a-quote',
            [{ name: 'Home', path: '/' }, { name: 'Request a Quote', path: '/request-a-quote' }]
        ),
    component: RequestQuotePage,
});

function RequestQuotePage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [requirementText, setRequirementText] = useState('');
    const [quantity, setQuantity] = useState('');
    const [projectType, setProjectType] = useState('Commercial / Site Construction');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function toggleCategory(catName: string) {
        setSelectedCategories(prev =>
            prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (selectedCategories.length === 0) {
            alert('Please select at least one product category.');
            return;
        }
        if (!name.trim() || !phone.trim()) {
            alert('Please enter your name and phone number.');
            return;
        }
        setSubmitted(true);
        trackEvent('form_completions', { categories: selectedCategories.join(', '), projectType });
    }

    const generateWhatsAppMsg = () => {
        const text = `Hello Keerthi Agencies, I would like to request a quotation:\n\n` +
            `*Categories*: ${selectedCategories.join(', ')}\n` +
            `*Requirement*: ${requirementText}\n` +
            `*Quantity*: ${quantity || 'N/A'}\n` +
            `*Project Type*: ${projectType}\n` +
            `*Name*: ${name}\n` +
            `*Business*: ${companyName || 'N/A'}\n` +
            `*Location*: ${location || 'N/A'}\n` +
            `*Phone*: ${phone}`;
        return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(text)}`;
    };

    return (
        <div className="bg-slate-50 min-h-screen py-8 border-b border-amber-500/20">
            <div className="site-width">

                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span aria-current="page">Request a Quote</span>
                </nav>

                <div className="max-w-4xl mx-auto">

                    <div className="text-center mb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                            Direct Sourcing & Commercial Procurement
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mt-1">
                            REQUEST A COMMERCIAL QUOTATION
                        </h1>
                        <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">
                            Fill out your product requirements below. Our commercial sales team will review stock, apply wholesale terms, and provide quick pricing.
                        </p>
                    </div>

                    {submitted ? (
                        <div className="bg-white rounded-2xl border border-amber-500/30 p-8 sm:p-12 text-center space-y-6 shadow-xl">
                            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <CheckCircle2 className="h-12 w-12" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                                Quotation Request Received!
                            </h2>
                            <p className="max-w-md mx-auto text-sm text-slate-600">
                                Thank you, <strong className="text-slate-900">{name}</strong>. Our team has received your enquiry for <strong className="text-slate-900">{selectedCategories.join(', ')}</strong>.
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    asChild
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3"
                                >
                                    <a href={generateWhatsAppMsg()} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-5 w-5" /> Open WhatsApp Quote Chat
                                    </a>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link to="/">Return to Homepage</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8">

                            {/* Category Selector */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                                    1. Select Required Categories (Select all that apply) *
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {categories.map(cat => {
                                        const isSelected = selectedCategories.includes(cat.name);
                                        return (
                                            <button
                                                key={cat.slug}
                                                type="button"
                                                onClick={() => toggleCategory(cat.name)}
                                                className={`flex items-center gap-3 rounded-lg border p-3.5 text-left transition-all cursor-pointer ${isSelected
                                                        ? 'border-amber-500 bg-amber-500/10 font-bold text-slate-900 shadow-xs'
                                                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-300'
                                                    }`}
                                            >
                                                <div className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-400'}`}>
                                                    {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                                                </div>
                                                <span className="text-xs sm:text-sm font-display">{cat.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Requirement details */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                    2. Product & Project Specifications
                                </h3>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Describe Items / Sizes / Specifications *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={requirementText}
                                        onChange={e => setRequirementText(e.target.value)}
                                        placeholder="e.g. 5 Tons Tata Tiscon Fe550D TMT, 20 bundles Polycab 2.5mm wire, 50 Supreme CPVC pipe lengths..."
                                        className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                                            Estimated Quantity
                                        </label>
                                        <input
                                            type="text"
                                            value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                            placeholder="e.g. 10 Tons / 100 Bags / Dealer Retail Stock"
                                            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                                            Project / Business Type
                                        </label>
                                        <select
                                            value={projectType}
                                            onChange={e => setProjectType(e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
                                        >
                                            <option>Commercial / Site Construction</option>
                                            <option>Residential Construction</option>
                                            <option>Contractor / Builder Project</option>
                                            <option>Retailer Stock / Dealer Resale</option>
                                            <option>Electrician / Plumber Trade</option>
                                            <option>Individual Homeowner Purchase</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Contact info */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                    3. Contact & Delivery Location
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            placeholder="Your full name"
                                            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                                            Business / Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={companyName}
                                            onChange={e => setCompanyName(e.target.value)}
                                            placeholder="Company / Firm name (optional)"
                                            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            placeholder="+91 97443XXXXX"
                                            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                                            Delivery Location / City
                                        </label>
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={e => setLocation(e.target.value)}
                                            placeholder="e.g. Athikkayam, Ranni, Pathanamthitta"
                                            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit CTA */}
                            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                <div className="text-xs text-slate-500">
                                    Direct commercial terms • Registered GSTIN: {business.gstin}
                                </div>
                                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3 text-sm">
                                    SUBMIT QUOTATION REQUEST <Send className="ml-2 h-4 w-4" />
                                </Button>
                            </div>

                        </form>
                    )}

                </div>

            </div>
        </div>
    );
}
