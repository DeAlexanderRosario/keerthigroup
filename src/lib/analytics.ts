export function trackEvent(event: string, details: Record<string, string> = {}) {
    if (typeof window === 'undefined') return;
    const target = window as Window & { dataLayer?: unknown[] };
    target.dataLayer ??= [];
    target.dataLayer.push({ event, ...details });
}
export function enquiryLink(name: string, phone: string, interest: string, message: string) {
    const text = `Hello Birla K Abraham (Keerthi Agencies),\nName: ${name}\nPhone: ${phone}\nInterested in: ${interest}\n${message}`;
    return `https://wa.me/917907524465?text=${encodeURIComponent(text)}`;
}

