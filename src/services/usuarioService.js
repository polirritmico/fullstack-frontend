const metadata = {
  categories: [
    "Usuario",
    "Rol",
    "Departamento",
    "Correo",
    "Último ingreso",
    "Estado",
    "Acciones",
  ],
  states: ["Todos", "Activos", "Inactivos", "En contratación"],
  summaryLabel: "usuarios",
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
    name: "Ana Rojas",
    role: "Administrador",
    department: "Operaciones",
    email: "ana.rojas@empresa.cl",
    lastLogin: "13 Sept 2026",
    state: "Activo",
  },
  {
    id: "usuario-102",
    name: "Carlos Pinto",
    role: "Gerente",
    department: "Comercial",
    email: "cpinto@empresa.cl",
    lastLogin: "12 Sept 2026",
    state: "Activo",
  },
  {
    id: "usuario-103",
    name: "Fernando Villalobos",
    role: "Desarrollador",
    department: "Tecnología",
    email: "fvillalobos@empresa.cl",
    lastLogin: "13 Sept 2026",
    state: "Activo",
  },
  {
    id: "usuario-104",
    name: "Rodrigo Callealta",
    role: "Desarrollador",
    department: "Tecnología",
    email: "rcallealta@empresa.cl",
    lastLogin: "11 Sept 2026",
    state: "Inactivo",
  },
  {
    id: "usuario-105",
    name: "Camila Soto",
    role: "Vendedor",
    department: "Ventas",
    email: "csoto@empresa.cl",
    lastLogin: "13 Sept 2026",
    state: "Activo",
  },
  {
    id: "usuario-106",
    name: "Diego Tapia",
    role: "Vendedor",
    department: "Ventas",
    email: "dtapia@empresa.cl",
    lastLogin: "09 Sept 2026",
    state: "Activo",
  },
  {
    id: "usuario-107",
    name: "Luis Martínez",
    role: "Transportista",
    department: "Logística",
    email: "lmartinez@empresa.cl",
    lastLogin: "13 Sept 2026",
    state: "Activo",
  },
  {
    id: "usuario-108",
    name: "Javiera Silva",
    role: "Cliente",
    department: "N/A",
    email: "javi.silva@gmail.com",
    lastLogin: "01 Sept 2026",
    state: "Activo",
  },
  {
    id: "usuario-109",
    name: "Matías Muñoz",
    role: "Cliente",
    department: "N/A",
    email: "matias.munoz@yahoo.es",
    lastLogin: "28 Ago 2026",
    state: "Inactivo",
  },
  {
    id: "usuario-110",
    name: "Valentina Parra",
    role: "Cliente",
    department: "N/A",
    email: "vparra99@hotmail.com",
    lastLogin: "12 Sept 2026",
    state: "Activo",
  },
];

const usuarioService = {
  async getAll() {
    // return Promise.resolve(users);
    await new Promise((resolve) => setTimeout(resolve, 2500));
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
