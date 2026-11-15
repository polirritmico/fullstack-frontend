import { jkiltroApi } from "@/services/api";

function mapUsuario(usuario) {
  if (!usuario) {
    return null;
  }

  return {
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombreCompleto,
    telefono: usuario.telefonoCelular,
    userData: usuario,
  };
}

const usuarioService = {
  async getMetadata() {
    const res = await jkiltroApi.get("/api/v1/users/metadata");
    return res.data;
  },

  async getAll() {
    const res = await jkiltroApi.get("/api/v1/users");
    return res.data;
  },

  async getMyProfile() {
    const res = await jkiltroApi.get("/api/v1/users/me");
    return mapUsuario(res.data);
  },

  async getById(id) {
    const res = await jkiltroApi.get(`/api/v1/users/${id}`);
    return mapUsuario(res.data);
  },

  async getCategories() {
    const res = await jkiltroApi.get("/api/v1/users/roles");
    return res.data;
  },

  async createCategory(newCategory) {
    // TODO: implement or align with backend api
    const res = await jkiltroApi.get("/api/v1/users/roles");
    const roles = res.data;

    const nextId = Math.max(...roles.map(({ id }) => Number(id))) + 1;
    const created = {
      ...newCategory,
      id: nextId,
      value: newCategory.name,
      amount: 0,
      isDefault: false,
    };

    roles.push(created);

    return { ...created };
  },

  async delete(id) {
    // TODO: implement or align with backend api
    await jkiltroApi.delete(`/api/v1/users/${id}`);
    return true;
  },

  async create(newUser) {
    // TODO: implement or align with backend api
    const res = await jkiltroApi.post("/api/v1/users", newUser);
    return res.data;
  },

  async update(updatedUser) {
    // TODO: implement or align with backend api
    const { id, ...payload } = updatedUser;
    const res = await jkiltroApi.put(`/api/v1/users/${id}`, payload);
    return res.data;
  },
};

export default usuarioService;
