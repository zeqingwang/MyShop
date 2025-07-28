const API_BASE_URL = 'http://localhost/php-backend/api';

export const apiService = {
  async getProducts(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.id) {
        queryParams.append('id', params.id);
      }
      if (params.sort) {
        queryParams.append('sort', params.sort);
      }
      if (params.category_id) {
        queryParams.append('category_id', params.category_id);
      }
      if (params.search) {
        queryParams.append('search', params.search);
      }

      const url = `${API_BASE_URL}/products.php${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      console.log('Fetching products from:', url);
      
      const response = await fetch(url);
      console.log('Products response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Products data received:', data);
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async getCategories() {
    try {
      const url = `${API_BASE_URL}/categories.php`;
      console.log('Fetching categories from:', url);
      
      const response = await fetch(url);
      console.log('Categories response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Categories data received:', data);
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  async searchProducts(searchTerm) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('search', searchTerm);
      
      const url = `${API_BASE_URL}/products.php?${queryParams.toString()}`;
      console.log('Searching products from:', url);
      
      const response = await fetch(url);
      console.log('Search response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Search results:', data);
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  async getProductsSorted(sortType) {
    try {
      const sortMap = {
        'Recommend': 'name_asc',
        'Name A-Z': 'name_asc',
        'Name Z-A': 'name_desc',
        'Item No': 'id'
      };
      
      const sortValue = sortMap[sortType] || 'name_asc';
      const url = `${API_BASE_URL}/products.php?sort=${sortValue}`;
      console.log('Fetching sorted products from:', url);
      
      const response = await fetch(url);
      console.log('Sorted products response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Sorted products data received:', data);
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching sorted products:', error);
      return [];
    }
  },

  async getProductsByCategory(categoryId) {
    try {
      const url = `${API_BASE_URL}/products.php?category_id=${categoryId}`;
      console.log('Fetching products by category from:', url);
      
      const response = await fetch(url);
      console.log('Category products response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Category products data received:', data);
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  async getProductsWithFilters(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category_id) {
        queryParams.append('category_id', filters.category_id);
      }
      if (filters.sort) {
        // Map frontend sort options to backend sort values
        const sortMap = {
          'Recommend': 'name_asc',
          'Name A-Z': 'name_asc',
          'Name Z-A': 'name_desc',
          'Item No': 'id'
        };
        const sortValue = sortMap[filters.sort] || 'name_asc';
        queryParams.append('sort', sortValue);
      }
      if (filters.search) {
        queryParams.append('search', filters.search);
      }
      if (filters.id) {
        queryParams.append('id', filters.id);
      }

      const url = `${API_BASE_URL}/products.php${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      console.log('Fetching products with filters from:', url);
      
      const response = await fetch(url);
      console.log('Filtered products response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Filtered products data received:', data);
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching products with filters:', error);
      return [];
    }
  },

  // Cart API functions - working with existing backend
  async getCartItems(userId) {
    try {
      const url = `${API_BASE_URL}/cart.php?user_id=${userId}`;
      console.log('Fetching cart items from:', url);
      
      const response = await fetch(url);
      console.log('Cart response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Cart data received:', data);
      
      // Transform the data to match frontend expectations
      return Array.isArray(data) ? data.map(item => ({
        id: item.product_id, // Use product_id as the cart item ID
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.total,
        image_url: null // Add placeholder for image
      })) : [];
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  },

  async addToCart(userId, productId, quantity) {
    try {
      console.log('Adding to cart (database):', { userId, productId, quantity });
      
      const response = await fetch(`${API_BASE_URL}/add_to_cart.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity: quantity
        })
      });
      
      console.log('Add to cart response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Add to cart response:', data);
      
      if (data.message === 'Product added to cart') {
        console.log('Product added to cart successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  },

  async updateCartQuantity(cartId, newQuantity) {
    try {
      console.log('Updating cart quantity (localStorage):', { cartId, newQuantity });
      
      // For now, we'll use localStorage
      // This is a temporary solution until backend endpoints are ready
      const userId = JSON.parse(localStorage.getItem('user'))?.id;
      if (!userId) return false;
      
      const cartKey = `cart_${userId}`;
      const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      
      const item = existingCart.find(item => item.product_id === cartId);
      if (item) {
        item.quantity = newQuantity;
        item.total = item.price * newQuantity;
        localStorage.setItem(cartKey, JSON.stringify(existingCart));
        console.log('Cart quantity updated in localStorage');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      return false;
    }
  },

  async removeFromCart(cartId) {
    try {
      console.log('Removing from cart (localStorage):', cartId);
      
      // For now, we'll use localStorage
      // This is a temporary solution until backend endpoints are ready
      const userId = JSON.parse(localStorage.getItem('user'))?.id;
      if (!userId) return false;
      
      const cartKey = `cart_${userId}`;
      const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      
      const updatedCart = existingCart.filter(item => item.product_id !== cartId);
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      console.log('Item removed from cart in localStorage');
      
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  }
}; 