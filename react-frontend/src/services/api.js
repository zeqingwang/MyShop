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
      if (params.category) {
        queryParams.append('category', params.category);
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
        'Category': 'category_asc',
        'Item No': 'id_asc'
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
      const url = `${API_BASE_URL}/products.php?category=${categoryId}`;
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

  // Cart API functions
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
      
      return data.success ? data.cart_items : [];
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  },

  async addToCart(userId, productId, quantity) {
    try {
      const url = `${API_BASE_URL}/cart.php`;
      console.log('Adding to cart:', { userId, productId, quantity });
      
      const response = await fetch(url, {
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
      
      return data.success;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  },

  async updateCartQuantity(cartId, quantity) {
    try {
      const url = `${API_BASE_URL}/cart.php`;
      console.log('Updating cart quantity:', { cartId, quantity });
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_id: cartId,
          quantity: quantity
        })
      });
      
      console.log('Update cart response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Update cart response:', data);
      
      return data.success;
    } catch (error) {
      console.error('Error updating cart:', error);
      return false;
    }
  },

  async removeFromCart(cartId) {
    try {
      const url = `${API_BASE_URL}/cart.php?cart_id=${cartId}`;
      console.log('Removing from cart:', cartId);
      
      const response = await fetch(url, {
        method: 'DELETE'
      });
      
      console.log('Remove from cart response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Remove from cart response:', data);
      
      return data.success;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  }
}; 