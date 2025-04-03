export const baseURL = (endpoint) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
  };
  
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  