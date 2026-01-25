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
            // Handle nested response structure: data.data.data contains the restaurants array
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

    // Create menu item
    async createMenu(restaurantId: string, menuData: FormData): Promise<any> {
        try {
            const response = await api.post(`/api/v1/restaurants/${restaurantId}/menu`, menuData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating menu item:', error);
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

    // Get all menus
    async getAllMenus(): Promise<any> {
        try {
            const response = await api.get('/api/v1/menus');
            // Response structure: { data: [...], message: string, ok: boolean }
            return response.data;
        } catch (error) {
            console.error('Error fetching menus:', error);
            throw error;
        }
    },

    // Get menu item by ID
    async getMenuById(menuId: string): Promise<any> {
        try {
            const response = await api.get(`/api/v1/menus/${menuId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching menu item:', error);
            throw error;
        }
    },

    // Update menu item
    async updateMenu(restaurantId: string, menuId: string, menuData: FormData | any): Promise<any> {
        try {
            const config = menuData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
            const response = await api.put(`/api/v1/restaurants/${restaurantId}/menu/${menuId}`, menuData, config);
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

    // Get restaurant orders with optional filters
    async getRestaurantOrders(
        restaurantId: string,
        page: number = 1,
        limit: number = 10,
        filters?: {
            status?: string;
            from_date?: string;
            to_date?: string;
        }
    ): Promise<any> {
        try {
            let url = `/api/v1/delivery/restaurant-orders/restaurant/${restaurantId}?page=${page}&limit=${limit}`;
            
            if (filters) {
                if (filters.status) {
                    url += `&status=${filters.status}`;
                }
                if (filters.from_date) {
                    url += `&from_date=${filters.from_date}`;
                }
                if (filters.to_date) {
                    url += `&to_date=${filters.to_date}`;
                }
            }
            
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching restaurant orders:', error);
            throw error;
        }
    },

    // Get all restaurant IDs from delivery API
    async getAllDeliveryRestaurantIds(): Promise<string[]> {
        try {
            const response = await api.get('/api/v1/delivery/restaurants/restaurants');
            // Handle different response structures
            const restaurants = response.data?.data || response.data || [];
            if (Array.isArray(restaurants)) {
                return restaurants.map((r: any) => r._id || r.id || r.restaurant_id).filter(Boolean);
            }
            return [];
        } catch (error) {
            console.error('Error fetching delivery restaurant IDs:', error);
            throw error;
        }
    },

    // Get all restaurants from delivery API with full details
    async getAllDeliveryRestaurants(): Promise<any[]> {
        try {
            const response = await api.get('/api/v1/delivery/restaurants/restaurants');
            // Handle different response structures
            const restaurants = response.data?.data || response.data || [];
            if (Array.isArray(restaurants)) {
                return restaurants;
            }
            return [];
        } catch (error) {
            console.error('Error fetching delivery restaurants:', error);
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

    // Create cuisine for a restaurant
    async createCuisine(restaurantId: string, cuisineData: FormData | { name: string }): Promise<any> {
        try {
            if (cuisineData instanceof FormData) {
                const response = await api.post(`/api/v1/restaurants/${restaurantId}/cuisines`, cuisineData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                return response.data;
            } else {
                // Send as JSON
                const response = await api.post(`/api/v1/restaurants/${restaurantId}/cuisines`, cuisineData);
                return response.data;
            }
        } catch (error) {
            console.error('Error creating cuisine:', error);
            throw error;
        }
    },

    // Update cuisine
    async updateCuisine(cuisineId: string, cuisineData: FormData | { name: string }): Promise<any> {
        try {
            if (cuisineData instanceof FormData) {
                const response = await api.put(`/api/v1/restaurants/cuisines/${cuisineId}`, cuisineData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                return response.data;
            } else {
                // Send as JSON
                const response = await api.put(`/api/v1/restaurants/cuisines/${cuisineId}`, cuisineData);
                return response.data;
            }
        } catch (error) {
            console.error('Error updating cuisine:', error);
            throw error;
        }
    },

    // Get cuisine by ID
    async getCuisineById(cuisineId: string): Promise<any> {
        try {
            const response = await api.get(`/api/v1/restaurants/cuisines/${cuisineId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cuisine:', error);
            throw error;
        }
    },

    // Update restaurant working hours
    async updateWorkingHours(restaurantId: string, workingHoursData: any): Promise<any> {
        try {
            const response = await api.put(`/api/v1/restaurants/${restaurantId}/working-hours`, workingHoursData);
            return response.data;
        } catch (error) {
            console.error('Error updating working hours:', error);
            throw error;
        }
    },

    // Get restaurant ratings
    async getRestaurantRatings(restaurantId: string, limit: number = 20, offset: number = 0): Promise<any> {
        try {
            const response = await api.get(`/api/v1/restaurants/${restaurantId}/ratings?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching restaurant ratings:', error);
            throw error;
        }
    },

    // Get riders with optional status and limit filters
    async getRiders(status?: string, limit?: number): Promise<any> {
        try {
            let url = '/api/v1/delivery/riders/riders';
            const params: string[] = [];
            
            if (status) {
                params.push(`status=${status}`);
            }
            if (limit) {
                params.push(`limit=${limit}`);
            }
            
            if (params.length > 0) {
                url += `?${params.join('&')}`;
            }
            
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching riders:', error);
            throw error;
        }
    },

    // Update rider status
    async updateRiderStatus(riderId: string, status: string): Promise<any> {
        try {
            // Map status to API format
            const apiStatus = status.toLowerCase();
            const response = await api.put(`/api/v1/delivery/riders/rider/${riderId}/status`, {
                status: apiStatus
            });
            return response.data;
        } catch (error) {
            console.error('Error updating rider status:', error);
            throw error;
        }
    },

    // Get delivery analytics (general metrics)
    async getDeliveryAnalytics(): Promise<any> {
        try {
            const response = await api.get('/api/v1/delivery/tracking/analytics');
            return response.data;
        } catch (error) {
            console.error('Error fetching delivery analytics:', error);
            throw error;
        }
    },

    // Get rider performance metrics
    async getRiderPerformance(riderId: string, startDate: string, endDate: string): Promise<any> {
        try {
            const response = await api.get(`/api/v1/delivery/tracking/analytics/riders/${riderId}/performance`, {
                params: {
                    start_date: startDate,
                    end_date: endDate
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching rider performance:', error);
            throw error;
        }
    },

    // Get top cuisines
    async getTopCuisines(limit: number = 50): Promise<any> {
        try {
            const response = await api.get(`/api/v1/restaurants/top-cuisines?limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching top cuisines:', error);
            throw error;
        }
    },
};
