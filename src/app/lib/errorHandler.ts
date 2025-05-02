import axios from "axios";

// export default function httpErrorHandler(error: Error | AxiosError) {
export default function httpErrorHandler(error: any) {
  if (error === null) throw new Error("Unrecoverable error!! Error is null!");
  if (axios.isAxiosError(error)) {
    const response = error?.response;

    if (response) {
      const statusCode = response?.status;
      if (statusCode === 404) {
        return "Endpoint does not exist or has been deleted";
      } else if (statusCode === 401) {
        return "You don't have permission to access this resource";
      } else if (statusCode === 403) {
        return "You don't have permission to access this resource";
      }
    }
  }

  return error.message;
}
