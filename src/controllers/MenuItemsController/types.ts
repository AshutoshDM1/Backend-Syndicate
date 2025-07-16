import { ModifierType } from '../../../prisma/generated/prisma';

// ============ CATEGORY TYPES ============
export interface CreateCategoryRequest {
  name: string;
  description?: string;
  sortOrder?: number;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface CategoryResponse {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  itemCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============ MODIFIER TYPES ============
export interface CreateModifierRequest {
  name: string;
  price: number;
  type: ModifierType;
  description?: string;
}

export interface UpdateModifierRequest {
  name?: string;
  price?: number;
  type?: ModifierType;
  description?: string;
  isAvailable?: boolean;
}

export interface ModifierResponse {
  id: string;
  name: string;
  price: number;
  type: ModifierType;
  description?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============ MENU ITEM TYPES ============
export interface CreateMenuItemRequest {
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: string;
  prepTime?: number;
  calories?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  sortOrder?: number;
  modifierIds?: string[];
}

export interface UpdateMenuItemRequest {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryId?: string;
  isAvailable?: boolean;
  rating?: number;
  prepTime?: number;
  calories?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  sortOrder?: number;
  modifierIds?: string[];
}

export interface MenuItemResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: string;
  isAvailable: boolean;
  rating: number;
  prepTime?: number;
  calories?: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
  };
  modifiers: ModifierResponse[];
}

export interface GetMenuItemsQuery {
  page?: string;
  limit?: string;
  categoryId?: string;
  search?: string;
  isAvailable?: string;
  isVegetarian?: string;
  isVegan?: string;
  isGlutenFree?: string;
  isSpicy?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt' | 'sortOrder';
  sortOrder?: 'asc' | 'desc';
}

export interface MenuItemsListResponse {
  menuItems: MenuItemResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  filters: {
    categoryId?: string;
    search?: string;
    isAvailable?: boolean;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
    isSpicy?: boolean;
    minPrice?: number;
    maxPrice?: number;
  };
}

// ============ COMBO MEAL TYPES ============
export interface ComboMealItem {
  menuItemId: string;
  quantity: number;
}

export interface CreateComboMealRequest {
  name: string;
  description?: string;
  price: number;
  image?: string;
  items: ComboMealItem[];
}

export interface UpdateComboMealRequest {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  isAvailable?: boolean;
  items?: ComboMealItem[];
}

export interface ComboMealResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  items: {
    quantity: number;
    menuItem: {
      id: string;
      name: string;
      price: number;
      image?: string;
    };
  }[];
}

// ============ VALIDATION TYPES ============
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
} 