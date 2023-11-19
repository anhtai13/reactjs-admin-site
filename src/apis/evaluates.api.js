import api, { getHeaders } from "./api";
const searchEvaluates = async (params = {}) => {
  return await api
    .get("/evaluates", { params: params, headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const getEvaluatesByEvaluateId = async (evaluatesId) => {
    return await api
      .get(`/evaluates/${evaluatesId}`, { headers: getHeaders() })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("API Error", error);
        throw error;
      });
  };

  export default {
    searchEvaluates,
    getEvaluatesByEvaluateId,
  }