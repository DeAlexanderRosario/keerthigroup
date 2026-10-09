import { Link } from '@tanstack/react-router';
import {
    ArrowRight,
    Eye,
    Target,
    Bolt,
    DoorOpen,
    Building2,
    Wrench,
    Zap,
    BatteryCharging,
    Check,
    Network,
    Award,
    ShieldCheck,
    Handshake,
    Users,
    Phone,
    Mail,
    MapPin,
    Construction,
    Truck,
    CheckCircle2,
    TrendingUp,
    Clock,
    MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    business,
    categories,
    distribution,
    services,
    trustedBrands,
    customerSegments,
    howItWorksSteps
} from '@/data/site';
import { getStoredBlogPosts } from '@/data/blog';
import { openQuoteModal } from './quote-modal';
import construction from '@/assets/construction.webp';
import fasteners from '@/assets/fasteners.webp';
import warehouse from '@/assets/warehouse.webp';
import keerthiLogo from '@/assets/keerthi-logo.svg';
import { trackEvent } from '@/lib/analytics';

export function Logo({ className = "h-10 sm:h-12" }: { className?: string }) {
    return (
        <span className="inline-flex items-center group cursor-pointer py-1">
            <img
                src={keerthiLogo}
                alt="Keerthi Agencies — Keerthi Group of Companies"
                className={`${className} w-auto object-contain transition-transform group-hover:scale-105`}
                width={220}
                height={50}
            />
        </span>
    );
}

export function ProductGrid() {
    return (
        <div className="products-grid">
            {categories.map(c => (
                <Link
                    key={c.slug}
                    to="/products/$slug"
                    params={{ slug: c.slug }}
                    className="product-card group"
                >
                    <img
                        src={c.image}
                        width={320}
                        height={320}
                        alt={`${c.name} supplied by Keerthi Agencies Kerala`}
                        loading="lazy"
                        decoding="async"
                    />
                    <h3>{c.name}</h3>
                </Link>
            ))}
        </div>
    );
}

export function VisionMission() {
    return (
        <div className="vision-mission">
            <div>
                <Eye aria-hidden="true" />
                <h3>Our Vision</h3>
                <p>To build a trusted and recognized building materials brand from Kerala and expand across India.</p>
            </div>
            <div>
                <Target aria-hidden="true" />
                <h3>Our Mission</h3>
                <p>To provide quality products, trusted brands and dependable service to every customer.</p>
            </div>
        </div>
    );
}

