const API_BASE_URL = 'http://localhost/php-backend/api';

export const apiService = {
  // Get all products with filters
  async getProducts(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.sort) {
      queryParams.append('sort', params.sort);
    }
    if (params.category_id) {
      queryParams.append('category_id', params.category_id);
    }
    if (params.search) {
      queryParams.append('search', params.search);
    }
    if (params.id) {
      queryParams.append('id', params.id);
    }

    const url = `${API_BASE_URL}/products.php?${queryParams.toString()}`;
    console.log('Fetching products from:', url);
    
    try {
      const response = await fetch(url);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Products data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', error.message);
      return [];
    }
  },

  // Get all categories
  async getCategories() {
    const url = `${API_BASE_URL}/categories.php`;
    console.log('Fetching categories from:', url);
    
    try {
      const response = await fetch(url);
      console.log('Categories response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Categories data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      console.error('Error details:', error.message);
      return [];
    }
  },

  // Search products by name
  async searchProducts(searchTerm) {
    return this.getProducts({ search: searchTerm });
  },

  // Get products by category
  async getProductsByCategory(categoryId) {
    return this.getProducts({ category_id: categoryId });
  },

  // Get products sorted by name
  async getProductsSorted(sortType) {
    let sortParam = 'id'; // default
    
    switch (sortType) {
      case 'Name A-Z':
        sortParam = 'name_asc';
        break;
      case 'Name Z-A':
        sortParam = 'name_desc';
        break;
      case 'Category':
        sortParam = 'category_id';
        break;
      case 'Item No':
        sortParam = 'id';
        break;
      default:
        sortParam = 'id';
    }
    
    return this.getProducts({ sort: sortParam });
  }
}; 