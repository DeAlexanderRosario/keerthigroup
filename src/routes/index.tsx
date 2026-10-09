import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
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
import { pageHead } from '@/lib/seo';
import { business } from '@/data/site';
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
          <div className="hero-actions">
            <Button asChild variant="gold">
              <Link to="/products">
                Explore Products <ArrowRight />
              </Link>
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
              { icon: Phone, label: '+91 94460 04402' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-300">
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

      {/* ── TRUSTED BRANDS (30 brands, clean white grid) ──────────────────── */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="site-width">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
              Our Manufacturer Partners
            </span>
            <div className="w-10 h-0.5 bg-amber-500 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              Leading Manufacturer Partners
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-lg mx-auto">
              Direct wholesale distribution relationships with India's most respected brands — from TMT steel to electrical, pipes, paints, and power solutions.
            </p>
          </div>

          <TrustedBrands />

          <div className="mt-10 text-center flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Button asChild variant="gold" size="sm">
              <Link to="/brands">
                View All Brand Partnerships <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
              <a href={business.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-3.5 w-3.5 text-emerald-500" /> WhatsApp for Availability
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── RETAIL BAND ──────────────────────────────────────────────────── */}
      <RetailBand />

      {/* ── BLOG HIGHLIGHTS ──────────────────────────────────────────────── */}
      <BlogHighlights />
    </>
  );
}
