import axios from "axios";

const errorCallBack = (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    //toast.error("an unexpected error occured");
  }
  return Promise.reject(error);
};

// const userAswId = localStorage.getItem("userAswId");
// console.log(userAswId);

axios.defaults.headers.common["x-auth-token-user"] =
  localStorage.getItem("token-vexors-admin");  

axios.defaults.headers.common["x-auth-language"] = "English";

axios.interceptors.request.use(async (req) => {
  req.headers["x-auth-token-user"] = await localStorage.getItem("token-vexors-admin");
  return req;
});
axios.interceptors.response.use(null, errorCallBack);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
