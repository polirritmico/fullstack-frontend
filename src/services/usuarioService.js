const MOCK_DATA = {};

export const usuarioService = {
  async getAll() {
    return Promise.resolve(MOCK_DATA);
  },
  async getById(id) {
    const user = MOCK_DATA.find((usr) => usr.id == id);
    return Promise.resolve(user ?? null);
  },
};
