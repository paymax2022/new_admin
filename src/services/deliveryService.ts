import api from './api';

const BASE_PATH = '/api/v1/delivery';

export interface ApiResponse<T> {
  ok?: boolean;
  success?: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page?: number;
  limit?: number;
  total?: number;
  total_pages?: number;
}

// Order interfaces
export interface DeliveryOrder {
  id?: string;
  order_id?: string;
  rider_id?: string;
  restaurant_id?: string;
  customer_id?: string;
  status?: string;
  order_type?: string;
  pickup_address?: string;
  delivery_address?: string;
  delivery_fee?: number;
  total_amount?: number;
  payment_method?: string;
  payment_status?: string;
  created_at?: string;
  updated_at?: string;
  estimated_delivery_time?: string;
  actual_delivery_time?: string;
  // Additional fields
  [key: string]: any;
}

// Rider/Driver interfaces
export interface Rider {
  id?: string;
  rider_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: 'active' | 'inactive' | 'suspended' | 'pending';
  service_type?: string;
  rating?: number;
  total_trips?: number;
  vehicle_type?: string;
  vehicle_number?: string;
  availability_status?: string;
  created_at?: string;
  updated_at?: string;
  // Additional fields
  [key: string]: any;
}

// Pricing interfaces
export interface PricingParams {
  id?: string;
  base_fare?: number;
  per_km_rate?: number;
  per_minute_rate?: number;
  minimum_fare?: number;
  surge_multiplier?: number;
  service_fee?: number;
  [key: string]: any;
}

// Tracking interfaces
export interface TrackingData {
  order_id?: string;
  rider_id?: string;
  current_location?: {
    latitude?: number;
    longitude?: number;
  };
  status?: string;
  estimated_arrival?: string;
  [key: string]: any;
}

// Analytics interfaces
export interface DeliveryMetrics {
  total_orders?: number;
  completed_orders?: number;
  cancelled_orders?: number;
  average_delivery_time?: number;
  average_delivery_time_minutes?: number; // API returns this field name
  total_revenue?: number;
  active_riders?: number;
  customer_satisfaction?: number;
  orders_by_status?: Record<string, number>;
  orders_by_type?: Record<string, number>;
  hourly_distribution?: Record<string, number>;
  peak_hours?: string | null;
  geographic_data?: any;
  [key: string]: any;
}

