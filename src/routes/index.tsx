import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Building2, TrendingUp, Award, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AboutProducts,
  DistributionBand,
  RetailBand,
  BlogHighlights,
  VerifiedStatistics,
  TrustedBrands,
} from '@/components/site/sections';
import { Reveal } from '@/components/site/scroll-reveal';
import { pageHead } from '@/lib/seo';
import house from '@/assets/keerthi-house.webp';
import houseSmall from '@/assets/keerthi-house-small.webp';

export const Route = createFileRoute('/')(({
  head: () =>
    pageHead(
      'Hardware & Building Materials in Kerala | Keerthi',
      'Keerthi Group of Companies: retail, wholesale and hardware distribution in Kerala. Building materials, plumbing, electrical and home solutions in Athikkayam.',
      '/'
    ),
  component: Index,
} as any));

function Index() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero" aria-label="Keerthi Agencies">
        <img
          className="hero-photo"
          src={house}
          srcSet={`${houseSmall} 960w, ${house} 1920w`}
          sizes="100vw"
          width={1920}
          height={1024}
          fetchPriority="high"
          alt="Contemporary Kerala home with premium construction finishes — Keerthi Agencies"
        />
        <div className="site-width hero-content">
          <h1>
            BUILDING TRUST.<br />
            CREATING <span className="gold">VALUE.</span>
          </h1>
          <div className="hero-rule" />
          <h2>KEERTHI AGENCIES</h2>
          <p className="hero-model">
            RETAIL <i /> WHOLESALE <i /> HARDWARE DISTRIBUTION
          </p>
          <p className="hero-description">
            Your trusted partner for hardware, building materials, construction products, plumbing, electrical and home solutions in Pathanamthitta, Kerala.
          </p>
          <div className="hero-actions flex flex-wrap gap-3">
            <Button asChild variant="gold">
              <Link to="/products">
                Explore Products <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md hover:shadow-lg transition-all">
              <a href="https://wa.me/917907524465?text=Hello%20Birla%20K%20Abraham%20(Keerthi%20Agencies),%20I%20want%20to%20enquire%20about%20building%20materials%20/%20hardware." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4 text-white" /> Quick WhatsApp Chat
              </a>
            </Button>
            <Button asChild variant="goldOutline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES BAR ─────────────────────────────────────────────── */}
      <div className="bg-slate-950 border-b border-amber-500/20 py-4">
        <div className="site-width">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-slate-400">
            {[
              { icon: Building2, label: '30+ Years of Trust' },
              { icon: Award, label: '30+ Principal Brands' },
              { icon: ShieldCheck, label: 'ISI / BIS Verified Stock' },
              { icon: TrendingUp, label: 'Bulk & Retail Supply' },
              { icon: Phone, label: '+91 79075 24465' },
            ].map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center gap-2 text-slate-300 trust-badge" style={{ animationDelay: `${i * 80}ms` }}>
                <Icon className="h-4 w-4 text-amber-500" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT & PRODUCTS ─────────────────────────────────────────────── */}
      <AboutProducts />

      {/* ── VERIFIED STATS BAR ───────────────────────────────────────────── */}
      <VerifiedStatistics />

      {/* ── DISTRIBUTION BAND ────────────────────────────────────────────── */}
      <DistributionBand />

      {/* ── TRUSTED BRANDS SECTION ─────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-200/60">
        <div className="site-width">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700 block mb-2">
                OUR MANUFACTURER PARTNERS
              </span>
              <div className="w-8 h-0.5 bg-amber-500/80 mx-auto mb-3 rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                Leading <span className="text-amber-700">Manufacturer Partners</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Direct wholesale distribution relationships with India's most trusted brands — from TMT steel to electrical, pipes, paints, and power solutions.
              </p>
            </div>
          </Reveal>

          <TrustedBrands />

          <Reveal variant="up" delay={200}>
            <div className="mt-8 text-center">
              <Button asChild variant="gold" size="sm" className="font-semibold shadow-xs hover:shadow-sm transition-all px-6 py-2">
                <Link to="/brands">
                  View All Brand Partners <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── RETAIL BAND ──────────────────────────────────────────────────── */}
      <RetailBand />

      {/* ── BLOG HIGHLIGHTS ──────────────────────────────────────────────── */}
      <BlogHighlights />
    </>
  );
}
