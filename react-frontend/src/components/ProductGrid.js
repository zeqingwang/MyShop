import React from 'react';

const ProductGrid = () => {
  const products = [
    {
      id: '1203002',
      name: 'Boba (Tapioca Ball) 2.5 mm 5 lb',
      weight: '5 lb / 6 / Case',
      brand: 'CHA-BON-BON',
      country: 'Taiwan',
      image: 'https://via.placeholder.com/200x200/FFFFFF/000000?text=Boba',
      hasPromotion: true
    },
    {
      id: '1203151',
      name: 'Non-Dairy Creamer 50 lb',
      weight: '50 lb / Bag',
      brand: 'CHA-BON-BON',
      country: 'USA',
      image: 'https://via.placeholder.com/200x200/FFFFFF/000000?text=Creamer',
      hasPromotion: false
    },
    {
      id: '2030339',
      name: 'Fructose 50 lb',
      weight: '50 lb / Pail',
      brand: 'CHA-BON-BON',
      country: 'USA',
      image: 'https://via.placeholder.com/200x200/FFFFFF/000000?text=Fructose',
      hasPromotion: false
    },
    {
      id: '1203003',
      name: 'Green Tea Powder 2 lb',
      weight: '2 lb / 12 / Case',
      brand: 'CHA-BON-BON',
      country: 'Japan',
      image: 'https://via.placeholder.com/200x200/FFFFFF/000000?text=Tea',
      hasPromotion: true
    },
    {
      id: '1203152',
      name: 'Coconut Milk Powder 25 lb',
      weight: '25 lb / Bag',
      brand: 'Other Brand 1',
      country: 'Thailand',
      image: 'https://via.placeholder.com/200x200/FFFFFF/000000?text=Coconut',
      hasPromotion: false
    },
    {
      id: '2030340',
      name: 'Vanilla Extract 1 gal',
      weight: '1 gal / Bottle',
      brand: 'Other Brand 2',
      country: 'USA',
      image: 'https://via.placeholder.com/200x200/FFFFFF/000000?text=Vanilla',
      hasPromotion: false
    }
  ];

  const getCountryFlag = (country) => {
    const flags = {
      'Taiwan': '🇹🇼',
      'USA': '🇺🇸',
      'Japan': '🇯🇵',
      'Thailand': '🇹🇭'
    };
    return flags[country] || '🏳️';
  };

  return (
    <main className="product-grid">
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <div className="product-id">#{product.id}</div>
              <div className="product-name">{product.name}</div>
              <div className="product-weight">{product.weight}</div>
              <div className="product-brand">
                {product.brand}
                {product.hasPromotion && (
                  <span className="promotion-badge">P</span>
                )}
              </div>
              <div className="product-country">
                <span className="country-flag">{getCountryFlag(product.country)}</span>
                <span className="country-name">{product.country}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductGrid; 