import api, { getHeaders } from "./api";

const searchProducts = async (params = {}) => {
  return await api
    .get("/products", { params: params, headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const createProducts = async (requestBody) => {
  return await api
    .postForm("/products", requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const getProductByProductId = async (productId) => {
  return await api
    .get(`/products/${productId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const updateProduct = async (productId, requestBody) => {
  return await api
    .putForm(`/products/${productId}`, requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const deleteProduct = async (productId) => {
  return await api
    .delete(`/products/${productId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

export default {
  searchProducts,
  createProducts,
  getProductByProductId,
  updateProduct,
  deleteProduct,
};
