import api, { getHeaders } from "./api";

const searchServices = async (params = {}) => {
  return await api
    .get("/services", { params: params, headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const createServices = async (requestBody) => {
  return await api
    .postForm("/services", requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const getServiceByServiceId = async (serviceId) => {
  return await api
    .get(`/services/${serviceId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const updateService = async (serviceId, requestBody) => {
  return await api
    .putForm(`/services/${serviceId}`, requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const deleteService = async (serviceId) => {
  return await api
    .delete(`/services/${serviceId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

export default {
  searchServices,
  createServices,
  getServiceByServiceId,
  updateService,
  deleteService,
};
