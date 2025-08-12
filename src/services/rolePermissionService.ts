import api from './api';

export default {
  createRole(data: {
    name: string;
    description?: string;
    permissionIds: string[];
  }) {
    return api.post('/api/v1/admin/roles/create', data);
  },
  getRoles(params?: {
    page?: number;
    limit?: number;
    sort?: 'asc' | 'desc';
    search?: string;
  }) {
    return api.get('/api/v1/admin/roles', { params });
  },
  getPermissions(params?: {
    page?: number;
    limit?: number;
    sort?: 'asc' | 'desc';
    search?: string;
  }) {
    return api.get('/api/v1/admin/permissions', { params });
  },
  getRoleById(roleId: string) {
    return api.get(`/api/v1/admin/roles/${roleId}`);
  },
  getPermissionById(permissionId: string) {
    return api.get(`/api/v1/admin/permissions/${permissionId}`);
  },
  addPermissionToRole(data: {
    roleId: string;
    permissionIds: string[];
  }) {
    return api.put('/api/v1/admin/roles/add-permission', data);
  },
  editRole(data: {
    id: string;
    name?: string;
    description?: string;
  }) {
    return api.put('/api/v1/admin/roles/update', data);
  },
  deleteRole(data: {
    id: string;
    name: string;
    description: string;
  }) {
    return api.patch(`/api/v1/admin/roles/${data.id}`, {
      id: data.id,
      name: data.name,
      description: data.description
    });
  },
  getUsers(params?: {
    page?: number;
    limit?: number;
  }) {
    return api.get('/api/v1/admin/users', { params });
  },
}; 