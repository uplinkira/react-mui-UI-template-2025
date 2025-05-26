export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  city: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  products: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
} 