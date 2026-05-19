const TOKEN_KEY = "accommodation_rental_token";
const ROLE_KEY = "accommodation_rental_role";

const tokenStorage = {
    saveToken: (token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    saveRole: (role: string) => {
        localStorage.setItem(ROLE_KEY, role);
    },

    getRole: () => {
        return localStorage.getItem(ROLE_KEY);
    },

    isAdmin: () => {
        return localStorage.getItem(ROLE_KEY) === "ADMIN";
    },

    removeToken: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
    },

    isAuthenticated: () => {
        return !!localStorage.getItem(TOKEN_KEY);
    },
};

export default tokenStorage;