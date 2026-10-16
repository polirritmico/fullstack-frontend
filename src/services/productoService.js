const metadata = {
  etiquetas: {
    accion: "Acciones",
    estado: "Estado",
    categoria: "Categoría",
    objeto: "Producto",
    objetos: "Productos",
    contador: "productos",
  },
  categoriasTabla: ["Producto", "SKU", "Categoría", "Precio", "Stock"],
  estados: {
    todos: "Todos los estados",
    activo: "Activos",
    inactivo: "Inactivos",
    pendiente: "En preparación",
  },
  campos: {
    id: "string",
    nombre: "string",
    sku: "string",
    categoria: "string",
    precio: "numeric",
    stock: "numeric",
    estado: "string",
  },
};

const productos = [
  {
    id: "prod-123",
    nombre: "PelletMaster Adulto",
    sku: "PD-101",
    categoria: "Comida de perro",
    precio: "$42.000",
    stock: 80,
    estado: "Activo",
  },
  {
    id: "prod-124",
    nombre: "NutriCan Cachorro",
    sku: "PD-102",
    categoria: "Comida de perro",
    precio: "$36.500",
    stock: 45,
    estado: "Activo",
  },
  {
    id: "prod-125",
    nombre: "CanVital Senior",
    sku: "PD-103",
    categoria: "Comida de perro",
    precio: "$39.900",
    stock: 12,
    estado: "Preparando",
  },
  {
    id: "prod-126",
    nombre: "CatLife Adulto",
    sku: "PG-201",
    categoria: "Comida de gato",
    precio: "$28.900",
    stock: 62,
    estado: "Activo",
  },
  {
    id: "prod-127",
    nombre: "GatoPlus Esterilizado",
    sku: "PG-202",
    categoria: "Comida de gato",
    precio: "$31.500",
    stock: 34,
    estado: "Activo",
  },
  {
    id: "prod-128",
    nombre: "FelinoCare Kitten",
    sku: "PG-203",
    categoria: "Comida de gato",
    precio: "$29.900",
    stock: 0,
    estado: "Inactivo",
  },
  {
    id: "prod-129",
    nombre: "MixCanario Premium",
    sku: "PA-301",
    categoria: "Comida de pájaros",
    precio: "$8.900",
    stock: 27,
    estado: "Activo",
  },
  {
    id: "prod-130",
    nombre: "Semillas VitaBird",
    sku: "PA-302",
    categoria: "Comida de pájaros",
    precio: "$6.500",
    stock: 41,
    estado: "Activo",
  },
  {
    id: "prod-131",
    nombre: "Pellets AvePlus",
    sku: "PA-303",
    categoria: "Comida de pájaros",
    precio: "$9.900",
    stock: 8,
    estado: "Preparando",
  },
  {
    id: "prod-132",
    nombre: "Flakes AquaColor",
    sku: "PF-401",
    categoria: "Comida de peces",
    precio: "$5.900",
    stock: 36,
    estado: "Activo",
  },
  {
    id: "prod-133",
    nombre: "Pellets GoldFish",
    sku: "PF-402",
    categoria: "Comida de peces",
    precio: "$7.500",
    stock: 22,
    estado: "Activo",
  },
  {
    id: "prod-134",
    nombre: "Alimento Betta Color",
    sku: "PF-403",
    categoria: "Comida de peces",
    precio: "$4.900",
    stock: 0,
    estado: "Inactivo",
  },
  {
    id: "prod-135",
    nombre: "Antiparasitario Canino",
    sku: "RM-501",
    categoria: "Remedios",
    precio: "$12.900",
    stock: 18,
    estado: "Activo",
  },
  {
    id: "prod-136",
    nombre: "Antiparasitario Felino",
    sku: "RM-502",
    categoria: "Remedios",
    precio: "$10.500",
    stock: 9,
    estado: "Preparando",
  },
  {
    id: "prod-137",
    nombre: "Spray Cicatrizante Vet",
    sku: "RM-503",
    categoria: "Remedios",
    precio: "$8.900",
    stock: 0,
    estado: "Inactivo",
  },
  {
    id: "prod-138",
    nombre: "Shampoo Dermacare",
    sku: "HG-601",
    categoria: "Higiene",
    precio: "$9.900",
    stock: 25,
    estado: "Activo",
  },
  {
    id: "prod-139",
    nombre: "Limpiador Ótico PetCare",
    sku: "HG-602",
    categoria: "Higiene",
    precio: "$7.900",
    stock: 16,
    estado: "Activo",
  },
  {
    id: "prod-140",
    nombre: "Toallitas Húmedas Pet",
    sku: "HG-603",
    categoria: "Higiene",
    precio: "$5.500",
    stock: 6,
    estado: "Preparando",
  },
];

const categorias = [
  {
    id: 1,
    icon: "🐾",
    name: "Todos los productos",
    amount: 233,
  },
  {
    id: 2,
    icon: "🐕",
    name: "Comida de perro",
    amount: 130,
  },
  {
    id: 3,
    icon: "🐈",
    name: "Comida de gato",
    amount: 42,
  },
  {
    id: 4,
    icon: "🐦",
    name: "Comida de pájaros",
    amount: 42,
  },
  {
    id: 5,
    icon: "🐟",
    name: "Comida de peces",
    amount: 42,
  },
  {
    id: 6,
    icon: "🩺",
    name: "Remedios",
    amount: 12,
  },
  {
    id: 7,
    icon: "✂️",
    name: "Higiene",
    amount: 7,
  },
];

const productoService = {
  async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return productos;
  },

  async getById(id) {
    const producto = productos.find((usr) => usr.id == id);
    return Promise.resolve(producto ?? null);
  },

  async getCategories() {
    return Promise.resolve(categorias);
  },

  async getMetadata() {
    return Promise.resolve(metadata);
  },
};

export default productoService;
