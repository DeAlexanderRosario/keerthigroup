import hardware from '@/assets/products/hardware.webp';
import building from '@/assets/products/building-materials.webp';
import cement from '@/assets/products/cement.webp';
import steel from '@/assets/products/steel-tmt.webp';
import roofing from '@/assets/products/roofing-sheets.webp';
import plumbing from '@/assets/products/plumbing.webp';
import sanitaryware from '@/assets/products/sanitaryware.webp';
import fittings from '@/assets/products/bathroom-fittings.webp';
import electrical from '@/assets/products/electrical.webp';
import paints from '@/assets/products/paints.webp';
import tools from '@/assets/products/tools.webp';
import plastic from '@/assets/products/plastic-products.webp';
import inverters from '@/assets/products/inverters.webp';
import batteries from '@/assets/products/batteries.webp';

export const business = {
    name: 'Keerthi Group of Companies',
    tradingName: 'Keerthi Agencies',
    proprietor: 'Birla K Abraham',
    tagline: 'Building Trust. Creating Value.',
    heroHeadline: 'DIRECT FROM BRANDS. DELIVERED WITH CONFIDENCE.',
    heroSubheadline: 'Keerthi Agencies supplies hardware, building materials, electrical, plumbing, construction and power products through strong manufacturer and distribution relationships.',
    heroSupportingText: 'Reliable sourcing, genuine products, competitive pricing and dependable supply for retailers, contractors, builders, businesses and project requirements.',
    phones: ['+91 7907524465', '+91 9744342697'],
    phoneLinks: ['tel:+917907524465', 'tel:+919744342697'],
    email: 'keerthiagakm@gmail.com',
    address: 'Athikkayam Bus Stand opposite, near SBI Bank, Athikkayam, Pathanamthitta, Kerala – 689711',
    gstin: '32AFOPA9652D1ZM',
    whatsappNumber: '917907524465',
    whatsapp: 'https://wa.me/917907524465',
    verifiedStats: [
        { label: 'Years of Industry Trust', value: 15, suffix: '+' },
        { label: 'Product Categories', value: 14, suffix: '' },
        { label: 'Principal & Partner Brands', value: 50, suffix: '+' },
        { label: 'Projects & Businesses Supplied', value: 1200, suffix: '+' },
    ]
};

export interface SeoFields {
    title?: string;
    description?: string;
    keywords?: string[];
}

export interface ProductRecord {
    name: string;
    category: string;
    description: string;
    brand?: string;
    images: string[];
    specifications: Record<string, string>;
    seo: SeoFields;
    slug: string;
    schema?: Record<string, unknown>;
}

const categoryRows = [
    ['Hardware', 'hardware', hardware, 'Fasteners, locks, hinges and everyday hardware for construction, repairs and fit-outs.'],
    ['Building Materials', 'building-materials', building, 'Essential building materials for foundations, structures and finishing work.'],
    ['Cement', 'cement', cement, 'Cement for residential construction, masonry and building projects.'],
    ['Steel / TMT', 'steel-tmt', steel, 'Reinforcement steel and TMT bars for structural construction requirements.'],
    ['Roofing Sheets', 'roofing-sheets', roofing, 'Roofing sheets for homes, workshops and commercial building projects.'],
    ['Plumbing', 'plumbing', plumbing, 'Pipes, fittings, valves and plumbing accessories for water supply and drainage.'],
    ['Sanitaryware', 'sanitaryware', sanitaryware, 'Sanitaryware for practical, comfortable residential and commercial bathrooms.'],
    ['Bathroom Fittings', 'bathroom-fittings', fittings, 'Taps, faucets and fittings for bathroom installations and upgrades.'],
    ['Electrical', 'electrical', electrical, 'Wires, switches and electrical accessories for building and home installations.'],
    ['Paints', 'paints', paints, 'Paints and finishing materials for interior and exterior surfaces.'],
    ['Tools', 'tools', tools, 'Hand tools and workshop essentials for professionals and home maintenance.'],
    ['Plastic Products', 'plastic-products', plastic, 'Water tanks and practical plastic products for homes and project sites.'],
    ['Inverters', 'inverters', inverters, 'Power backup solutions for homes, shops and everyday business needs.'],
    ['Batteries', 'batteries', batteries, 'Batteries for power backup requirements. Contact us for suitable options.'],
] as const;

