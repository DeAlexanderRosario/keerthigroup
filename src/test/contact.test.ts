import { describe, expect, it } from 'vitest';
import { business } from '@/data/site';
import { enquiryLink } from '@/lib/analytics';
describe('Keerthi contact rules',()=>{
 it('uses the two supplied phone numbers',()=>{expect(business.phoneLinks).toEqual(['tel:+917907524465','tel:+919744342697']);});
 it('sends enquiries to the supplied primary phone on WhatsApp',()=>{const url=new URL(enquiryLink('Test Customer','9000000000','Hardware','20 bolts'));expect(url.pathname).toBe('/917907524465');expect(url.searchParams.get('text')).toContain('20 bolts');expect(url.searchParams.get('text')).toContain('Test Customer');});
 it('keeps the supplied tax registration number',()=>{expect(business.gstin).toBe('32AFOPA9652D1ZM');});
});