const deliveryService = {
  // ==================== Orders ====================
  // Create order
  createOrder(data: Partial<DeliveryOrder>) {
    return api.post<ApiResponse<DeliveryOrder>>(`${BASE_PATH}/orders/order`, data);
  },

  // Get order by ID
  getOrderById(orderId: string) {
    return api.get<ApiResponse<DeliveryOrder>>(`${BASE_PATH}/orders/order/${orderId}`);
  },

  // Get all orders
  getAllOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
    restaurant_id?: string;
    rider_id?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.restaurant_id) queryParams.append('restaurant_id', params.restaurant_id);
    if (params?.rider_id) queryParams.append('rider_id', params.rider_id);
    
    const query = queryParams.toString();
    return api.get<ApiResponse<PaginatedResponse<DeliveryOrder>>>(`${BASE_PATH}/orders/orders${query ? `?${query}` : ''}`);
  },

  // Get orders by rider
  getRiderOrders(riderId: string, params?: { page?: number; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return api.get<ApiResponse<PaginatedResponse<DeliveryOrder>>>(`${BASE_PATH}/orders/rider/${riderId}/orders${query ? `?${query}` : ''}`);
  },

  // Update order
  updateOrder(orderId: string, data: Partial<DeliveryOrder>) {
    return api.put<ApiResponse<DeliveryOrder>>(`${BASE_PATH}/orders/order/${orderId}`, data);
  },

  // Delete order
  deleteOrder(orderId: string) {
    return api.delete<ApiResponse<void>>(`${BASE_PATH}/orders/order/${orderId}`);
  },

  // Update restaurant order status
  updateRestaurantOrderStatus(orderId: string, status: string) {
    return api.put<ApiResponse<DeliveryOrder>>(`${BASE_PATH}/restaurant-orders/${orderId}/status`, { status });
  },

  // Get restaurant orders
  getRestaurantOrders(restaurantId: string, params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return api.get<ApiResponse<PaginatedResponse<DeliveryOrder>>>(`${BASE_PATH}/restaurant-orders/restaurant/${restaurantId}${query ? `?${query}` : ''}`);
  },

  // ==================== Pricing ====================
  // Create pricing params
  createPricingParams(data: Partial<PricingParams>) {
    return api.post<ApiResponse<PricingParams>>(`${BASE_PATH}/order-pricing/pricing_params`, data);
  },

  // Update pricing params
  updatePricingParams(data: Partial<PricingParams>) {
    return api.put<ApiResponse<PricingParams>>(`${BASE_PATH}/order-pricing/pricing_params`, data);
  },

  // Get all pricing params
  getAllPricingParams() {
    return api.get<ApiResponse<PricingParams[]>>(`${BASE_PATH}/order-pricing/all_pricing_params`);
  },

  // ==================== Riders/Drivers ====================
  // Create rider
  createRider(data: Partial<Rider>) {
    return api.post<ApiResponse<Rider>>(`${BASE_PATH}/riders/rider`, data);
  },

  // Get rider (single)
  getRider(params?: { rider_id?: string; email?: string; phone?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.rider_id) queryParams.append('rider_id', params.rider_id);
    if (params?.email) queryParams.append('email', params.email);
    if (params?.phone) queryParams.append('phone', params.phone);
    
    const query = queryParams.toString();
    return api.get<ApiResponse<Rider>>(`${BASE_PATH}/riders/rider${query ? `?${query}` : ''}`);
  },

  // Get all riders
  getAllRiders(params?: {
    status?: string;
    service_type?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.service_type) queryParams.append('service_type', params.service_type);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return api.get<ApiResponse<PaginatedResponse<Rider>>>(`${BASE_PATH}/riders/riders${query ? `?${query}` : ''}`);
  },

  // Update rider
  updateRider(data: Partial<Rider>) {
    return api.put<ApiResponse<Rider>>(`${BASE_PATH}/riders/rider`, data);
  },

  // Check rider
  checkRider(params?: { email?: string; phone?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.email) queryParams.append('email', params.email);
    if (params?.phone) queryParams.append('phone', params.phone);
    
    const query = queryParams.toString();
    return api.get<ApiResponse<{ exists: boolean }>>(`${BASE_PATH}/riders/rider/check${query ? `?${query}` : ''}`);
  },

  // Update rider status
  updateRiderStatus(riderId: string, status: string) {
    return api.post<ApiResponse<Rider>>(`${BASE_PATH}/riders/rider/status`, { rider_id: riderId, status });
  },

  // Get available orders for rider
  getRiderAvailableOrders(riderId: string) {
    return api.get<ApiResponse<DeliveryOrder[]>>(`${BASE_PATH}/riders/rider/${riderId}/available-orders`);
  },

  // Rider checkin
  riderCheckin(riderId: string, data?: { location?: { lat?: number; lng?: number } }) {
    return api.post<ApiResponse<void>>(`${BASE_PATH}/riders/rider/checkin`, { rider_id: riderId, ...data });
  },

  // Rider pickup confirm
  riderPickupConfirm(orderId: string, riderId: string) {
    return api.post<ApiResponse<void>>(`${BASE_PATH}/riders/rider/pickup-confirm`, { order_id: orderId, rider_id: riderId });
  },

  // Update delivery status
  updateDeliveryStatus(orderId: string, riderId: string, status: string) {
    return api.put<ApiResponse<void>>(`${BASE_PATH}/riders/rider/delivery-status`, {
      order_id: orderId,
      rider_id: riderId,
      status
    });
  },

  // ==================== Rider Location ====================
  // Create/Update rider location
  updateRiderLocation(data: {
    rider_id: string;
    latitude: number;
    longitude: number;
    heading?: number;
    speed?: number;
  }) {
    return api.post<ApiResponse<void>>(`${BASE_PATH}/rider_location/rider`, data);
  },

  // Get rider location
  getRiderLocation(riderId?: string) {
    const queryParams = new URLSearchParams();
    if (riderId) queryParams.append('rider_id', riderId);
    
    const query = queryParams.toString();
    return api.get<ApiResponse<any>>(`${BASE_PATH}/rider_location/rider${query ? `?${query}` : ''}`);
  },

  // Get all rider locations
  getAllRiderLocations() {
    return api.get<ApiResponse<any[]>>(`${BASE_PATH}/rider_location/`);
  },

  // Delete rider location
  deleteRiderLocation(riderId: string) {
    return api.delete<ApiResponse<void>>(`${BASE_PATH}/rider_location/rider?rider_id=${riderId}`);
  },

  // ==================== Restaurants ====================
  // Assign rider to restaurant
  assignRiderToRestaurant(restaurantId: string, riderId: string) {
    return api.post<ApiResponse<void>>(`${BASE_PATH}/restaurants/restaurant/rider/${restaurantId}`, { rider_id: riderId });
  },

  // Get restaurant riders
  getRestaurantRiders(restaurantId: string) {
    return api.get<ApiResponse<Rider[]>>(`${BASE_PATH}/restaurants/restaurant/rider/${restaurantId}`);
  },

  // Remove rider from restaurant
  removeRiderFromRestaurant(restaurantId: string, riderId: string) {
    return api.delete<ApiResponse<void>>(`${BASE_PATH}/restaurants/restaurant/rider/${restaurantId}?rider_id=${riderId}`);
  },

  // Get available riders for restaurant
  getAvailableRidersForRestaurant(restaurantId: string) {
    return api.get<ApiResponse<Rider[]>>(`${BASE_PATH}/restaurants/restaurant/${restaurantId}/available-riders`);
  },

  // Get rider details
  getRiderDetails(riderId: string) {
    return api.get<ApiResponse<Rider>>(`${BASE_PATH}/restaurants/restaurant/rider-details/${riderId}`);
  },

  // Get restaurant dashboard
  getRestaurantDashboard(restaurantId: string) {
    return api.get<ApiResponse<any>>(`${BASE_PATH}/restaurants/restaurant/dashboard`);
  },

  // Update order preparation status
  updateOrderPreparationStatus(restaurantId: string, orderId: string, status: string) {
    return api.put<ApiResponse<void>>(`${BASE_PATH}/restaurants/restaurant/${restaurantId}/order/${orderId}/preparation-status`, { status });
  },

  // Get preparation queue
  getPreparationQueue(restaurantId: string) {
    return api.get<ApiResponse<DeliveryOrder[]>>(`${BASE_PATH}/restaurants/restaurant/${restaurantId}/preparation-queue`);
  },

  // Send customer update
  sendCustomerUpdate(restaurantId: string, orderId: string, message: string) {
    return api.post<ApiResponse<void>>(`${BASE_PATH}/restaurants/restaurant/${restaurantId}/order/${orderId}/customer-update`, { message });
  },

  // ==================== Offers ====================
  // Accept offer
  acceptOffer(orderId: string, offerId: string) {
    return api.post<ApiResponse<void>>(`${BASE_PATH}/offers/offer/order/${orderId}/accept`, { offer_id: offerId });
  },

  // Cancel offer
  cancelOffer(orderId: string, offerId: string) {
    return api.delete<ApiResponse<void>>(`${BASE_PATH}/offers/offer/${offerId}/order/${orderId}/cancel`);
  },

  // Update offer
  updateOffer(orderId: string, offerId: string, data: Partial<any>) {
    return api.put<ApiResponse<void>>(`${BASE_PATH}/offers/offer/${offerId}/order/${orderId}`, data);
  },

  // Get rider offers
  getRiderOffers(riderId?: string) {
    const queryParams = new URLSearchParams();
    if (riderId) queryParams.append('rider_id', riderId);
    
    const query = queryParams.toString();
    return api.get<ApiResponse<any[]>>(`${BASE_PATH}/offers/offer/riders${query ? `?${query}` : ''}`);
  },

  // Get completed rider offers
  getCompletedRiderOffers(riderId?: string) {
    const queryParams = new URLSearchParams();
    if (riderId) queryParams.append('rider_id', riderId);
    
    const query = queryParams.toString();
    return api.get<ApiResponse<any[]>>(`${BASE_PATH}/offers/offer/completed/riders${query ? `?${query}` : ''}`);
  },

  // Get rider earnings
  getRiderEarnings(date: string, riderId?: string) {
    const queryParams = new URLSearchParams();
    queryParams.append('date', date);
    if (riderId) queryParams.append('rider_id', riderId);
    
    const query = queryParams.toString();
    return api.get<ApiResponse<any>>(`${BASE_PATH}/offers/offer/earnings/${date}${riderId ? `?rider_id=${riderId}` : ''}`);
  },

  // ==================== Order Location ====================
  // Get order location
  getOrderLocation(customerId: string, orderId: string) {
    return api.get<ApiResponse<any>>(`${BASE_PATH}/order_location/customer/${customerId}/order_location/${orderId}`);
  },

  // Get customer orders locations
  getCustomerOrdersLocations(customerId: string) {
    return api.get<ApiResponse<any[]>>(`${BASE_PATH}/order_location/customer/${customerId}/orders_location`);
  },

  // Update order location
  updateOrderLocation(customerId: string, orderId: string, data: { latitude: number; longitude: number }) {
    return api.put<ApiResponse<void>>(`${BASE_PATH}/order_location/customer/${customerId}/order_location/${orderId}`, data);
  },

  // Delete order location
  deleteOrderLocation(customerId: string, orderId: string) {
    return api.delete<ApiResponse<void>>(`${BASE_PATH}/order_location/customer/${customerId}/order_location/${orderId}`);
  },

  // ==================== Tracking ====================
  // Get order tracking
  getOrderTracking(orderId: string) {
    return api.get<ApiResponse<TrackingData>>(`${BASE_PATH}/tracking/orders/${orderId}/tracking`);
  },

  // Get tracking history
  getTrackingHistory(orderId: string) {
    return api.get<ApiResponse<TrackingData[]>>(`${BASE_PATH}/tracking/orders/${orderId}/tracking/history`);
  },

  // Update rider location tracking
  updateRiderLocationTracking(data: {
    rider_id: string;
    latitude: number;
    longitude: number;
    heading?: number;
    speed?: number;
  }) {
    return api.put<ApiResponse<void>>(`${BASE_PATH}/tracking/riders/location/tracking`, data);
  },

  // Send communication
  sendCommunication(orderId: string, message: string, type?: string) {
    return api.post<ApiResponse<void>>(`${BASE_PATH}/tracking/orders/communication/send`, {
      order_id: orderId,
      message,
      type: type || 'notification'
    });
  },

  // Get communications
  getCommunications(orderId: string) {
    return api.get<ApiResponse<any[]>>(`${BASE_PATH}/tracking/orders/${orderId}/communications`);
  },

  // ==================== Analytics ====================
  // Get delivery metrics
  getDeliveryMetrics(params: {
    start_date: string;
    end_date: string;
    restaurant_id?: string;
    rider_id?: string;
  }) {
    const queryParams = new URLSearchParams();
    queryParams.append('start_date', params.start_date);
    queryParams.append('end_date', params.end_date);
    if (params.restaurant_id) queryParams.append('restaurant_id', params.restaurant_id);
    if (params.rider_id) queryParams.append('rider_id', params.rider_id);
    
    const query = queryParams.toString();
    return api.get<ApiResponse<DeliveryMetrics>>(`${BASE_PATH}/tracking/analytics/delivery-metrics?${query}`);
  },

  // Get rider performance
  getRiderPerformance(riderId: string, params: {
    start_date: string;
    end_date: string;
  }) {
    const queryParams = new URLSearchParams();
    queryParams.append('start_date', params.start_date);
    queryParams.append('end_date', params.end_date);
    
    const query = queryParams.toString();
    return api.get<ApiResponse<any>>(`${BASE_PATH}/tracking/analytics/riders/${riderId}/performance?${query}`);
  },

  // Get top performers
  getTopPerformers(params: {
    limit?: number;
    start_date: string;
    end_date: string;
  }) {
    const queryParams = new URLSearchParams();
    queryParams.append('start_date', params.start_date);
    queryParams.append('end_date', params.end_date);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return api.get<ApiResponse<Rider[]>>(`${BASE_PATH}/tracking/analytics/riders/top-performers?${query}`);
  },

  // Get system health
  getSystemHealth() {
    return api.get<ApiResponse<any>>(`${BASE_PATH}/tracking/monitoring/system-health`);
  },

  // ==================== Delivery Code ====================
  // Generate delivery code
  generateDeliveryCode(orderId: string) {
    return api.post<ApiResponse<{ code: string }>>(`${BASE_PATH}/orders/${orderId}/deliverycode`);
  },
};

export default deliveryService;

