import { useState, useEffect } from 'react';
import { X, CheckCircle, Send, ArrowRight, ArrowLeft, MessageCircle, Phone, Building2, Package, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, business } from '@/data/site';
import { trackEvent } from '@/lib/analytics';

export function openQuoteModal(initialCategory?: string) {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('open-quote-modal', { detail: { category: initialCategory } });
        window.dispatchEvent(event);
    }
}

export function QuoteModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    // Form State
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [requirementText, setRequirementText] = useState('');
    const [quantity, setQuantity] = useState('');
    const [projectType, setProjectType] = useState('Commercial / Site Construction');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        function handleOpen(e: Event) {
            const custom = e as CustomEvent<{ category?: string }>;
            if (custom.detail?.category) {
                setSelectedCategories([custom.detail.category]);
            }
            setSubmitted(false);
            setStep(1);
            setIsOpen(true);
            trackEvent('quote_modal_open');
        }
        window.addEventListener('open-quote-modal', handleOpen);
        return () => window.removeEventListener('open-quote-modal', handleOpen);
    }, []);

    if (!isOpen) return null;

    function toggleCategory(catName: string) {
        setSelectedCategories(prev =>
            prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
        );
    }

    function handleNextStep() {
        if (step === 1 && selectedCategories.length === 0) {
            alert('Please select at least one product category.');
            return;
        }
        if (step === 2 && !requirementText.trim()) {
            alert('Please describe your product requirement or quantities.');
            return;
        }
        setStep(prev => prev + 1);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) {
            alert('Please provide your name and phone number.');
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-amber-500/30 bg-white shadow-2xl transition-all dark:bg-slate-900">

                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-amber-500/20 bg-amber-500/5 px-6 py-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            Keerthi Direct Supply Quote
                        </span>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {submitted ? 'Quotation Request Sent!' : 'Get a Quick Commercial Quote'}
                        </h2>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Progress Bar */}
                {!submitted && (
                    <div className="bg-slate-100 dark:bg-slate-800">
                        <div className="flex justify-between px-6 py-2 text-xs font-semibold text-slate-500">
                            <span className={step >= 1 ? 'text-amber-600 font-bold' : ''}>1. Select Categories</span>
                            <span className={step >= 2 ? 'text-amber-600 font-bold' : ''}>2. Requirement Details</span>
                            <span className={step >= 3 ? 'text-amber-600 font-bold' : ''}>3. Contact Info</span>
                        </div>
                        <div className="h-1 bg-slate-200 dark:bg-slate-700">
                            <div
                                className="h-full bg-amber-500 transition-all duration-300"
                                style={{ width: `${(step / 3) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Body Content */}
                <div className="p-6 max-h-[75vh] overflow-y-auto">
                    {submitted ? (
                        <div className="py-6 text-center space-y-5">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                <CheckCircle className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Thank You, {name}!
                            </h3>
                            <p className="max-w-md mx-auto text-sm text-slate-600 dark:text-slate-300">
                                Your quotation request for <strong className="text-slate-900 dark:text-white">{selectedCategories.join(', ')}</strong> has been received by our B2B commercial team.
                            </p>
                            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    asChild
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
                                >
                                    <a href={generateWhatsAppMsg()} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-5 w-5" /> Continue on WhatsApp
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    className="border-slate-300 text-slate-700 dark:text-slate-200"
                                >
                                    Close Window
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Step 1: Select Categories */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        Which product categories do you need quoted? (Select all that apply)
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                        {categories.map(cat => {
                                            const isSelected = selectedCategories.includes(cat.name);
                                            return (
                                                <button
                                                    key={cat.slug}
                                                    type="button"
                                                    onClick={() => toggleCategory(cat.name)}
                                                    className={`flex items-center gap-2.5 rounded-lg border p-3 text-left transition-all ${isSelected
                                                            ? 'border-amber-500 bg-amber-500/10 font-semibold text-amber-900 dark:text-amber-300'
                                                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-300 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300'
                                                        }`}
                                                >
                                                    <div className={`h-4 w-4 rounded border flex items-center justify-center ${isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-400'}`}>
                                                        {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                                                    </div>
                                                    <span className="text-xs sm:text-sm">{cat.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Requirement Details */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">
                                            Describe Your Product Requirements *
                                        </label>
                                        <textarea
                                            required
                                            value={requirementText}
                                            onChange={e => setRequirementText(e.target.value)}
                                            rows={3}
                                            placeholder="e.g. 5 Tons Tata Tiscon Fe550D TMT, 20 bundles Polycab 2.5mm wire, 50 Supreme CPVC pipe lengths..."
                                            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">
                                                Estimated Quantity
                                            </label>
                                            <input
                                                type="text"
                                                value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                                placeholder="e.g. 100 bags / 5 Tons / Bulk Retail"
                                                className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">
                                                Project / Customer Type
                                            </label>
                                            <select
                                                value={projectType}
                                                onChange={e => setProjectType(e.target.value)}
                                                className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
                            )}

                            {/* Step 3: Contact Details */}
                            {step === 3 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">
                                                Your Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                placeholder="Full name"
                                                className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">
                                                Business / Company Name
                                            </label>
                                            <input
                                                type="text"
                                                value={companyName}
                                                onChange={e => setCompanyName(e.target.value)}
                                                placeholder="Company name (optional)"
                                                className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                placeholder="+91 97443XXXXX"
                                                className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">
                                                Location / Delivery City
                                            </label>
                                            <input
                                                type="text"
                                                value={location}
                                                onChange={e => setLocation(e.target.value)}
                                                placeholder="e.g. Athikkayam, Ranni, Pathanamthitta"
                                                className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Controls */}
                            <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
                                {step > 1 ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(prev => prev - 1)}
                                        className="border-slate-300 text-slate-700 dark:text-slate-300"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                {step < 3 ? (
                                    <Button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                                    >
                                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-6"
                                    >
                                        Submit Quote Request <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                        </form>
                    )}
                </div>

            </div>
        </div>
    );
}
