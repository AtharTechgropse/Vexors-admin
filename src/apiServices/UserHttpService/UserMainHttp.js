import httpService from "../httpService";
import { toast } from "react-toastify";

function handleError(error, customMessage = "An unexpected error occurred") {
  if (error.response) {
    // Server responded with a status code other than 2xx
    const { message } = error.response.data;
    toast.error(message || customMessage, { autoClose: 1500 });
    console.error("API Error:", message || error.response);
  } else if (error.request) {
    // Request was made but no response received
    toast.error("No response from server. Please try again later.", {
      autoClose: 1500,
    });
    console.error("No response received:", error.request);
  } else {
    // Something happened while setting up the request
    toast.error(customMessage, { autoClose: 1500 });
    console.error("Error:", error.message);
  }
}
export async function getAdminData() {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}auth/getAdminData`
    );
    if (!data.error) {
    } else {
      toast.error(data.message);
    }
    return { data };
  } catch (error) {
    handleError(error, "Failed to log in");
    return { error };
  }
}

export async function GetAllUsers(formData) {
  try {
    const { data } = await httpService.put(
      `${process.env.REACT_APP_APIENDPOINT}user/getUserList`,
      formData
    );
    if (!data.error) {
    } else {
      toast.error(data.message);
    }
    return { data };
  } catch (error) {
    handleError(error, "Failed to log in");
    return { error };
  }
}


export async function AddSubUser(formData) {
  try {
    const { data } = await httpService.put(
      `${process.env.REACT_APP_APIENDPOINT}user/getUserList`,
      formData
    );
    if (!data.error) {
    } else {
      toast.error(data.message);
    }
    return { data };
  } catch (error) {
    handleError(error, "Failed to log in");
    return { error };
  }
}

export async function GetUser(id) {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}user/getUserDetails/${id}`
    );
    if (!data.error) {
    } else {
      toast.error(data.message);
    }
    return { data };
  } catch (error) {
    handleError(error, "Server Error.Try Again!");
    return { error };
  }
}
export async function UpdateUserStatus(id, formData) {
  try {
    const { data } = await httpService.put(
      `${process.env.REACT_APP_APIENDPOINT}user/approvalUser/${id}`,
      formData
    );
    if (!data.error) {
      toast.success(data.message, { autoClose: 1500 });
    } else {
      toast.error(data.message);
    }
    return { data };
  } catch (error) {
    handleError(error, "Failed to log in");
    return { error };
  }
}

export async function DeleteUser(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}api/createAssistant`,
      formData
    );
    if (!data.error) {
      toast.success(data.message, { autoClose: 1500 });
    } else {
      toast.error(data.message);
    }
    return { data };
  } catch (error) {
    handleError(error, "Failed to log in");
    return { error };
  }
}
