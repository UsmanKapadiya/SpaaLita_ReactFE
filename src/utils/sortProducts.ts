export type SortOption = 'menu_order' | 'price' | 'price-desc' | 'popularity' | 'date';

interface Product {
    id?: number | string;
    price?: number | string;
    productId?: number;
}

export const sortProducts = <T extends Product>(products: T[], sortBy: SortOption): T[] => {
    const sortedData = [...products];

    switch (sortBy) {
        case 'price':
            return sortedData.sort((a, b) => Number(a.price) - Number(b.price));
        case 'price-desc':
            return sortedData.sort((a, b) => Number(b.price) - Number(a.price));
        case 'popularity':
            return sortedData.sort((a, b) => (b.productId || 0) - (a.productId || 0));
        case 'date':
            return sortedData.sort((a, b) => Number(b.id) - Number(a.id));
        case 'menu_order':
        default:
            return sortedData.sort((a, b) => Number(a.id) - Number(b.id));
    }
};
