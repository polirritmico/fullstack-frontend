import { jkiltroApi } from "@/services/api.js";

const storeManagerService = {
  async validarProducto(id) {
    const res = await jkiltroApi.get(
      `/api/v1/store-manager/products/${id}/validate`,
    );
    return res.data;
  },
};

export default storeManagerService;
