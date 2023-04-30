import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById } from '../productApi';
import { Item } from '../useTypes';
  
export const useGetProductsQuery = () => useQuery<Item[]>(['products'], fetchProducts);
export const useGetProductByIdQuery = (id: string) => useQuery<Item>(['product', id], () => fetchProductById(id));