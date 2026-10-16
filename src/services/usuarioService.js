const metadata = {
  etiquetas: {
    accion: "Acciones",
    estado: "Estado",
    categoria: "Roles",
    objeto: "Usuario",
    objetos: "Usuarios",
    contador: "usuarios",
  },
  categoriasTabla: [
    "Usuario",
    "Rol",
    "Departamento",
    "Correo",
    "Último ingreso",
  ],
  estados: {
    todos: "Todos los estados",
    activo: "Activo",
    inactivo: "Inactivo",
    pendiente: "En contratación",
  },
  campos: {
    id: "string",
    nombre: "string",
    rol: "string",
    departamento: "string",
    email: "string",
    ultimoLogin: "string", // datetime
    estado: "string",
  },
};

const roles = [
  {
    id: 1,
    icon: "👥",
    name: "Todos los usuarios",
    amount: 1553,
  },
  {
    id: 2,
    icon: "🐕",
    name: "Administradores",
    amount: 2,
  },
  {
    id: 3,
    icon: "💼",
    name: "Gerentes",
    amount: 1,
  },
  {
    id: 4,
    icon: "🏷️",
    name: "Vendedores",
    amount: 3,
  },
  {
    id: 5,
    icon: "🚚",
    name: "Transportistas",
    amount: 5,
  },
  {
    id: 6,
    icon: "💻",
    name: "Desarrolladores",
    amount: 5,
  },
  {
    id: 7,
    icon: "👤",
    name: "Clientes",
    amount: 1532,
  },
];

const users = [
  {
    id: "usuario-101",
    nombre: "Ana Rojas",
    rol: "Administrador",
    departamento: "Operaciones",
    email: "ana.rojas@empresa.cl",
    ultimoLogin: "13 Sept 2026",
    estado: "Activo",
  },
  {
    id: "usuario-102",
    nombre: "Carlos Pinto",
    rol: "Gerente",
    departamento: "Comercial",
    email: "cpinto@empresa.cl",
    ultimoLogin: "12 Sept 2026",
    estado: "Activo",
  },
  {
    id: "usuario-103",
    nombre: "Fernando Villalobos",
    rol: "Desarrollador",
    departamento: "Tecnología",
    email: "fvillalobos@empresa.cl",
    ultimoLogin: "13 Sept 2026",
    estado: "Activo",
  },
  {
    id: "usuario-104",
    nombre: "Rodrigo Callealta",
    rol: "Desarrollador",
    departamento: "Tecnología",
    email: "rcallealta@empresa.cl",
    ultimoLogin: "11 Sept 2026",
    estado: "Inactivo",
  },
  {
    id: "usuario-105",
    nombre: "Camila Soto",
    rol: "Vendedor",
    departamento: "Ventas",
    email: "csoto@empresa.cl",
    ultimoLogin: "13 Sept 2026",
    estado: "Activo",
  },
  {
    id: "usuario-106",
    nombre: "Diego Tapia",
    rol: "Vendedor",
    departamento: "Ventas",
    email: "dtapia@empresa.cl",
    ultimoLogin: "09 Sept 2026",
    estado: "En contratación",
  },
  {
    id: "usuario-107",
    nombre: "Luis Martínez",
    rol: "Transportista",
    departamento: "Logística",
    email: "lmartinez@empresa.cl",
    ultimoLogin: "13 Sept 2026",
    estado: "Activo",
  },
  {
    id: "usuario-108",
    nombre: "Javiera Silva",
    rol: "Cliente",
    departamento: "N/A",
    email: "javi.silva@gmail.com",
    ultimoLogin: "01 Sept 2026",
    estado: "Activo",
  },
  {
    id: "usuario-109",
    nombre: "Matías Muñoz",
    rol: "Cliente",
    departamento: "N/A",
    email: "matias.munoz@yahoo.es",
    ultimoLogin: "28 Ago 2026",
    estado: "Inactivo",
  },
  {
    id: "usuario-110",
    nombre: "Valentina Parra",
    rol: "Cliente",
    departamento: "N/A",
    email: "vparra99@hotmail.com",
    ultimoLogin: "12 Sept 2026",
    estado: "Activo",
  },
];

const usuarioService = {
  async getAll() {
    // return Promise.resolve(users);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return users;
  },

  async getById(id) {
    const user = users.find((usr) => usr.id == id);
    return Promise.resolve(user ?? null);
  },

  async getCategories() {
    return Promise.resolve(roles);
  },

  async getMetadata() {
    return Promise.resolve(metadata);
  },
};

export default usuarioService;
