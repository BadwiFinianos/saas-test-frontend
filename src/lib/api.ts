import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface Dataset {
  id: string;
  name: string;
  description?: string;
  dataType: "2D" | "3D" | "NON_GEO";
  tags: string[];
  columnMapping: {
    longitude?: string;
    latitude?: string;
    altitude?: string;
  };
  columns?: Array<{ name: string; type: "decimal" | "string" }>;
  tableName: string;
  rowCount: number;
  boundingBox?: any;
  stats?: any;
  originalFilename?: string;
  fileSize?: number;
  owner_id: string;
  owner?: User;
  permission?: "VIEW" | "EDIT" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  projectType: "2D" | "3D";
  mapSettings?: any;
  owner_id: string;
  owner?: User;
  permission?: "VIEW" | "EDIT" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface ProjectLayer {
  id: string;
  project_id: string;
  dataset_id: string;
  layerOrder: number;
  visible: boolean;
  layerStyle?: {
    color: string;
    size: number;
    opacity: number;
  };
  addedAt: string;
  dataset?: Dataset;
}

export interface LayerData {
  layer: ProjectLayer;
  dataset: Dataset;
  measurements: any[];
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    return data as LoginResponse;
  },

  me: async () => {
    const { data } = await api.get("/api/auth/me");
    return data.user as User;
  },
};

// Dataset API
export const datasetApi = {
  list: async (filters?: {
    dataType?: string;
    tags?: string[];
    search?: string;
  }) => {
    const { data } = await api.get("/api/datasets", { params: filters });
    return data.datasets as Dataset[];
  },

  get: async (id: string) => {
    const { data } = await api.get(`/api/datasets/${id}`);
    return data as Dataset;
  },

  create: async (formData: FormData) => {
    const { data } = await api.post("/api/datasets", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data as Dataset;
  },

  update: async (
    id: string,
    updates: { name?: string; description?: string; tags?: string[] },
  ) => {
    const { data } = await api.put(`/api/datasets/${id}`, updates);
    return data as Dataset;
  },

  delete: async (id: string) => {
    await api.delete(`/api/datasets/${id}`);
  },

  getData: async (
    id: string,
    filters?: { bbox?: any; limit?: number; offset?: number },
  ) => {
    const { data } = await api.get(`/api/datasets/${id}/data`, {
      params: filters,
    });
    return data;
  },
};

// Project API
export const projectApi = {
  list: async (filters?: { projectType?: string }) => {
    const { data } = await api.get("/api/projects", { params: filters });
    return data.projects as Project[];
  },

  get: async (id: string) => {
    const { data } = await api.get(`/api/projects/${id}`);
    return data as Project;
  },

  create: async (project: {
    name: string;
    description?: string;
    projectType: "2D" | "3D";
    mapSettings?: any;
  }) => {
    const { data } = await api.post("/api/projects", project);
    return data as Project;
  },

  update: async (
    id: string,
    updates: { name?: string; description?: string; mapSettings?: any },
  ) => {
    const { data } = await api.put(`/api/projects/${id}`, updates);
    return data as Project;
  },

  delete: async (id: string) => {
    await api.delete(`/api/projects/${id}`);
  },

  // Layers management
  getLayers: async (projectId: string) => {
    const { data } = await api.get(`/api/projects/${projectId}/layers`);
    return data.layers as ProjectLayer[];
  },

  getCompatibleDatasets: async (projectId: string) => {
    const { data } = await api.get(
      `/api/projects/${projectId}/datasets/available`,
    );
    return data.datasets as Dataset[];
  },

  addLayer: async (projectId: string, datasetId: string, layerStyle?: any) => {
    const { data } = await api.post(`/api/projects/${projectId}/layers`, {
      datasetId,
      layerStyle,
    });
    return data as ProjectLayer;
  },

  updateLayer: async (
    projectId: string,
    layerId: string,
    updates: { visible?: boolean; layerStyle?: any },
  ) => {
    const { data } = await api.put(
      `/api/projects/${projectId}/layers/${layerId}`,
      updates,
    );
    return data as ProjectLayer;
  },

  removeLayer: async (projectId: string, layerId: string) => {
    await api.delete(`/api/projects/${projectId}/layers/${layerId}`);
  },

  reorderLayers: async (
    projectId: string,
    layerOrders: Array<{ layer_id: string; order: number }>,
  ) => {
    await api.put(`/api/projects/${projectId}/layers/reorder`, { layerOrders });
  },

  getLayerData: async (
    projectId: string,
    layerId: string,
    bbox?: any,
    limit?: number,
  ) => {
    const { data } = await api.get(
      `/api/projects/${projectId}/layers/${layerId}/data`,
      {
        params: {
          bbox: bbox ? JSON.stringify(bbox) : undefined,
          limit,
        },
      },
    );
    return data as LayerData;
  },
};