/* 1. TRUST BAR IMMEDIATELY BELOW HERO */
export function TrustBar() {
    const points = [
        {
            title: 'DIRECT SOURCING',
            description: 'Strong manufacturer relationships & original distribution channels.',
            icon: CheckCircle2
        },
        {
            title: 'GENUINE PRODUCTS',
            description: '100% authentic, certified materials with batch quality testing.',
            icon: ShieldCheck
        },
        {
            title: 'COMPETITIVE PRICING',
            description: 'Commercial wholesale rates for retail, contractor & project orders.',
            icon: TrendingUp
        },
        {
            title: 'RELIABLE SUPPLY',
            description: 'Ready depot stock and coordinated site transport across Kerala.',
            icon: Truck
        }
    ];

    return (
        <section className="bg-slate-900 text-white border-y border-amber-500/20 py-6">
            <div className="site-width">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {points.map((p, idx) => {
                        const Icon = p.icon;
                        return (
                            <div key={idx} className="flex items-start space-x-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                <Icon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-xs tracking-wider text-amber-400 uppercase font-display">
                                        {p.title}
                                    </h3>
                                    <p className="text-xs text-slate-300 mt-1 leading-normal">
                                        {p.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* 2. PARTNER BRANDS MARQUEE WITH REAL BRAND COLORS & LOGOS */
export function PartnerBrandsMarquee() {
    return (
        <section className="py-8 bg-slate-50 border-b border-slate-200 overflow-hidden">
            <div className="site-width mb-4 flex justify-between items-end">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                        Principal & Distribution Partners
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-0.5">
                        OUR DISTRIBUTION BRAND NETWORK
                    </h2>
                </div>
                <Link to="/brands" className="text-xs font-bold text-amber-700 hover:text-amber-800 hidden sm:flex items-center gap-1">
                    View All Brands <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>

            {/* Marquee Track */}
            <div className="relative w-full overflow-hidden">
                <div className="animate-marquee flex gap-4 py-2">
                    {[...trustedBrands, ...trustedBrands].map((b, i) => (
                        <div
                            key={`${b.name}-${i}`}
                            className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-xs shrink-0 hover:shadow-md transition-all group"
                        >
                            {/* Authentic Brand Color Emblem */}
                            <div
                                className="h-9 px-3 rounded flex items-center justify-center font-display font-black text-xs tracking-wider shadow-inner"
                                style={{ backgroundColor: b.brandColor, color: b.textColor }}
                            >
                                {b.name}
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[11px] font-extrabold text-slate-900 uppercase leading-none font-display">
                                    {b.category}
                                </span>
                                <span className="text-[9px] font-bold text-amber-700 uppercase mt-0.5">
                                    {b.tag}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* 3. CUSTOMER SEGMENTS SECTION */
export function CustomerSegmentsSection() {
    return (
        <section className="py-12 bg-white border-b border-slate-200">
            <div className="site-width">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                        Targeted Commercial Sourcing
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
                        BUILT FOR THE PEOPLE WHO BUILD
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">
                        Whether buying for a major commercial project, retail hardware store, or residential build, Keerthi provides dedicated pricing and supply coordination.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {customerSegments.map((seg, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 hover:border-amber-400 hover:bg-white hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-extrabold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded">
                                    0{idx + 1}
                                </span>
                                <Users className="h-5 w-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 font-display">
                                {seg.title}
                            </h3>
                            <h4 className="text-xs font-semibold text-amber-700 mb-2">
                                {seg.subtitle}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {seg.description}
                            </p>
                            <button
                                onClick={() => openQuoteModal()}
                                className="mt-4 inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
                            >
                                Request Quote <ArrowRight className="ml-1 h-3.5 w-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* 4. HOW IT WORKS 5-STEP TIMELINE */
export function HowItWorksTimeline() {
    return (
        <section className="py-12 bg-slate-900 text-white border-b border-amber-500/20">
            <div className="site-width">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                        Streamlined Supply Chain
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
                        FROM REQUIREMENT TO DELIVERY
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2">
                        Five clear, transparent steps ensuring seamless procurement for your project.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {howItWorksSteps.map((step, idx) => (
                        <div
                            key={idx}
                            className="relative rounded-lg bg-slate-800/80 p-5 border border-slate-700/60 hover:border-amber-400 transition-colors"
                        >
                            <span className="text-3xl font-black font-display text-amber-400 opacity-60">
                                {step.number}
                            </span>
                            <h3 className="text-sm font-bold font-display text-white mt-2 mb-1 tracking-wide">
                                {step.title}
                            </h3>
                            <p className="text-xs text-slate-300 leading-normal">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* 5. REAL BUSINESS EVIDENCE SHOWCASE */
export function RealBusinessEvidence() {
    return (
        <section className="py-12 bg-slate-50 border-b border-slate-200">
            <div className="site-width">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    <div className="lg:col-span-5 space-y-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                            Verified Physical Sourcing
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display leading-tight">
                            REAL PRODUCTS. REAL SUPPLY. REAL BUSINESS.
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Operating a fully stocked distribution depot directly opposite Athikkayam Bus Stand. We maintain physical inventory across 14 product categories, backed by dedicated staff and site transport.
                        </p>
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                                <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                                Physical warehouse depot with ready inventory
                            </div>
                            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                                <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                                Direct truck loading and site delivery logistics
                            </div>
                            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                                <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                                Registered GSTIN: {business.gstin}
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button onClick={() => openQuoteModal()} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold">
                                Get Commercial Quote <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                                <img
                                    src={warehouse}
                                    alt="Keerthi building materials warehouse depot"
                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="bg-white p-3 text-[11px] font-semibold text-slate-700">
                                    Athikkayam Central Warehouse Depot
                                </div>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                                <img
                                    src={fasteners}
                                    alt="Keerthi hardware fasteners stock"
                                    className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="bg-white p-2.5 text-[11px] font-semibold text-slate-700">
                                    Bulk Hardware Fasteners Inventory
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-6">
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                                <img
                                    src={construction}
                                    alt="Keerthi construction steel & building site delivery"
                                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="bg-white p-3 text-[11px] font-semibold text-slate-700">
                                    Site Materials Coordinated Delivery
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

/* 6. VERIFIED STATISTICS COUNTER */
export function VerifiedStatistics() {
    return (
        <section className="py-10 bg-amber-500 text-slate-950">
            <div className="site-width">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {business.verifiedStats.map((stat, i) => (
                        <div key={i} className="p-3">
                            <div className="text-3xl sm:text-4xl font-extrabold font-display">
                                {stat.value}{stat.suffix}
                            </div>
                            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* 7. TRUSTED BRANDS — MINIMAL WHITE GRID */
export function TrustedBrands() {
    return (
        <div className="brand-globe-grid">
            {trustedBrands.map((b) => (
                <div
                    key={b.name}
                    className="brand-globe-card"
                >
                    <div className="brand-globe-inner">
                        {/* Logo */}
                        <div className="brand-globe-logo">
                            <img
                                src={b.logoUrl}
                                alt={b.alt}
                                width={150}
                                height={40}
                                loading="lazy"
                            />
                        </div>

                        {/* Meta */}
                        <div className="brand-globe-meta">
                            <div className="brand-globe-category">{b.category}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}



export function BrandsBand() {
    return (
        <section className="py-12 bg-white border-b border-slate-200">
            <div className="site-width">
                <div className="text-center max-w-xl mx-auto mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                        Official Distribution Network
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
                        LEADING MANUFACTURER PARTNERS
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">
                        Direct distribution relationships with India's most trusted manufacturers and building material brands.
                    </p>
                </div>

                <TrustedBrands />

                <div className="text-center mt-8">
                    <Button variant="outline" asChild size="sm" className="font-bold">
                        <Link to="/brands">
                            View Complete Brand List <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

/* 8. BLOG HIGHLIGHTS SECTION */
export function BlogHighlights() {
    const posts = getStoredBlogPosts().filter(p => p.status === 'Published').slice(0, 3);

    return (
        <section className="py-12 bg-slate-50 border-b border-slate-200">
            <div className="site-width">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                            Expert Knowledge & Technical Guides
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
                            KEERTHI INSIGHTS & ARTICLES
                        </h2>
                    </div>
                    <Link
                        to="/blog"
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                        Explore All Insights <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map(post => (
                        <article
                            key={post.id}
                            className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col group"
                        >
                            <div className="relative h-44 overflow-hidden bg-slate-100">
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
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {post.readingTime}
                                        </span>
                                        <span>•</span>
                                        <span>{post.publishedDate}</span>
                                    </div>
                                    <h3 className="font-bold text-base text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors font-display">
                                        <Link to="/blog/$slug" params={{ slug: post.slug }}>
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="text-xs text-slate-600 line-clamp-3 mt-2">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                                    <span className="text-[11px] font-medium text-slate-600">
                                        By {post.author.name}
                                    </span>
                                    <Link
                                        to="/blog/$slug"
                                        params={{ slug: post.slug }}
                                        className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                                    >
                                        Read <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* 9. FINAL LEAD GENERATION BANNER */
export function FinalLeadBanner() {
    return (
        <section className="py-14 bg-slate-900 text-white border-t border-amber-500/20">
            <div className="site-width text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Ready to Order or Request Pricing?
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                    HAVE A REQUIREMENT? LET'S SOURCE IT.
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                    Tell us what you need and our commercial supply team will quickly assist you with genuine brand selection, stock availability, and commercial rates.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={() => openQuoteModal()}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3 text-sm"
                    >
                        GET A QUICK QUOTE <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="border-slate-700 text-white hover:bg-slate-800 px-6 py-3 text-sm"
                    >
                        <a href={business.whatsapp} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" /> Chat on WhatsApp
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export function AboutProducts() {
    return (
        <section className="section-divider">
            <div className="site-width about-products">
                <div className="about-side">
                    <div className="about-copy">
                        <h2 className="section-title">About Keerthi</h2>
                        <h3>KEERTHI GROUP OF COMPANIES</h3>
                        <div className="small-gold-rule" />
                        <p>
                            KEERTHI is a leading business focused on building materials, hardware, construction products, plumbing, electrical and home solutions. We are committed to providing quality products, trusted brands and dependable service to every customer.
                        </p>
                        <VisionMission />
                    </div>
                    <div className="construction-feature">
                        <img
                            src={construction}
                            width={768}
                            height={1024}
                            loading="lazy"
                            alt="Construction site with safety helmet and building plans"
                        />
                        <p>
                            STRONG FOUNDATIONS
                            <br />
                            FOR A BETTER
                            <br />
                            <strong>TOMORROW</strong>
                        </p>
                    </div>
                </div>
                <div className="products-area">
                    <div className="products-intro">
                        <div>
                            <h2 className="section-title">Our Products</h2>
                            <p className="section-subtitle">
                                Everything you need for your construction & home projects
                            </p>
                        </div>
                        <Link className="text-link" to="/products">
                            View all <ArrowRight />
                        </Link>
                    </div>
                    <ProductGrid />
                </div>
            </div>
        </section>
    );
}

const distributionIcons = [Bolt, DoorOpen, Building2, Wrench, Zap, BatteryCharging];

export function DistributionLists() {
    return (
        <div className="distribution-grid">
            {distribution.map((d, i) => {
                const Icon = distributionIcons[i] ?? Bolt;
                return (
                    <div className="distribution-item" key={d.name}>
                        <Icon aria-hidden="true" />
                        <div>
                            <h3>{d.name}</h3>
                            <ul>
                                {d.items.map(x => (
                                    <li key={x}>{x}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export function ServiceList() {
    return (
        <ul className="service-list">
            {services.map(s => (
                <li key={s}>
                    <Check aria-hidden="true" />
                    {s}
                </li>
            ))}
        </ul>
    );
}

export function DistributionBand() {
    return (
        <section className="section-divider">
            <div className="site-width distribution-band">
                <img
                    className="fasteners-image"
                    src={fasteners}
                    width={1024}
                    height={512}
                    loading="lazy"
                    alt="Steel fasteners, nuts and bolts"
                />
                <div className="distribution-intro">
                    <h2>
                        HARDWARE
                        <br />
                        <span className="gold">DISTRIBUTION</span>
                    </h2>
                    <p>
                        Supplying quality hardware and construction products to dealers, retailers, contractors and builders across Kerala.
                    </p>
                    <Button onClick={() => openQuoteModal('Hardware')} variant="gold">
                        Partner With Us <ArrowRight />
                    </Button>
                </div>
                <div className="distribution-lists">
                    <h3 className="mini-title">PRODUCTS FOR DISTRIBUTION</h3>
                    <DistributionLists />
                </div>
                <div className="distribution-services">
                    <div>
                        <h3 className="mini-title">DISTRIBUTION SERVICES</h3>
                        <ServiceList />
                    </div>
                    <div className="network">
                        <Network aria-hidden="true" />
                        <div>
                            <h3>OUR NETWORK</h3>
                            <p>
                                Hardware shops · Dealers · Contractors
                                <br />
                                Builders · Fabricators · Plumbers
                                <br />
                                Electricians · Retailers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function WhyChoose() {
    return (
        <div className="why-choose">
            <h2>WHY CHOOSE KEERTHI?</h2>
            <div className="why-grid">
                {[
                    { icon: Award, a: 'Quality', b: 'Products' },
                    { icon: ShieldCheck, a: 'Trusted', b: 'Brands' },
                    { icon: Handshake, a: 'Competitive', b: 'Pricing' },
                    { icon: Users, a: 'Reliable', b: 'Service' }
                ].map(({ icon: Icon, a, b }) => (
                    <div key={a}>
                        <Icon aria-hidden="true" />
                        <h3>
                            {a}
                            <br />
                            {b}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function RetailBand() {
    return (
        <section className="section-divider">
            <div className="site-width retail-band">
                <img
                    src={warehouse}
                    className="warehouse-image"
                    width={1024}
                    height={512}
                    loading="lazy"
                    alt="Building materials warehouse shelving"
                />
                <div className="retail-copy">
                    <h2>RETAIL & WHOLESALE</h2>
                    <p>Serving homeowners, contractors, builders, plumbers, electricians, fabricators and more.</p>
                    <Button asChild variant="gold" size="sm">
                        <Link to="/products">
                            Explore Our Products <ArrowRight />
                        </Link>
                    </Button>
                </div>
                <WhyChoose />
            </div>
        </section>
    );
}

export function ContactBand() {
    return (
        <section className="section-divider">
            <div className="site-width contact-band">
                <div className="contact-brand">
                    <Link to="/" aria-label="Keerthi home">
                        <Logo />
                    </Link>
                    <p>{business.tagline}</p>
                </div>
                <div className="contact-info">
                    <h2>CONTACT KEERTHI AGENCIES</h2>
                    <div className="contact-details">
                        <div>
                            {business.phones.map((p, i) => (
                                <a key={p} href={business.phoneLinks[i]} onClick={() => trackEvent('phone_click', { phone: p })}>
                                    <Phone aria-hidden="true" />
                                    {p}
                                </a>
                            ))}
                            <a href={`mailto:${business.email}`}>
                                <Mail aria-hidden="true" />
                                {business.email}
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Athikkayam+Bus+Stand+Pathanamthitta+Kerala+689711"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MapPin aria-hidden="true" />
                                <address>{business.address}</address>
                            </a>
                            <small>GSTIN: {business.gstin}</small>
                        </div>
                    </div>
                </div>
                <div className="partner-note">
                    <p>
                        Your Trusted
                        <br />
                        Building Material
                        <br />
                        Partner
                    </p>
                    <Construction aria-hidden="true" />
                </div>
            </div>
        </section>
    );
}
