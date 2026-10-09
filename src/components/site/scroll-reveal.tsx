import { useEffect, useRef, type ReactNode } from 'react';

type RevealVariant = 'up' | 'left' | 'right' | 'scale';

interface RevealProps {
    children: ReactNode;
    className?: string;
    variant?: RevealVariant;
    delay?: number;
    stagger?: boolean;
    threshold?: number;
}

const variantClass: Record<RevealVariant, string> = {
    up: 'reveal-hidden',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
};

/**
 * Scroll-triggered reveal using CSS classes (.reveal-hidden / .is-visible).
 * Respects prefers-reduced-motion automatically via CSS media query.
 */
export function Reveal({
    children,
    className = '',
    variant = 'up',
    delay = 0,
    stagger = false,
    threshold = 0.12,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Immediately visible for reduced-motion users — CSS handles that
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLElement).classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin: '0px 0px -30px 0px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={`${variantClass[variant]} ${stagger ? 'stagger' : ''} ${className}`}
        >
            {children}
        </div>
    );
}

/**
 * A lightweight wrapper that stagger-reveals its direct children.
 * Each child gets an incrementally-delayed reveal-hidden class.
 */
export function StaggerReveal({
    children,
    className = '',
    variant = 'up',
}: {
    children: ReactNode;
    className?: string;
    variant?: RevealVariant;
}) {
    return (
        <Reveal variant={variant} stagger className={className}>
            {children}
        </Reveal>
    );
}

/**
 * Animated, count-up number using IntersectionObserver + rAF.
 * Respects prefers-reduced-motion.
 */
export function AnimatedCounter({
    target,
    duration = 1800,
    suffix = '',
    className = '',
}: {
    target: number;
    duration?: number;
    suffix?: string;
    className?: string;
}) {
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const span = spanRef.current;
        if (!span) return;

        // Skip animation for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            span.textContent = target.toLocaleString() + suffix;
            span.classList.add('stat-value-animated');
            return;
        }

        let raf: number;
        let startTime: number;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.unobserve(entry.target);

                const step = (ts: number) => {
                    if (!startTime) startTime = ts;
                    const progress = Math.min((ts - startTime) / duration, 1);
                    // Ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    span.textContent = current.toLocaleString() + suffix;

                    if (progress < 1) {
                        raf = requestAnimationFrame(step);
                    } else {
                        span.textContent = target.toLocaleString() + suffix;
                        span.classList.add('stat-value-animated');
                    }
                };

                raf = requestAnimationFrame(step);
            },
            { threshold: 0.3 }
        );

        span.textContent = '0' + suffix;
        observer.observe(span);

        return () => {
            observer.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, [target, suffix, duration]);

    return (
        <span ref={spanRef} className={`tabular-nums ${className}`}>
            0{suffix}
        </span>
    );
}