export const categories = categoryRows.map(([name, slug, image, description]) => ({ name, slug, image, description }));

export const distributionGroups = [
    {
        title: 'HARDWARE',
        items: ['Fasteners', 'Screws', 'Nuts & Bolts', 'Washers', 'Nails', 'Roofing Screws', 'Wall Plugs']
    },
    {
        title: 'CONSTRUCTION',
        items: ['Cement', 'Steel / TMT', 'Roofing Sheets', 'Building Materials']
    },
    {
        title: 'PLUMBING',
        items: ['Pipes', 'Fittings', 'Valves', 'Accessories', 'Sanitaryware']
    },
    {
        title: 'ELECTRICAL',
        items: ['Wires', 'Switches', 'MCBs', 'Electrical Accessories']
    },
    {
        title: 'POWER SOLUTIONS',
        items: ['Inverters', 'Batteries']
    }
];

export const distribution = [
    { name: 'Fasteners', items: ['Screws', 'Nuts & Bolts', 'Washers', 'Nails', 'Roofing Screws', 'Wall Plugs'] },
    { name: 'Hardware Products', items: ['Door Hardware', 'Furniture Fittings', 'Hinges', 'Tower Bolts', 'Locks', 'Handles'] },
    { name: 'Construction Products', items: ['Cement', 'Steel / TMT', 'Roofing Sheets'] },
    { name: 'Plumbing', items: ['Pipes', 'Fittings', 'Valves', 'Accessories'] },
    { name: 'Electrical', items: ['Wires', 'Switches', 'MCBs', 'Electrical Accessories'] },
    { name: 'Power Solutions', items: ['Inverters', 'Batteries'] },
];

export const customerSegments = [
    {
        title: 'CONTRACTORS',
        subtitle: 'Project Material Sourcing & Commercial Quotes',
        description: 'Dependable structural materials, scheduled site delivery, bulk rates and flexible billing support.'
    },
    {
        title: 'BUILDERS & DEVELOPERS',
        subtitle: 'High-Volume Coordinated Supply',
        description: 'Bulk steel, cement, electrical & plumbing sourcing directly aligned with your construction timelines.'
    },
    {
        title: 'RETAILERS',
        subtitle: 'Wholesale Hardware & Building Inventory',
        description: 'Competitive wholesale pricing, genuine brand sourcing and steady stock replenishment across Kerala.'
    },
    {
        title: 'ELECTRICIANS & PLUMBERS',
        subtitle: 'Professional Grade Tools & Supplies',
        description: 'Access to certified electrical wires, MCBs, CPVC/UPVC pipes and heavy-duty fittings for every job.'
    },
    {
        title: 'BUSINESSES & INSTITUTIONS',
        subtitle: 'Commercial Sourcing & Facility Maintenance',
        description: 'Dedicated commercial procurement for factory maintenance, office fit-outs and institutional supply.'
    },
    {
        title: 'HOMEOWNERS',
        subtitle: 'Guidance & Quality Materials for Homes',
        description: 'Honest technical advice, genuine products and transparent commercial pricing for home builders.'
    }
];

export const howItWorksSteps = [
    {
        number: '01',
        title: 'TELL US WHAT YOU NEED',
        description: 'Send your product specification, project list, or bulk requirement through our quote tool or WhatsApp.'
    },
    {
        number: '02',
        title: 'GET A COMMERCIAL QUOTE',
        description: 'Our experienced B2B team reviews availability and prepares competitive commercial pricing for you.'
    },
    {
        number: '03',
        title: 'CONFIRM SPECIFICATIONS',
        description: 'Confirm product brands, exact quantities, schedule, and commercial terms with our representative.'
    },
    {
        number: '04',
        title: 'WE ARRANGE SUPPLY',
        description: 'Products are sourced, quality checked, and prepared for quick loading from our distribution depot.'
    },
    {
        number: '05',
        title: 'DELIVERY OR COLLECTION',
        description: 'Coordinated logistics to your site or easy collection from our Athikkayam store opposite bus stand.'
    }
];

export const services = ['Dealer Supply', 'Bulk Orders', 'Retailer Support', 'Contractor Supply', 'Sales Support', 'Regular Delivery', 'Stock Availability'];

