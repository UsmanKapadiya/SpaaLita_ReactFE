export type SortOption = 'menu_order' | 'price' | 'price-desc' | 'popularity' | 'date';

interface Product {
    id: number;
    price: number;
    productId?: number;
}

export const sortProducts = <T extends Product>(products: T[], sortBy: SortOption): T[] => {
    const sortedData = [...products];

    switch (sortBy) {
        case 'price':
            return sortedData.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sortedData.sort((a, b) => b.price - a.price);
        case 'popularity':
            return sortedData.sort((a, b) => (b.productId || 0) - (a.productId || 0));
        case 'date':
            return sortedData.sort((a, b) => b.id - a.id);
        case 'menu_order':
        default:
            return sortedData.sort((a, b) => a.id - b.id);
    }
};
