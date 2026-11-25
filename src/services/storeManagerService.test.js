import { beforeEach, describe, expect, it, vi } from "vitest";
import { jkiltroApi } from "@/services/api.js";
import storeManagerService from "./storeManagerService";

vi.mock("@/services/api.js", () => ({
  jkiltroApi: { get: vi.fn() },
}));

describe("storeManagerService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("valida el producto en store-manager y devuelve sus datos", async () => {
    const producto = { id: 3, nombre: "Pelota", estado: "Activo", stock: 4 };
    vi.mocked(jkiltroApi.get).mockResolvedValue({ data: producto });

    const resultado = await storeManagerService.validarProducto(3);

    expect(jkiltroApi.get).toHaveBeenCalledWith(
      "/api/v1/store-manager/products/3/validate",
    );
    expect(resultado).toEqual(producto);
  });

  it("propaga el error cuando el producto no está disponible", async () => {
    const error = {
      response: { status: 409, data: "El producto no tiene stock disponible" },
    };
    vi.mocked(jkiltroApi.get).mockRejectedValue(error);

    await expect(storeManagerService.validarProducto(3)).rejects.toBe(error);
  });
});
