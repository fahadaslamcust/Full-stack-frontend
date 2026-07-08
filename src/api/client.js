import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://full-stack-backend-d1g9.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    // Log the outgoing request
    console.log(
      `[API Request] ${config.method.toUpperCase()} ${config.url}`,
      config.data ? config.data : "",
    );

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  },
);

// Response interceptor to handle common errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    // Log the successful response
    console.log(
      `[API Response] ${response.status} ${response.config.url}`,
      response.data,
    );
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    // Log the error response
    console.error(
      `[API Error] ${status} ${requestUrl}`,
      error.response?.data || error.message,
    );

    if (status === 401) {
      // Don't redirect if the 401 came from the auth endpoints themselves
      // (wrong password, etc.) – that's a form validation error, not a session expiry.
      const isAuthCall = requestUrl.includes("/auth/");
      const isAlreadyOnLogin =
        window.location.pathname === "/" ||
        window.location.pathname === "/signup";

      if (!isAuthCall && !isAlreadyOnLogin) {
        console.warn(
          "[API Auth] Session expired – clearing token and redirecting to login",
        );
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
