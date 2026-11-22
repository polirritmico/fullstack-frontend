import { jkiltroApi } from "@/services/api";

function mapUsuarioResponseToUsuario(usuarioResponse) {
  if (!usuarioResponse) {
    return null;
  }

  return {
    id: usuarioResponse.id,
    email: usuarioResponse.email,
    nombre: usuarioResponse.nombreCompleto,
    telefono: usuarioResponse.telefonoCelular,
    userData: usuarioResponse,
  };
}

function mapNewRolToNewRolRequest(newRol) {
  if (!newRol) {
    return null;
  }

  return {
    nombreRol: newRol.name,
    nombreMostrar: newRol.nameShow,
    icon: newRol.icon,
    descripcion: newRol.text,
  };
}

function mapUsuarioToRequest(usuario) {
  if (!usuario) {
    return null;
  }

  return {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    rut: usuario.rut,
    dv: usuario.dv,
    email: usuario.email,
    telefonoCelular: usuario.telefonoCelular,
    departamento: usuario.departamento,
    fechaNacimiento: usuario.fechaNacimiento,
    rolId: Number(usuario.rolId),
    estadoId: Number(usuario.estadoId),
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
    return mapUsuarioResponseToUsuario(res.data);
  },

  async getById(id) {
    const res = await jkiltroApi.get(`/api/v1/users/${id}`);
    return mapUsuarioResponseToUsuario(res.data);
  },

  async getCategories() {
    const res = await jkiltroApi.get("/api/v1/users/roles");
    return res.data;
  },

  async createCategory(newCategory) {
    const body = mapNewCategoryRequest(newCategory);
    const res = await jkiltroApi.post("/api/v1/users/roles", body);
    return res.data;
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
