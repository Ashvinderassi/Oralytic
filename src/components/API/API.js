const API = {};

API.get = (endpoint) => callFetch(endpoint, "GET");
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE");

export default API;

const callFetch = async (endpoint, method, dataObj = null) => {
  let requestObj = { method: method };
  if (dataObj)
    requestObj = {
      ...requestObj,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataObj),
    };

  try {
    let result = null;
    const response = await fetch(endpoint, requestObj);
    if (response.status !== 204) result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true, result }
      : { isSuccess: false, message: `${result.message}` };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};
