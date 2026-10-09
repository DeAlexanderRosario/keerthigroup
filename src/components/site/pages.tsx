import { type ReactNode, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronRight, Phone, Mail, MapPin, MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { business, categories, distribution, services } from '@/data/site';
import { ProductGrid, VisionMission, TrustedBrands, DistributionLists, ServiceList, WhyChoose } from './sections';
import { openQuoteModal } from './quote-modal';
import construction from '@/assets/construction.webp';
import { enquiryLink, trackEvent } from '@/lib/analytics';

export function PageFrame({ title, description, children, products = false }: { title: string; description: string; children: ReactNode; products?: boolean }) {
    return (
        <div className="site-width inner-page">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <ChevronRight />
                {products && (
                    <>
                        <Link to="/products">Products</Link>
                        <ChevronRight />
                    </>
                )}
                <span aria-current="page">{title}</span>
            </nav>
            <h1 className="page-heading">{title}</h1>
            <p className="page-lead">{description}</p>
            {children}
        </div>
    );
}

export function ProductsPage() {
    return (
        <PageFrame title="Our Products" description="Hardware, building materials and home solutions — for your next project, from foundation to finish.">
            <ProductGrid />
            <div className="mt-10 flex flex-wrap gap-3">
                <Button variant="gold" onClick={() => openQuoteModal()}>
                    Request Commercial Quote <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
                    <a
                        href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent('Hello Birla K Abraham (Keerthi Agencies), I would like to check prices and stock for building materials.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('whatsapp_click')}
                    >
                        <MessageCircle className="mr-1.5 h-4 w-4" /> Quick WhatsApp Enquiry
                    </a>
                </Button>
            </div>
        </PageFrame>
    );
}

export function CategoryPage({ slug }: { slug: string }) {
    const category = categories.find(c => c.slug === slug);
    if (!category) return null;

    const categoryWaUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
        `Hello Birla K Abraham (Keerthi Agencies),\n\nI am looking for details and pricing on: *${category.name}*.\n\nPlease share current stock availability, rates, and wholesale options. Thank you!`
    )}`;

    return (
        <PageFrame products title={category.name} description={`${category.description} Available through Keerthi Agencies in Athikkayam, Pathanamthitta.`}>
            <div className="category-detail">
                <img src={category.image} width={320} height={320} alt={category.name} />
                <div>
                    <h2>Find the right materials for your project</h2>
                    <p>Whether you are purchasing for your home, a construction site or your dealer business, speak directly to Birla K Abraham and our commercial team about your requirements. Ask us about brands, specifications, quantities and current stock availability.</p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
                            <a href={categoryWaUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { category: category.name })}>
                                <MessageCircle className="mr-1.5 h-4 w-4" /> Enquire on WhatsApp
                            </a>
                        </Button>
                        <Button variant="gold" onClick={() => openQuoteModal(category.name)}>
                            <FileText className="mr-1 h-4 w-4" /> Get Formal Quote
                        </Button>
                        <Button asChild variant="goldOutline">
                            <a href={business.phoneLinks[0]} onClick={() => trackEvent('phone_click')}>
                                <Phone className="mr-1 h-4 w-4" /> Call Team
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
            <h2 className="section-title mt-10">More Products</h2>
            <ProductGrid />
        </PageFrame>
    );
}

export function AboutPage() {
    return (
        <PageFrame title="About Keerthi" description="Building Trust. Creating Value. Your building materials and hardware partner in Athikkayam, Pathanamthitta.">
            <div className="about-page-grid">
                <div>
                    <h2 className="section-title">Keerthi Group of Companies</h2>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">
                        Proprietor: {business.proprietor}
                    </p>
                    <p>Keerthi Agencies brings together hardware, building materials, construction products, plumbing, electrical and home solutions. Our business combines retail, wholesale and hardware distribution to serve homeowners, retailers, contractors and builders across Kerala.</p>
                    <p>From everyday repairs to major construction requirements, our focus is on genuine quality products, trusted manufacturer brands and dependable service. Visit us opposite Athikkayam Bus Stand, near SBI Bank, or chat with us on WhatsApp.</p>
                    <VisionMission />
                    <div className="mt-7 flex flex-wrap gap-3">
                        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
                            <a
                                href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent('Hello Birla K Abraham (Keerthi Agencies), I would like to get in touch with your team.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="mr-1.5 h-4 w-4" /> Chat on WhatsApp
                            </a>
                        </Button>
                        <Button asChild variant="goldOutline">
                            <Link to="/contact">Contact Info <ArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </div>
                <img src={construction} width={768} height={1024} loading="lazy" alt="Keerthi Agencies construction materials supply" />
            </div>
        </PageFrame>
    );
}

export function DistributionPage() {
    return (
        <PageFrame title="Hardware Distribution" description="Hardware and construction product supply for dealers, retailers, contractors and builders across Kerala.">
            <h2 className="section-title">Products for Distribution</h2>
            <DistributionLists />
            <div className="detail-grid">
                {distribution.map(d => (
                    <div className="detail-item" key={d.name}>
                        <h2>{d.name}</h2>
                        <p>{d.items.join(', ')}.</p>
                    </div>
                ))}
            </div>
            <div className="mt-10">
                <h2 className="section-title">Distribution Services</h2>
                <ServiceList />
                <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
                        <a
                            href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent('Hello Birla K Abraham (Keerthi Agencies), I am interested in dealer/wholesale distribution partnership.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MessageCircle className="mr-1.5 h-4 w-4" /> WhatsApp Wholesale Team
                        </a>
                    </Button>
                    <Button variant="gold" onClick={() => openQuoteModal('Hardware')}>
                        Partner With Us <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </PageFrame>
    );
}

export function BrandsPage() {
    return (
        <PageFrame title="Our Partner Brands" description="Trusted names in building materials, electrical, plumbing and home solutions available at Keerthi Agencies.">
            <h2 className="section-title">Trusted Partner Brands</h2>
            <TrustedBrands />
            <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
                    <a
                        href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent('Hello Birla K Abraham (Keerthi Agencies), I am looking for genuine brand availability & prices.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MessageCircle className="mr-1.5 h-4 w-4" /> Check Brand Pricing on WhatsApp
                    </a>
                </Button>
                <Button variant="gold" onClick={() => openQuoteModal()}>
                    Request Brand Quote <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
            </div>
        </PageFrame>
    );
}

const serviceDescriptions = [
    'Supply for hardware dealers and their customer requirements.',
    'Discuss project quantities and wholesale purchasing with our team.',
    'Product selection and supply support for retail businesses.',
    'Materials for contractors, builders and project requirements.',
    'Speak with our team about product choices and purchasing enquiries.',
    'Discuss delivery arrangements for your location and order.',
    'Contact our team to confirm current stock before ordering.'
];

export function ServicesPage() {
    return (
        <PageFrame title="Our Services" description="Retail, wholesale and distribution support for homeowners, trade professionals and businesses.">
            <div className="detail-grid">
                {services.map((s, i) => (
                    <div key={s} className="detail-item">
                        <h2>{s}</h2>
                        <p>{serviceDescriptions[i]}</p>
                    </div>
                ))}
            </div>
            <div className="my-10">
                <WhyChoose />
            </div>
            <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
                    <a
                        href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent('Hello Birla K Abraham (Keerthi Agencies), I want to discuss your services & supply options.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MessageCircle className="mr-1.5 h-4 w-4" /> Discuss on WhatsApp
                    </a>
                </Button>
                <Button variant="gold" onClick={() => openQuoteModal()}>
                    Request Quote <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
            </div>
        </PageFrame>
    );
}

export function ContactPage() {
    const [interest, setInterest] = useState('Hardware');
    const [customerType, setCustomerType] = useState('Homeowner');

    return (
        <PageFrame title="Contact Keerthi" description="Tell us what you need. Zero-friction quick connection for retail purchases, wholesale orders or dealer distribution.">
            <div className="contact-page-grid">
                <section className="space-y-4">
                    <div>
                        <h2>Keerthi Agencies</h2>
                        <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                            Proprietor: {business.proprietor}
                        </p>
                    </div>

                    <div className="contact-line">
                        <Phone />
                        <div>
                            {business.phones.map((p, i) => (
                                <p key={p}>
                                    <a href={business.phoneLinks[i]} onClick={() => trackEvent('phone_click')}>
                                        {p}
                                    </a>
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="contact-line">
                        <Mail />
                        <a href={`mailto:${business.email}`}>{business.email}</a>
                    </div>

                    <div className="contact-line">
                        <MapPin />
                        <address>{business.address}</address>
                    </div>

                    <p className="text-sm text-slate-500 font-semibold">
                        GSTIN: {business.gstin}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <Button asChild variant="goldOutline">
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Athikkayam+Bus+Stand+Pathanamthitta+Kerala+689711"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MapPin className="mr-1 h-4 w-4" /> Get Directions
                            </a>
                        </Button>
                        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                            <a
                                href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent('Hello Birla K Abraham (Keerthi Agencies), I have a direct enquiry.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="mr-1.5 h-4 w-4" /> Direct WhatsApp
                            </a>
                        </Button>
                    </div>
                </section>

                <section>
                    <h2>Send Quick WhatsApp Enquiry</h2>
                    <form
                        className="enquiry-form"
                        onSubmit={e => {
                            e.preventDefault();
                            const data = new FormData(e.currentTarget);
                            const name = String(data.get('name') ?? '').trim();
                            const phone = String(data.get('phone') ?? '').trim();
                            const message = String(data.get('message') ?? '').trim();

                            const fullMessage = `Customer Type: ${customerType}\nInterested In: ${interest}\n\nDetails: ${message || 'No additional notes'}`;

                            trackEvent('enquiry_submit', { interest, customerType });
                            window.open(enquiryLink(name || 'Customer', phone || 'Provided', interest, fullMessage), '_blank', 'noopener,noreferrer');
                        }}
                    >
                        <div className="form-row">
                            <label>
                                I am a...
                                <select value={customerType} onChange={e => setCustomerType(e.target.value)}>
                                    <option>Homeowner (House Construction)</option>
                                    <option>Dealer Shop (Retail Hardware Store)</option>
                                    <option>Contractor / Site Builder</option>
                                    <option>Plumber / Electrician Trade</option>
                                </select>
                            </label>

                            <label>
                                Interested In
                                <select value={interest} onChange={e => setInterest(e.target.value)}>
                                    {categories.map(c => (
                                        <option key={c.slug}>{c.name}</option>
                                    ))}
                                    <option>Wholesale / Distribution</option>
                                    <option>Other Building Materials</option>
                                </select>
                            </label>
                        </div>

                        <div className="form-row">
                            <label>
                                Your Name (Optional)
                                <input name="name" maxLength={100} autoComplete="name" placeholder="Full name" />
                            </label>
                            <label>
                                Phone Number (Optional)
                                <input name="phone" type="tel" pattern="[+0-9 ()-]{7,20}" maxLength={20} autoComplete="tel" placeholder="Phone number" />
                            </label>
                        </div>

                        <label>
                            Your Items / Requirements (Optional)
                            <textarea name="message" maxLength={2000} placeholder="e.g. Need pricing for Tata Tiscon TMT, Supreme CPVC pipes, Polycab wiring..." />
                        </label>

                        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800">
                            <strong>Instant Connection:</strong> Clicking below opens WhatsApp with your choices pre-filled. You can edit or send immediately!
                        </div>

                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-sm">
                            <MessageCircle className="mr-2 h-5 w-5 text-white" /> Continue on WhatsApp <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </form>
                </section>
            </div>
        </PageFrame>
    );
}
