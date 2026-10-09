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

            {/* Floating Action Button */}
            <a
                className="floating-whatsapp"
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Keerthi on WhatsApp"
                onClick={() => trackEvent('whatsapp_click')}
            >
                <MessageCircle size={26} />
            </a>

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
                    <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click')}>
                        <MessageCircle className="mr-1 h-3.5 w-3.5" /> WhatsApp
                    </a>
                </Button>
            </div>

            <QuoteModal />
            <AnalyticsConsent />
        </>
    );
}
