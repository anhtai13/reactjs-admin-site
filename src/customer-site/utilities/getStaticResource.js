const getStaticResourceUrl = (path) => {
  return path ? `http://localhost:8000/${path}` : "";
};

export { getStaticResourceUrl };
