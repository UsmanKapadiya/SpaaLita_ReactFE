import { shopMockData } from '../mockData/shopMockData';
import { giftCardMockData } from '../mockData/giftCardMockData';

export type ProductSource = 'shop' | 'giftCard';

interface Product {
    slug: string;
    [key: string]: any;
}

interface ProductResult {
    product: Product | null;
    source: ProductSource | null;
}

export const getProductBySlug = (
    slug: string | undefined,
    sourceHint?: ProductSource
): ProductResult => {
    if (!slug) {
        return { product: null, source: null };
    }

    // If source is hinted, try that first
    if (sourceHint === 'shop') {
        const product = shopMockData.find((p: Product) => p.slug === slug);
        if (product) return { product, source: 'shop' };
    } else if (sourceHint === 'giftCard') {
        const product = giftCardMockData.find((p: Product) => p.slug === slug);
        if (product) return { product, source: 'giftCard' };
    }
    
    // Fallback: search in shop first, then gift cards
    let product = shopMockData.find((p: Product) => p.slug === slug);
    if (product) return { product, source: 'shop' };
    
    product = giftCardMockData.find((p: Product) => p.slug === slug);
    if (product) return { product, source: 'giftCard' };
    
    return { product: null, source: null };
};

export const getDataArrayBySource = (source: ProductSource | null): Product[] => {
    return source === 'shop' ? shopMockData : giftCardMockData;
};
