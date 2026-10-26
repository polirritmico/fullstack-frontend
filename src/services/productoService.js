// import { metadata, productos, categorias } from "@/data/productos";

const metadata = {
  entity: {
    key: "producto",
    singleLabel: "Producto",
    pluralLabel: "Productos",
  },
  category: {
    field: "categoria",
    label: "Categoría",
    addTitle: "Nueva Categoría",
    // prettier-ignore
    icons: [
      "🐾", "🐕", "🐈", "🐦", "🐟", "🐹", "🦴", "🥣", "🧸",
      "🧶", "🛏️", "🏠", "🦮", "🎒", "🩺", "✂️", "👕", "📦",
    ],
  },
  delete: {
    nameKey: "nombre",
    detailKey: "sku",
    detailLabel: "SKU",
  },
  action: { key: "accion", label: "Acciones" },
  states: [
    { key: "todos", label: "Todos los estados", isDefault: true },
    { key: "activo", label: "Activo" },
    { key: "inactivo", label: "Inactivo" },
    { key: "preparando", label: "Preparando" },
  ],
  columns: [
    {
      key: "id",
      label: "ID",
      type: "string",
      isHidden: true,
      isReadOnly: true,
    },
    {
      key: "nombre",
      label: "Producto",
      type: "string",
      isSearchable: true,
      highlight: true,
    },
    {
      key: "sku",
      label: "SKU",
      type: "string",
      isSearchable: true,
    },
    {
      key: "categoria",
      label: "Categoría",
      type: "string",
      isSearchable: true,
    },
    {
      key: "precio",
      label: "Precio",
      type: "money",
    },
    {
      key: "stock",
      label: "Stock",
      type: "int",
    },
    {
      key: "estado",
      label: "Estado",
      type: "string",
      isState: true,
    },
  ],
};

let productos = [
  {
    id: "123",
    nombre: "PelletMaster Adulto",
    sku: "PD-101",
    categoria: "Comida de perro",
    precio: 42000,
    stock: 80,
    estado: "Activo",
  },
  {
    id: "124",
    nombre: "NutriCan Cachorro",
    sku: "PD-102",
    categoria: "Comida de perro",
    precio: 36500,
    stock: 45,
    estado: "Activo",
  },
  {
    id: "125",
    nombre: "CanVital Senior",
    sku: "PD-103",
    categoria: "Comida de perro",
    precio: 39900,
    stock: 12,
    estado: "Preparando",
  },
  {
    id: "126",
    nombre: "CatLife Adulto",
    sku: "PG-201",
    categoria: "Comida de gato",
    precio: 28900,
    stock: 62,
    estado: "Activo",
  },
  {
    id: "127",
    nombre: "GatoPlus Esterilizado",
    sku: "PG-202",
    categoria: "Comida de gato",
    precio: 31500,
    stock: 34,
    estado: "Activo",
  },
  {
    id: "128",
    nombre: "FelinoCare Kitten",
    sku: "PG-203",
    categoria: "Comida de gato",
    precio: 29900,
    stock: 0,
    estado: "Inactivo",
  },
  {
    id: "129",
    nombre: "MixCanario Premium",
    sku: "PA-301",
    categoria: "Comida de pájaros",
    precio: 8900,
    stock: 27,
    estado: "Activo",
  },
  {
    id: "130",
    nombre: "Semillas VitaBird",
    sku: "PA-302",
    categoria: "Comida de pájaros",
    precio: 6500,
    stock: 41,
    estado: "Activo",
  },
  {
    id: "131",
    nombre: "Pellets AvePlus",
    sku: "PA-303",
    categoria: "Comida de pájaros",
    precio: 9900,
    stock: 8,
    estado: "Preparando",
  },
  {
    id: "132",
    nombre: "Flakes AquaColor",
    sku: "PF-401",
    categoria: "Comida de peces",
    precio: 5900,
    stock: 36,
    estado: "Activo",
  },
  {
    id: "133",
    nombre: "Pellets GoldFish",
    sku: "PF-402",
    categoria: "Comida de peces",
    precio: 7500,
    stock: 22,
    estado: "Activo",
  },
  {
    id: "134",
    nombre: "Alimento Betta Color",
    sku: "PF-403",
    categoria: "Comida de peces",
    precio: 4900,
    stock: 0,
    estado: "Inactivo",
  },
  {
    id: "135",
    nombre: "Antiparasitario Canino",
    sku: "RM-501",
    categoria: "Remedios",
    precio: 12900,
    stock: 18,
    estado: "Activo",
  },
  {
    id: "136",
    nombre: "Antiparasitario Felino",
    sku: "RM-502",
    categoria: "Remedios",
    precio: 10500,
    stock: 9,
    estado: "Preparando",
  },
  {
    id: "137",
    nombre: "Spray Cicatrizante Vet",
    sku: "RM-503",
    categoria: "Remedios",
    precio: 8900,
    stock: 0,
    estado: "Inactivo",
  },
  {
    id: "138",
    nombre: "Shampoo Dermacare",
    sku: "HG-601",
    categoria: "Higiene",
    precio: 9900,
    stock: 25,
    estado: "Activo",
  },
  {
    id: "139",
    nombre: "Limpiador Ótico PetCare",
    sku: "HG-602",
    categoria: "Higiene",
    precio: 7900,
    stock: 16,
    estado: "Activo",
  },
  {
    id: "140",
    nombre: "Toallitas Húmedas Pet",
    sku: "HG-603",
    categoria: "Higiene",
    precio: 5500,
    stock: 6,
    estado: "Preparando",
  },
];

