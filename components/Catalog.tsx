import React, { useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';
import { SkeletonImage } from './Skeleton';

interface CatalogProps {
  onProductClick: (id: string) => void;
}

const ALL_TAGS = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.tags))
).sort();

type SortOption = 'default' | 'price-asc' | 'price-desc';

export const Catalog: React.FC<CatalogProps> = ({ onProductClick }) => {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortOption>('default');

  const filteredAndSorted = useMemo(() => {
    let list = PRODUCTS.filter((product) => {
      const matchSearch =
        !search.trim() ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.longDescription.toLowerCase().includes(search.toLowerCase()) ||
        product.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchTags =
        selectedTags.size === 0 ||
        product.tags.some((t) => selectedTags.has(t));
      return matchSearch && matchTags;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [search, selectedTags, sort]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  return (
    <div className="bg-brand-50 min-h-screen pt-32 pb-20 animate-fadeIn">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            The Complete Archive
          </span>
          <h1 className="text-6xl md:text-7xl text-brand-950 font-serif mb-8">The Harvest</h1>
          <p className="text-brand-800 font-light leading-relaxed">
            Every bar is a condensed story of the vineyard. Cured for 6 weeks in linen to ensure a harder, longer-lasting soap with a richer lather.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, description, or tag…"
              className="w-full bg-brand-100 border border-brand-200 py-3 pl-12 pr-4 text-brand-900 placeholder-brand-500 focus:outline-none focus:border-brand-500 font-light transition-colors"
              aria-label="Search products"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-brand-500 flex items-center gap-2">
              <SlidersHorizontal size={14} aria-hidden />
              Filter by tag
            </span>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors ${
                  selectedTags.has(tag)
                    ? 'bg-brand-950 text-brand-50 border-brand-950'
                    : 'bg-brand-50 text-brand-800 border-brand-300 hover:border-brand-500'
                }`}
                aria-pressed={selectedTags.has(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="catalog-sort" className="text-xs uppercase tracking-widest text-brand-500">
              Sort
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-brand-100 border border-brand-200 py-2 px-4 text-brand-900 text-sm font-light focus:outline-none focus:border-brand-500"
              aria-label="Sort products"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-serif text-brand-950 mb-2">No products match</p>
            <p className="text-brand-600 font-light mb-6">Try a different search or clear filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedTags(new Set());
                setSort('default');
              }}
              className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs border-b border-brand-600 pb-1 hover:text-brand-950 transition-colors"
            >
              Clear all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredAndSorted.map((product) => (
              <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onProductClick: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onProductClick(product.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onProductClick(product.id);
        }
      }}
      aria-label={`View ${product.name}, $${product.price}`}
    >
      <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-brand-100 border border-brand-200">
        {!imageLoaded && <SkeletonImage className="absolute inset-0 w-full h-full" aspectRatio="aspect-[4/5]" />}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[10%] group-hover:grayscale-0"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="bg-brand-50/90 backdrop-blur text-brand-950 text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border border-brand-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute inset-0 bg-brand-950/0 group-hover:bg-brand-950/5 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <span className="w-full bg-brand-50 text-brand-950 py-3 uppercase tracking-widest text-xs font-bold border border-brand-200 hover:bg-brand-950 hover:text-brand-50 transition-colors inline-flex items-center justify-center gap-2">
            View Artifact <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-2xl text-brand-950 font-serif mb-1 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-brand-500 uppercase tracking-widest mb-2">
          {product.scentProfile.top} + {product.scentProfile.heart}
        </p>
        <span className="text-lg font-sans text-brand-900 font-light">${product.price}</span>
      </div>
    </div>
  );
};
