import api, { getHeaders } from "./api";

const searchContacts = async (params = {}) => {
  return await api
    .get("/contacts", { params: params, headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const createContact = async (requestBody) => {
  return await api
    .postForm("/contacts", requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const getContactByContactId = async (contactId) => {
  return await api
    .get(`/contacts/${contactId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const updateContact = async (contactId, requestBody) => {
  return await api
    .putForm(`/contacts/${contactId}`, requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const deleteContact = async (contactId) => {
  return await api
    .delete(`/contacts/${contactId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

export default {
  searchContacts,
  createContact,
  getContactByContactId,
  updateContact,
  deleteContact,
};
