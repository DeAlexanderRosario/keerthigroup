import { business } from '@/data/site';

const SITE_URL = 'https://keerthigroup.co.in';

export function getFullUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_URL}${cleanPath}`;
}

export interface SeoOptions {
    title: string;
    description: string;
    path: string;
    ogImage?: string;
    keywords?: string[];
    crumbs?: { name: string; path: string }[];
    article?: {
        publishedDate: string;
        updatedDate: string;
        authorName: string;
        category: string;
        tags?: string[];
    };
    faqs?: Array<{ question: string; answer: string }>;
}

export function pageHead(
    title: string,
    description: string,
    path: string,
    crumbs: { name: string; path: string }[] = [],
    options: Partial<SeoOptions> = {}
) {
    const fullUrl = getFullUrl(path);
    const defaultOgImage = `${SITE_URL}/og-keerthi.jpg`;
    const ogImage = options.ogImage || defaultOgImage;
    const keywords = options.keywords || [
        'hardware distributor Kerala',
        'hardware supplier Kerala',
        'building materials supplier Kerala',
        'hardware wholesale Kerala',
        'building materials wholesale Kerala',
        'hardware distribution Kerala',
        'electrical materials supplier Kerala',
        'plumbing materials supplier Kerala',
        'cement supplier Kerala',
        'steel TMT supplier Kerala',
        'hardware distributor Ernakulam',
        'building materials Pathanamthitta',
        'hardware supplier Kochi'
    ];

    const graphItems: any[] = [
        {
            '@type': 'WebPage',
            '@id': `${fullUrl}#webpage`,
            url: fullUrl,
            name: title,
            description,
            inLanguage: 'en-US',
            isPartOf: {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: business.name,
                description: business.heroSubheadline,
                publisher: { '@id': `${SITE_URL}/#organization` }
            }
        }
    ];

    // Organization & Local Business Schema
    if (path === '/') {
        graphItems.push(
            {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                name: business.name,
                alternateName: business.tradingName,
                url: SITE_URL,
                logo: `${SITE_URL}/logo.png`,
                email: business.email,
                telephone: business.phones[0],
                vatID: business.gstin,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Athikkayam Bus Stand Opposite, Near SBI Bank, Athikkayam',
                    addressLocality: 'Pathanamthitta',
                    addressRegion: 'Kerala',
                    postalCode: '689711',
                    addressCountry: 'IN'
                },
                sameAs: [
                    business.whatsapp
                ]
            },
            {
                '@type': 'HardwareStore',
                '@id': `${SITE_URL}/#localbusiness`,
                name: business.tradingName,
                description,
                telephone: business.phones[0],
                email: business.email,
                url: SITE_URL,
                priceRange: '₹₹',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Athikkayam Bus Stand Opposite, Near SBI Bank, Athikkayam',
                    addressLocality: 'Pathanamthitta',
                    addressRegion: 'Kerala',
                    postalCode: '689711',
                    addressCountry: 'IN'
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 9.3892,
                    longitude: 76.8431
                },
                openingHoursSpecification: [
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        opens: '08:30',
                        closes: '19:30'
                    }
                ]
            }
        );
    }

    // Breadcrumbs Schema
    if (crumbs.length > 0) {
        graphItems.push({
            '@type': 'BreadcrumbList',
            '@id': `${fullUrl}#breadcrumb`,
            itemListElement: crumbs.map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: c.name,
                item: getFullUrl(c.path)
            }))
        });
    }

    // Article / BlogPosting Schema
    if (options.article) {
        graphItems.push({
            '@type': 'BlogPosting',
            '@id': `${fullUrl}#article`,
            isPartOf: { '@id': `${fullUrl}#webpage` },
            headline: title,
            description,
            image: [ogImage],
            datePublished: options.article.publishedDate,
            dateModified: options.article.updatedDate,
            author: {
                '@type': 'Person',
                name: options.article.authorName
            },
            publisher: {
                '@type': 'Organization',
                name: business.name,
                logo: {
                    '@type': 'ImageObject',
                    url: `${SITE_URL}/logo.png`
                }
            },
            articleSection: options.article.category,
            keywords: options.article.tags?.join(', ')
        });
    }

    // FAQPage Schema if visible FAQs exist
    if (options.faqs && options.faqs.length > 0) {
        graphItems.push({
            '@type': 'FAQPage',
            '@id': `${fullUrl}#faq`,
            mainEntity: options.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer
                }
            }))
        });
    }

    return {
        meta: [
            { title },
            { name: 'description', content: description },
            { name: 'keywords', content: keywords.join(', ') },
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            { property: 'og:site_name', content: business.name },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:type', content: options.article ? 'article' : 'website' },
            { property: 'og:url', content: fullUrl },
            { property: 'og:image', content: ogImage },
            { property: 'og:locale', content: 'en_IN' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: ogImage },
            ...(options.article ? [
                { property: 'article:published_time', content: options.article.publishedDate },
                { property: 'article:modified_time', content: options.article.updatedDate },
                { property: 'article:section', content: options.article.category },
            ] : [])
        ],
        links: [
            { rel: 'canonical', href: fullUrl }
        ],
        scripts: [
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': graphItems
                })
            }
        ]
    };
}

export function productSchema(product: import('@/data/site').ProductRecord) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images,
        category: product.category,
        ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: business.tradingName
            }
        },
        additionalProperty: Object.entries(product.specifications).map(([name, value]) => ({
            '@type': 'PropertyValue',
            name,
            value
        })),
        ...product.schema
    };
}
