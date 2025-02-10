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

export async function UserLogin(formData) {
  try {
    const { data } = await httpService.put(
      `${process.env.REACT_APP_APIENDPOINT}auth/adminLogin`,
      formData
    );
    if (!data.error) {
      localStorage.removeItem("token-vexors-admin");
      localStorage.setItem("token-vexors-admin", data?.results?.token);
      localStorage.setItem("vexors-admin", data?.results?.admin?._id);
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

export async function UserSignUp(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}api/signup`,
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

export async function UserforgotPassword(formData) {
  try {
    const { data } = await httpService.put(
      `${process.env.REACT_APP_APIENDPOINT}auth/adminForgetPassword`,
      formData
    );
    if (!data.error) {
      toast.success(data.message, { autoClose: 1500 });
    } else {
      toast.error(data.message, { autoClose: 1500 });
    }
    return { data };
  } catch (error) {
    handleError(error, "Failed to process forgot password request");
    return { error };
  }
}

export async function verifyOTP(formData) {
  try {
    const { data } = await httpService.put(
      `${process.env.REACT_APP_APIENDPOINT}auth/adminVerifyOtp`,
      formData
    );
    if (!data.error) {
      toast.success(data.message);
    } else {
      toast.error(data.message, { autoClose: 1500 });
    }

    return { data };
  } catch (error) {
    handleError(error, "Failed to verify OTP");
    return { error };
  }
}

export async function UserResetPass(formData) {
  try {
    const { data } = await httpService.put(
      `${process.env.REACT_APP_APIENDPOINT}auth/resetPasswordAdmin`,
      formData
    );
    if (!data.error) {
      toast.success(data.message);
    } else {
      toast.error(data.message, { autoClose: 1500 });
    }

    return { data };
  } catch (error) {
    handleError(error, "Failed to update password");
    return { error };
  }
}

export async function changePasswordpart(formData) {
  try {
    const { data } = await httpService.patch(
      `${process.env.REACT_APP_APIENDPOINT}api/partner/changePassword`,
      formData
    );
    console.log(data);

    if (!data.error) {
      toast.success(data.message);
    } else {
      toast.error(data.message, { autoClose: 1500 });
    }

    return { data };
  } catch (error) {
    handleError(error, "Failed to change password");
    return { error };
  }
}
