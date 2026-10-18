const LOCAL_STORAGE_KEY = "jKiltro-user";

const mockAdminUser = {
  id: 1,
  username: "Alan Brito",
  role: "Administrador",
  token: "fake-jwt-admin-token",
};

const mockClientUser = {
  id: 1,
  username: "Alan Brito",
  role: "Cliente",
  token: "fake-jwt-client-token",
};

const authService = {
  async login(credentials) {
    // TODO: This should decode the jwt token

    await new Promise((resolve) => setTimeout(resolve, 200));

    let user = null;
    if (
      credentials.email === "alanbrito@duocuc.cl" &&
      credentials.password == "test"
    ) {
      user = mockAdminUser;
    } else if (
      credentials.email === "susanaoria@duocuc.cl" &&
      credentials.password == "test"
    ) {
      user = mockClientUser;
    }

    if (!user) {
      const errorPayload = {
        timestamp: new Date(),
        status: 401,
        error: "Unauthorized",
        message: "Algún mensaje de error desde el backend",
      };
      throw errorPayload;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  },

  getCurrentUser() {
    const user = localStorage.getItem(LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
