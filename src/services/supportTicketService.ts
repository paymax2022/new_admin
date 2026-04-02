import api from './api';

export default {
  // Get all support tickets
  getTickets(params?: {
    page?: number;
    limit?: number;
    countPerPage?: number;
    status?: string;
    category?: string;
    priority?: string;
  }) {
    const cleanParams: any = {};
    if (params?.page !== undefined) cleanParams.page = params.page;
    if (params?.limit !== undefined) {
      cleanParams.limit = params.limit;
    } else if (params?.countPerPage !== undefined) {
      cleanParams.limit = params.countPerPage;
    }
    if (params?.status !== undefined) cleanParams.status = params.status;
    if (params?.category !== undefined) cleanParams.category = params.category;
    if (params?.priority !== undefined) cleanParams.priority = params.priority;
    
    return api.get('/api/v1/admin/tickets', { params: cleanParams });
  },
  
  // Get ticket by ID
  getTicketById(id: string) {
    return api.get(`/api/v1/admin/tickets/${id}`);
  },
  
  // Update ticket (assign, update status, priority, etc.)
  updateTicket(data: {
    id: string;
    assigned_to?: string;
    status?: 'open' | 'in progress' | 'resolved';
    priority?: 'high' | 'medium' | 'low';
    notes?: string;
  }) {
    return api.put('/api/v1/admin/tickets/update', data);
  },
  
  // Update ticket status (legacy method, kept for backward compatibility)
  updateTicketStatus(id: string, status: string) {
    return api.put('/api/v1/admin/tickets/update', { 
      id, 
      status: status.toLowerCase() as 'open' | 'in progress' | 'resolved' 
    });
  },
  
  // Assign ticket to agent (legacy method, kept for backward compatibility)
  assignTicket(id: string, agentId: string) {
    return api.put('/api/v1/admin/tickets/update', { 
      id, 
      assigned_to: agentId 
    });
  },
};
