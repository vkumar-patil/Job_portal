export const Getallwod = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null; 
    }
    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); 
      return decoded.role; 
    } catch (error) {
      console.error("Failed to decode token:", error.message);
      return null; 
    }
  };
  