import { useEffect, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Phone, Mail, MapPin, ArrowRight, MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { business, navigation } from '@/data/site';
import { Logo, ContactBand } from './sections';
import { QuoteModal, openQuoteModal } from './quote-modal';
import { trackEvent } from '@/lib/analytics';

function AnalyticsConsent() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const ga = import.meta.env['VITE_GA4_ID'];
        const gtm = import.meta.env['VITE_GTM_ID'];
        if (!ga && !gtm) return;
        const consent = localStorage.getItem('keerthi-analytics-consent');
        if (consent === 'accepted') load();
        else if (!consent) setVisible(true);

        function load() {
            const w = window as Window & { dataLayer?: unknown[] };
            w.dataLayer ??= [];
            if (gtm && /^GTM-[A-Z0-9]+$/.test(gtm)) {
                w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
                const s = document.createElement('script');
                s.src = `https://www.googletagmanager.com/gtm.js?id=${gtm}`;
                s.async = true;
                document.head.append(s);
            } else if (ga && /^G-[A-Z0-9]+$/.test(ga)) {
                const s = document.createElement('script');
                s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
                s.async = true;
                document.head.append(s);
                function gtag(...args: unknown[]) {
                    w.dataLayer?.push(args);
                }
                gtag('js', new Date());
                gtag('config', ga);
            }
        }
    }, []);

    if (!visible) return null;
    return (
        <aside className="consent-banner" aria-label="Analytics consent">
            <p>May we use optional analytics cookies to understand visits to our website?</p>
            <div className="flex gap-2">
                <Button
                    variant="gold"
                    onClick={() => {
                        localStorage.setItem('keerthi-analytics-consent', 'accepted');
                        window.location.reload();
                    }}
                >
                    Accept
                </Button>
                <Button
                    variant="outline"
                    onClick={() => {
                        localStorage.setItem('keerthi-analytics-consent', 'declined');
                        setVisible(false);
                    }}
                >
                    Decline
                </Button>
            </div>
        </aside>
    );
}

function EnhancedFloatingWhatsApp() {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const getWhatsAppUrl = (type: 'home' | 'dealer' | 'contractor') => {
        let msg = '';
        if (type === 'home') {
            msg = `Hello Birla K Abraham (Keerthi Agencies),\n\nI am a Homeowner looking for building materials & hardware for my home in Pathanamthitta/Kerala.\n\nMaterials I need:\n- [ ] Cement / TMT Steel\n- [ ] Plumbing & Electrical\n- [ ] Paints / Roofing / Hardware\n\nPlease share current rates & availability. Thank you!`;
        } else if (type === 'dealer') {
            msg = `Hello Birla K Abraham (Keerthi Agencies),\n\nI own a Retail Shop / Dealer Store and need wholesale hardware & building materials for resale.\n\nCategories needed:\n- [ ] Fasteners & Hardware\n- [ ] Electrical Wires & Accessories\n- [ ] Plumbing Pipes & Fittings\n- [ ] Inverters & Batteries\n\nPlease share wholesale dealer prices. Thank you!`;
        } else {
            msg = `Hello Birla K Abraham (Keerthi Agencies),\n\nI am a Contractor / Builder looking for site supply & project commercial pricing.\n\nProject items needed:\n- [ ] TMT Reinforcement Steel & Cement\n- [ ] Plumbing & Drainage Pipes\n- [ ] Electrical Site Supplies\n\nPlease send quotation details. Thank you!`;
        }
        return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Popover Card */}
            {popoverOpen && (
                <div className="mb-3 w-80 rounded-2xl border border-amber-500/30 bg-slate-900 p-4 shadow-2xl text-white animate-in fade-in slide-in-from-bottom-3 duration-200">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                                KEERTHI DIRECT WHATSAPP
                            </span>
                            <h4 className="text-sm font-extrabold gold-gradient-text">
                                Chat with Birla K Abraham
                            </h4>
                        </div>
                        <button
                            onClick={() => setPopoverOpen(false)}
                            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 cursor-pointer"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <p className="text-xs text-slate-300 my-2.5 leading-relaxed">
                        What type of enquiry are you looking for? Tap to compose a ready-to-send message with zero typing:
                    </p>

                    <div className="space-y-2">
                        <a
                            href={getWhatsAppUrl('home')}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                trackEvent('whatsapp_click', { type: 'homeowner' });
                                setPopoverOpen(false);
                            }}
                            className="flex items-center gap-2.5 rounded-xl border border-amber-500/20 bg-slate-800/80 p-2.5 text-xs text-slate-100 hover:border-amber-400 hover:bg-slate-800 transition-all group"
                        >
                            <span className="text-base">🏡</span>
                            <div>
                                <span className="font-bold block text-slate-100 group-hover:text-amber-400">Homeowner / House Construction</span>
                                <span className="text-[10px] text-slate-400">Materials for home build or renovation</span>
                            </div>
                        </a>

                        <a
                            href={getWhatsAppUrl('dealer')}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                trackEvent('whatsapp_click', { type: 'dealer' });
                                setPopoverOpen(false);
                            }}
                            className="flex items-center gap-2.5 rounded-xl border border-amber-500/20 bg-slate-800/80 p-2.5 text-xs text-slate-100 hover:border-amber-400 hover:bg-slate-800 transition-all group"
                        >
                            <span className="text-base">🏬</span>
                            <div>
                                <span className="font-bold block text-slate-100 group-hover:text-amber-400">Retail Shop / Dealer Supply</span>
                                <span className="text-[10px] text-slate-400">Wholesale stock for hardware resale</span>
                            </div>
                        </a>

                        <a
                            href={getWhatsAppUrl('contractor')}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                trackEvent('whatsapp_click', { type: 'contractor' });
                                setPopoverOpen(false);
                            }}
                            className="flex items-center gap-2.5 rounded-xl border border-amber-500/20 bg-slate-800/80 p-2.5 text-xs text-slate-100 hover:border-amber-400 hover:bg-slate-800 transition-all group"
                        >
                            <span className="text-base">🏗️</span>
                            <div>
                                <span className="font-bold block text-slate-100 group-hover:text-amber-400">Contractor / Site Project</span>
                                <span className="text-[10px] text-slate-400">Bulk supply for commercial sites</span>
                            </div>
                        </a>
                    </div>
                </div>
            )}

            {/* Main Floating Trigger Button */}
            <div className="flex items-center gap-2">
                {!popoverOpen && (
                    <button
                        onClick={() => setPopoverOpen(true)}
                        className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 px-3.5 py-1.5 text-xs font-bold shadow-xl backdrop-blur-md hover:border-amber-400 transition-all cursor-pointer"
                    >
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="gold-gradient-text">Chat with Birla K Abraham</span>
                    </button>
                )}

                <button
                    onClick={() => setPopoverOpen(prev => !prev)}
                    className="floating-whatsapp relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl transition-all duration-300 hover:bg-emerald-500 hover:scale-105 cursor-pointer"
                    aria-label="Open WhatsApp Instant Chat"
                >
                    <MessageCircle className="h-7 w-7" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950 shadow-xs">
                        1
                    </span>
                </button>
            </div>
        </div>
    );
}

