import api from './api';

export interface Restaurant {
    _id: string;
    name: string;
    user_id: string;
    restaurant_type: string;
    about: string;
    logo: string;
    cover_banner: string;
    category_id: string;
    address: string;
    accepting_orders: boolean;
    created_at: string;
    updated_at: string;
    // Add other properties as needed based on your API response
}

export interface RestaurantsResponse {
    data: Restaurant[];
    total?: number;
    limit?: number;
    page?: number;
}

export const restaurantService = {
    // Get all restaurants with pagination
    async getAllRestaurants(limit: number = 20, page: number = 1): Promise<any> {
        try {
            const response = await api.get(`/api/v1/restaurants/all?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error;
        }
    },

    // Get restaurant by ID
    async getRestaurantById(id: string): Promise<any> {
        try {
            const response = await api.get(`/api/v1/restaurants/find/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching restaurant:', error);
            throw error;
        }
    },

    // Create new restaurant
    async createRestaurant(restaurantData: Partial<Restaurant>): Promise<Restaurant> {
        try {
            const response = await api.post('/api/v1/restaurants/create', restaurantData);
            return response.data;
        } catch (error) {
            console.error('Error creating restaurant:', error);
            throw error;
        }
    },

    // Update restaurant
    async updateRestaurant(id: string, restaurantData: any): Promise<any> {
        try {
            const response = await api.put(`/api/v1/restaurants/update/${id}`, restaurantData);
            return response.data;
        } catch (error) {
            console.error('Error updating restaurant:', error);
            throw error;
        }
    },

    // Upload logo image
    async uploadRestaurantLogo(id: string, file: File): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await api.post(`/api/v1/restaurants/${id}/images/logo`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading restaurant logo:', error);
            throw error;
        }
    },

    // Upload cover banner image
    async uploadRestaurantCoverBanner(id: string, file: File): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await api.post(`/api/v1/restaurants/${id}/images/cover_banner`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading restaurant cover banner:', error);
            throw error;
        }
    },

    // Get restaurant menu items
    async getRestaurantMenus(id: string): Promise<any> {
        try {
            const response = await api.get(`/api/v1/restaurants/menus/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching restaurant menus:', error);
            throw error;
        }
    },

    // Get menu item by ID
    async getMenuById(id: string): Promise<any> {
        try {
            const response = await api.get(`/api/v1/menus/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching menu item:', error);
            throw error;
        }
    },

    // Update menu item
    async updateMenu(restaurantId: string, menuId: string, menuData: any): Promise<any> {
        try {
            const response = await api.put(`/api/v1/restaurants/${restaurantId}/menu/${menuId}`, menuData);
            return response.data;
        } catch (error) {
            console.error('Error updating menu item:', error);
            throw error;
        }
    },

    // Verify restaurant
    async verifyRestaurant(restaurantId: string, verificationData?: any): Promise<any> {
        try {
            const response = await api.post(`/api/v1/restaurants/${restaurantId}/verify`, verificationData || {});
            return response.data;
        } catch (error) {
            console.error('Error verifying restaurant:', error);
            throw error;
        }
    },

    // Get restaurant orders
    async getRestaurantOrders(restaurantId: string, page: number = 1, limit: number = 10): Promise<any> {
        try {
            const response = await api.get(`/api/v1/delivery/restaurant-orders/restaurant/${restaurantId}?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching restaurant orders:', error);
            throw error;
        }
    },

    // Delete menu item
    async deleteMenu(restaurantId: string, menuId: string): Promise<void> {
        try {
            await api.delete(`/api/v1/restaurants/${restaurantId}/menu/${menuId}`);
        } catch (error) {
            console.error('Error deleting menu item:', error);
            throw error;
        }
    },

    // Delete restaurant
    async deleteRestaurant(id: number): Promise<void> {
        try {
            await api.delete(`/api/v1/restaurants/${id}`);
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            throw error;
        }
    },
};