const categorias = [
  {
    id: 1,
    icon: "🐾",
    name: "Todos los productos",
    value: "todos",
    amount: 233,
    isDefault: true,
  },
  {
    id: 2,
    icon: "🐕",
    name: "Comida de perro",
    value: "Comida de perro",
    amount: 130,
  },
  {
    id: 3,
    icon: "🐈",
    name: "Comida de gato",
    value: "Comida de gato",
    amount: 42,
  },
  {
    id: 4,
    icon: "🐦",
    name: "Comida de pájaros",
    value: "Comida de pájaros",
    amount: 42,
  },
  {
    id: 5,
    icon: "🐟",
    name: "Comida de peces",
    value: "Comida de peces",
    amount: 42,
  },
  {
    id: 6,
    icon: "🩺",
    name: "Remedios",
    value: "Remedios",
    amount: 12,
  },
  {
    id: 7,
    icon: "✂️",
    name: "Higiene",
    value: "Higiene",
    amount: 7,
  },
];

const productoService = {
  async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...productos];
  },

  async getById(id) {
    const producto = productos.find((usr) => usr.id == id);
    return Promise.resolve(producto ? { ...producto } : null);
  },

  async getCategories() {
    return Promise.resolve([...categorias]);
  },

  async getMetadata() {
    return Promise.resolve({ ...metadata });
  },

  async createCategory(newCategory) {
    const nextId = Math.max(...categorias.map(({ id }) => Number(id))) + 1;
    const created = {
      ...newCategory,
      id: nextId,
      value: newCategory.name,
      amount: 0,
      isDefault: false,
    };

    categorias.push(created);

    return { ...created };
  },

  async delete(id) {
    const remainingProducts = productos.filter(
      (producto) => producto.id !== id,
    );
    const deleted = remainingProducts.length !== productos.length;
    productos = remainingProducts;

    return deleted;
  },

  async create(newProduct) {
    const nextId = String(Number(productos[productos.length - 1].id) + 1);
    const created = { ...newProduct, id: nextId };

    productos.push(created);

    return { ...created };
  },

  async update(updatedProduct) {
    const index = productos.findIndex((user) => user.id === updatedProduct.id);
    if (index !== -1) {
      productos[index] = { ...productos[index], ...updatedProduct };
      return { ...productos[index] };
    }

    return null;
  },
};

export default productoService;
