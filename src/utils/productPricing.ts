interface PricedItem {
    price?: number | string;
    regular_price?: number | string;
    sale_price?: number | string;
}

/**
 * Prices of a product / gift card from the API.
 *
 * Imported WooCommerce products have an empty regular_price and carry their
 * price in `price`, so that is the fallback. `price` is what goes in the cart.
 */
export const getProductPricing = (item?: PricedItem | null) => {
    const regularPrice = Number(item?.regular_price) || Number(item?.price) || 0;
    const salePrice = Number(item?.sale_price) || 0;

    return {
        regularPrice,
        salePrice,
        price: salePrice > 0 ? salePrice : regularPrice,
    };
};
