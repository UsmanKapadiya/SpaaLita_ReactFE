import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { ApiResponse } from '../../Services/api';
import type { CatalogCategory } from '../../Services/ProductRelatedServices';
import './CategorySidebar.css';

/** Query-string parameter holding the selected category id (?category=...) */
export const CATEGORY_PARAM = 'category';

/** Link to the current page filtered by a category, or unfiltered for null */
const categoryLink = (categoryId: string | null) => ({
    search: categoryId ? `?${new URLSearchParams({ [CATEGORY_PARAM]: categoryId })}` : '',
});

interface CategoryNodeProps {
    category: CatalogCategory;
    selectedId: string | null;
    collapsed: Set<string>;
    onToggle: (categoryId: string) => void;
    onSelect: () => void;
}

const CategoryNode: FC<CategoryNodeProps> = ({ category, selectedId, collapsed, onToggle, onSelect }) => {
    const hasChildren = category.children.length > 0;
    const isExpanded = !collapsed.has(category._id);
    const isActive = category._id === selectedId;

    return (
        <li className="catalog-categories__item">
            <div className="catalog-categories__row">
                <Link
                    to={categoryLink(category._id)}
                    className={`catalog-categories__link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={onSelect}
                >
                    {category.name}
                </Link>
                {hasChildren && (
                    <button
                        type="button"
                        className="catalog-categories__expand"
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? 'Hide' : 'Show'} ${category.name} sub-categories`}
                        onClick={() => onToggle(category._id)}
                    >
                        <KeyboardArrowDownIcon fontSize="small" />
                    </button>
                )}
            </div>

            {hasChildren && isExpanded && (
                <ul className="catalog-categories__children">
                    {category.children.map(child => (
                        <CategoryNode
                            key={child._id}
                            category={child}
                            selectedId={selectedId}
                            collapsed={collapsed}
                            onToggle={onToggle}
                            onSelect={onSelect}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

interface CategorySidebarProps {
    /** Loads the categories that contain items of this listing */
    fetchCategories: () => Promise<ApiResponse<CatalogCategory[]>>;
    /** Id of the selected category (from the URL), or null for all items */
    selectedId: string | null;
    /** Label of the entry that clears the filter, e.g. "All Products" */
    allLabel: string;
}

/**
 * "Categories" sidebar of the Shop and Gift Card pages. Only categories that
 * contain items are listed; selecting one sets ?category={id} on the page.
 */
const CategorySidebar: FC<CategorySidebarProps> = ({ fetchCategories, selectedId, allLabel }) => {
    const [categories, setCategories] = useState<CatalogCategory[]>([]);
    const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
    // Small screens show the list on demand, above the products
    const [isOpenOnMobile, setIsOpenOnMobile] = useState(false);

    useEffect(() => {
        let ignore = false;

        fetchCategories()
            .then(response => {
                if (!ignore && response?.success && Array.isArray(response.data)) {
                    setCategories(response.data);
                }
            })
            .catch(error => console.error('Failed to load categories:', error));

        return () => {
            ignore = true;
        };
    }, [fetchCategories]);

    const toggleCategory = (categoryId: string) => {
        setCollapsed(previous => {
            const next = new Set(previous);
            if (next.has(categoryId)) {
                next.delete(categoryId);
            } else {
                next.add(categoryId);
            }
            return next;
        });
    };

    const closeOnMobile = () => setIsOpenOnMobile(false);

    if (categories.length === 0) return null;

    return (
        <div className="berocket_single_filter_widget catalog-categories">
            <div className="bapf_head">
                <h3>
                    Categories
                    <button
                        type="button"
                        className="catalog-categories__toggle"
                        aria-expanded={isOpenOnMobile}
                        aria-controls="catalog-categories-list"
                        aria-label={isOpenOnMobile ? 'Hide categories' : 'Show categories'}
                        onClick={() => setIsOpenOnMobile(open => !open)}
                    >
                        <KeyboardArrowDownIcon />
                    </button>
                </h3>
            </div>

            <div
                id="catalog-categories-list"
                className={`bapf_body catalog-categories__body${isOpenOnMobile ? ' is-open' : ''}`}
            >
                <ul className="catalog-categories__list">
                    <li className="catalog-categories__item">
                        <div className="catalog-categories__row">
                            <Link
                                to={categoryLink(null)}
                                className={`catalog-categories__link${selectedId === null ? ' is-active' : ''}`}
                                aria-current={selectedId === null ? 'page' : undefined}
                                onClick={closeOnMobile}
                            >
                                {allLabel}
                            </Link>
                        </div>
                    </li>
                    {categories.map(category => (
                        <CategoryNode
                            key={category._id}
                            category={category}
                            selectedId={selectedId}
                            collapsed={collapsed}
                            onToggle={toggleCategory}
                            onSelect={closeOnMobile}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategorySidebar;
