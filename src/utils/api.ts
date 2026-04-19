import type { TProduct } from "./types";

const URL = import.meta.env.VITE_API_URL;
const SAUCES_CATEGORY = import.meta.env.VITE_SAUCES_CATEGORY;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  response: T;
};

type TProductsResponse = TServerResponse<{
    products: TProduct[]
}>;



export const getProductsApi = () =>
  fetch(`${URL}catalog/products/${SAUCES_CATEGORY}/`)
    .then((res) => checkResponse<TProductsResponse>(res))
    .then((data) => {
      if (data?.response) return data.response.products;
      return Promise.reject(data);
    });