export function SiteShell({ children }: { children: ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <a className="skip-link" href="#main-content">
                Skip to content
            </a>

            {/* Top Contact Bar */}
            <div className="topbar">
                <div className="site-width topbar-inner">
                    <span>
                        <Phone aria-hidden="true" />
                        <a href={business.phoneLinks[0]} onClick={() => trackEvent('phone_click')}>
                            {business.phones[0]}
                        </a>
                        <span aria-hidden="true">|</span>
                        <a href={business.phoneLinks[1]} onClick={() => trackEvent('phone_click')}>
                            {business.phones[1]}
                        </a>
                    </span>
                    <a href={`mailto:${business.email}`}>
                        <Mail aria-hidden="true" />
                        {business.email}
                    </a>
                    <span className="top-address">
                        <MapPin aria-hidden="true" />
                        {business.address}
                    </span>
                    <span className="top-gstin">GSTIN: {business.gstin}</span>
                </div>
            </div>

            {/* Main Sticky Header */}
            <header className="site-header">
                <div className="site-width header-inner">
                    <Link to="/" aria-label="Keerthi Group of Companies home" onClick={() => setMenuOpen(false)}>
                        <Logo />
                    </Link>
                    <nav className="desktop-nav" aria-label="Main navigation">
                        {navigation.map(n => (
                            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === '/' }}>
                                {n.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        <Button
                            className="header-enquire cursor-pointer bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2"
                            variant="gold"
                            onClick={() => openQuoteModal()}
                        >
                            GET A QUICK QUOTE <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                        <Button
                            className="menu-toggle"
                            variant="ghost"
                            size="icon"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <nav className="mobile-nav" aria-label="Mobile navigation">
                        {navigation.map(n => (
                            <Link key={n.to} to={n.to} onClick={() => setMenuOpen(false)}>
                                {n.label}
                            </Link>
                        ))}
                        <Button
                            variant="gold"
                            onClick={() => {
                                setMenuOpen(false);
                                openQuoteModal();
                            }}
                            className="w-full mt-2 font-bold"
                        >
                            GET A QUICK QUOTE <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </nav>
                )}
            </header>

            {/* Main Content Area */}
            <main id="main-content">{children}</main>

            {/* Contact Band & Footer */}
            <ContactBand />

            <footer className="site-footer">
                <div className="site-width footer-inner">
                    <p>© {new Date().getFullYear()} Keerthi Group of Companies. All rights reserved. GSTIN: {business.gstin}</p>
                    <nav className="footer-links" aria-label="Footer navigation">
                        {navigation.map(n => (
                            <Link key={n.to} to={n.to}>
                                {n.label}
                            </Link>
                        ))}
                        <Link to="/blog/admin" className="text-amber-600 font-semibold dark:text-amber-400">
                            CMS Admin Studio
                        </Link>
                    </nav>
                </div>
            </footer>

            {/* Enhanced Floating WhatsApp Conversion Widget */}
            <EnhancedFloatingWhatsApp />

            {/* Mobile Sticky Bar */}
            <div className="mobile-contact">
                <Button variant="goldOutline" size="sm" asChild>
                    <a href={business.phoneLinks[0]} onClick={() => trackEvent('phone_click')}>
                        <Phone className="mr-1 h-3.5 w-3.5" /> Call
                    </a>
                </Button>
                <Button variant="gold" size="sm" onClick={() => openQuoteModal()}>
                    <FileText className="mr-1 h-3.5 w-3.5" /> Quick Quote
                </Button>
                <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    asChild
                >
                    <a
                        href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent('Hello Birla K Abraham (Keerthi Agencies), I would like to enquire about building materials / hardware.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('whatsapp_click')}
                    >
                        <MessageCircle className="mr-1 h-3.5 w-3.5" /> WhatsApp
                    </a>
                </Button>
            </div>

            <QuoteModal />
            <AnalyticsConsent />
        </>
    );
}