export interface BrandPartner {
    name: string;
    category: string;
    tag: string;
    brandColor: string;
    textColor: string;
    accentBg: string;
    logoSub?: string;
    logoUrl: string;
    alt: string;
    verified: boolean;
}

export const trustedBrands: BrandPartner[] = [
    {
        name: 'TATA TISCON',
        category: 'Steel / TMT Rebar',
        tag: 'Principal Brand',
        brandColor: '#0054A6',
        textColor: '#FFFFFF',
        accentBg: '#E31E24',
        logoSub: 'TATA STEEL',
        logoUrl: '/images/brands/tata-tiscon.svg',
        alt: 'Tata Tiscon Fe500D TMT Steel official logo',
        verified: true
    },
    {
        name: 'POLYCAB',
        category: 'Electrical Wires & Cables',
        tag: 'Direct Distribution',
        brandColor: '#E30613',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoSub: 'WIRES & CABLES',
        logoUrl: '/images/brands/polycab.svg',
        alt: 'Polycab Wires and Cables official logo',
        verified: true
    },
    {
        name: 'SUPREME',
        category: 'Pipes & Water Tanks',
        tag: 'Distribution Partner',
        brandColor: '#E31E24',
        textColor: '#FFFFFF',
        accentBg: '#0055A5',
        logoSub: 'PIPING SYSTEMS',
        logoUrl: '/images/brands/supreme.svg',
        alt: 'Supreme Piping Systems official logo',
        verified: true
    },
    {
        name: 'ASTRAL',
        category: 'Plumbing & CPVC Pipes',
        tag: 'Authorized Supply',
        brandColor: '#0055A5',
        textColor: '#FFFFFF',
        accentBg: '#E31E24',
        logoSub: 'PIPES & FITTINGS',
        logoUrl: '/images/brands/astral.svg',
        alt: 'Astral Pipes official logo',
        verified: true
    },
    {
        name: 'HAVELLS',
        category: 'Electrical & Switches',
        tag: 'Major Brand',
        brandColor: '#D32F2F',
        textColor: '#FFFFFF',
        accentBg: '#0F172A',
        logoSub: 'SWITCHGEAR',
        logoUrl: '/images/brands/havells.svg',
        alt: 'Havells Switchgear official logo',
        verified: true
    },
    {
        name: 'FINOLEX',
        category: 'Pipes & Cables',
        tag: 'Distribution Channel',
        brandColor: '#003B70',
        textColor: '#FFFFFF',
        accentBg: '#E31E24',
        logoSub: 'PIPES & FITTINGS',
        logoUrl: '/images/brands/finolex.svg',
        alt: 'Finolex Cables and Pipes official logo',
        verified: true
    },
    {
        name: 'ASIAN PAINTS',
        category: 'Paints & Coatings',
        tag: 'Coatings Partner',
        brandColor: '#662D91',
        textColor: '#FFFFFF',
        accentBg: '#F58220',
        logoSub: 'COLOURS & COATINGS',
        logoUrl: '/images/brands/asian-paints.svg',
        alt: 'Asian Paints official logo',
        verified: true
    },
    {
        name: 'ULTRATECH',
        category: 'Cement & Concrete',
        tag: 'Principal Supplier',
        brandColor: '#F58220',
        textColor: '#0F172A',
        accentBg: '#000000',
        logoSub: "THE ENGINEER’S CHOICE",
        logoUrl: '/images/brands/ultratech.svg',
        alt: 'UltraTech Cement official logo',
        verified: true
    },
    {
        name: 'V-GUARD',
        category: 'Inverters & Cables',
        tag: 'Major Partner',
        brandColor: '#D32F2F',
        textColor: '#FFFFFF',
        accentBg: '#F5A623',
        logoSub: 'POWER SOLUTIONS',
        logoUrl: '/images/brands/v-guard.svg',
        alt: 'V-Guard Power Solutions official logo',
        verified: true
    },
    {
        name: 'BOSCH',
        category: 'Power Tools',
        tag: 'Professional Tools',
        brandColor: '#E20015',
        textColor: '#FFFFFF',
        accentBg: '#005691',
        logoSub: 'POWER TOOLS',
        logoUrl: '/images/brands/bosch.svg',
        alt: 'Bosch Power Tools official logo',
        verified: true
    },
    {
        name: 'GODREJ',
        category: 'Locks & Security',
        tag: 'Hardware Partner',
        brandColor: '#E21836',
        textColor: '#FFFFFF',
        accentBg: '#000000',
        logoSub: 'LOCKS & HARDWARE',
        logoUrl: '/images/brands/godrej.svg',
        alt: 'Godrej Locks official logo',
        verified: true
    },
    {
        name: 'LEGRAND',
        category: 'Switches & Accessories',
        tag: 'Distribution Channel',
        brandColor: '#E30613',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/legrand.svg',
        alt: 'Legrand Electrical official logo',
        verified: true
    },
    {
        name: 'SCHNEIDER',
        category: 'MCBs & Switchgear',
        tag: 'Electrical Partner',
        brandColor: '#3DCD58',
        textColor: '#0F172A',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/schneider.svg',
        alt: 'Schneider Electric official logo',
        verified: true
    },
    {
        name: 'SIEMENS',
        category: 'Industrial Electrical',
        tag: 'Technology Partner',
        brandColor: '#009999',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/siemens.svg',
        alt: 'Siemens official logo',
        verified: true
    },
    {
        name: 'ABB',
        category: 'Circuit Breakers',
        tag: 'Authorized Dealer',
        brandColor: '#FF0000',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/abb.svg',
        alt: 'ABB official logo',
        verified: true
    },
    {
        name: 'ANCHOR',
        category: 'Switches & Accessories',
        tag: 'Distribution Partner',
        brandColor: '#CC0000',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/anchor.svg',
        alt: 'Anchor by Panasonic official logo',
        verified: true
    },
    {
        name: 'PHILIPS',
        category: 'LED Lighting',
        tag: 'Lighting Partner',
        brandColor: '#0047AB',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/philips.svg',
        alt: 'Philips Lighting official logo',
        verified: true
    },
    {
        name: 'ORIENT',
        category: 'Fans & LED Lights',
        tag: 'Distribution Channel',
        brandColor: '#E37222',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/orient.svg',
        alt: 'Orient Electric official logo',
        verified: true
    },
    {
        name: 'BAJAJ',
        category: 'Electricals & Fans',
        tag: 'Distribution Partner',
        brandColor: '#F97316',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/bajaj.svg',
        alt: 'Bajaj Electricals official logo',
        verified: true
    },
    {
        name: 'SYSKA',
        category: 'LED Lighting',
        tag: 'Lighting Partner',
        brandColor: '#00BFFF',
        textColor: '#0F172A',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/syska.svg',
        alt: 'Syska LED Lights official logo',
        verified: true
    },
    {
        name: 'LUMINOUS',
        category: 'Inverters & Batteries',
        tag: 'Power Partner',
        brandColor: '#00008B',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/luminous.svg',
        alt: 'Luminous Power Technologies official logo',
        verified: true
    },
    {
        name: 'MICROTEK',
        category: 'UPS & Inverters',
        tag: 'Power Distribution',
        brandColor: '#4B5563',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/microtek.svg',
        alt: 'Microtek Inverters official logo',
        verified: true
    },
    {
        name: 'EXIDE',
        category: 'Batteries',
        tag: 'Battery Distributor',
        brandColor: '#CC0000',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/exide.svg',
        alt: 'Exide Batteries official logo',
        verified: true
    },
    {
        name: 'AMARON',
        category: 'Batteries',
        tag: 'Battery Partner',
        brandColor: '#00AA00',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/amaron.svg',
        alt: 'Amaron Batteries official logo',
        verified: true
    },
    {
        name: 'HAFELE',
        category: 'Hardware & Fittings',
        tag: 'Hardware Partner',
        brandColor: '#003087',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/hafele.svg',
        alt: 'Hafele Hardware official logo',
        verified: true
    },
    {
        name: 'BERGER',
        category: 'Paints & Waterproofing',
        tag: 'Paint Distributor',
        brandColor: '#CC0000',
        textColor: '#FFFFFF',
        accentBg: '#1E293B',
        logoUrl: '/images/brands/berger.svg',
        alt: 'Berger Paints official logo',
        verified: true
    },
];

export const navigation = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Products', to: '/products' },
    { label: 'Hardware Distribution', to: '/hardware-distribution' },
    { label: 'Brands', to: '/brands' },
    { label: 'Services', to: '/services' },
    { label: 'Insights & Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
] as const;
