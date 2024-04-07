import { invokeApi } from "./invokeApi";

export const login_user = async (data) => {
  const reqObj = {
    path: "api/app_api/login",
    method: "POST",
    postData: data,
  };
  return invokeApi(reqObj);
};
export const signup_user = async (data) => {
  const reqObj = {
    path: "api/customer/signup_customer",
    method: "POST",
    postData: data,
  };
  return invokeApi(reqObj);
};
export const change_password = async (data) => {
  const reqObj = {
    path: "api/app_api/change_password",
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const login_with_google = async (data) => {
  const reqObj = {
    path: "api/app_api/google_login",
    method: "POST",
    postData: data,
  };
  return invokeApi(reqObj);
};
export const verify_code = async (data) => {
  const reqObj = {
    path: "api/app_api/code_verification",
    method: "POST",
    postData: data,
  };
  return invokeApi(reqObj);
};
export const email_verificatin = async (data) => {
  const reqObj = {
    path: "api/app_api/email_verificatin",
    method: "POST",
    postData: data,
  };
  return invokeApi(reqObj);
};
export const code_verification = async (data) => {
  const reqObj = {
    path: "api/app_api/code_verification",
    method: "POST",
    postData: data,
  };
  return invokeApi(reqObj);
};
export const reset_password = async (data) => {
  const reqObj = {
    path: "api/app_api/reset_password",
    method: "POST",
    postData: data,
  };
  return invokeApi(reqObj);
};

export const add_customer_search_history = async (data) => {
  const reqObj = {
    path: "api/customer/add_customer_search_history",
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const get_customer_search_history = async (data) => {
  const reqObj = {
    path: "api/customer/get_customer_search_history",
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(reqObj);
};

export const delete_customer_search_history = async (id) => {
  const reqObj = {
    path: `api/customer/delete_customer_search_history/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(reqObj);
};
