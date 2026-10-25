const metadata = {
  entity: { key: "user", singleLabel: "Usuario", pluralLabel: "Usuarios" },
  category: {
    field: "rol",
    label: "Roles",
    addTitle: "Nueva Categoría",
    icons: ["🐾", "🐕", "🐈", "🐦", "🐹", "📦"],
  },
  delete: {
    nameKey: "nombre",
    detailKey: "email",
    detailLabel: "Correo",
  },
  action: { key: "accion", label: "Acciones" },
  states: [
    { key: "todos", label: "Todos los estados", isDefault: true },
    { key: "activo", label: "Activo" },
    { key: "inactivo", label: "Inactivo" },
    { key: "pendiente", label: "En contratación" },
  ],
  columns: [
    {
      key: "id",
      label: "ID",
      type: "string",
      isSearchable: false,
      isHidden: true,
      isReadOnly: true,
    },
    {
      key: "nombre",
      label: "Usuario",
      type: "string",
      isSearchable: true,
      highlight: true,
    },
    {
      key: "rol",
      label: "Rol",
      type: "string",
      isSearchable: true,
    },
    {
      key: "departamento",
      label: "Departamento",
      type: "string",
    },
    {
      key: "email",
      label: "Correo",
      type: "email",
      isSearchable: true,
    },
    {
      key: "ultimoLogin",
      label: "Último ingreso",
      type: "string",
      isReadOnly: true,
    },
    {
      key: "estado",
      label: "Estado",
      type: "string",
      isState: true,
    },
  ],
};

const roles = [
  {
    id: 1,
    icon: "👥",
    name: "Todos los usuarios",
    value: "todos",
    amount: 1553,
    isDefault: true,
  },
  {
    id: 2,
    icon: "🐕",
    name: "Administradores",
    value: "Administrador",
    amount: 2,
  },
  {
    id: 3,
    icon: "💼",
    name: "Gerentes",
    value: "Gerente",
    amount: 1,
  },
  {
    id: 4,
    icon: "🏷️",
    name: "Vendedores",
    value: "Vendedor",
    amount: 3,
  },
  {
    id: 5,
    icon: "🚚",
    name: "Transportistas",
    value: "Transportista",
    amount: 5,
  },
  {
    id: 6,
    icon: "💻",
    name: "Desarrolladores",
    value: "Desarrollador",
    amount: 5,
  },
  {
    id: 7,
    icon: "👤",
    name: "Clientes",
    value: "Cliente",
    amount: 1532,
  },
];

let users = [
  {
    id: "101",
    nombre: "Ana Rojas",
    rol: "Administrador",
    departamento: "Operaciones",
    email: "ana.rojas@empresa.cl",
    ultimoLogin: "13 Sept 2026",
    estado: "Activo",
  },
  {
    id: "102",
    nombre: "Carlos Pinto",
    rol: "Gerente",
    departamento: "Comercial",
    email: "cpinto@empresa.cl",
    ultimoLogin: "12 Sept 2026",
    estado: "Activo",
  },
  {
    id: "103",
    nombre: "Fernando Villalobos",
    rol: "Desarrollador",
    departamento: "Tecnología",
    email: "fvillalobos@empresa.cl",
    ultimoLogin: "13 Sept 2026",
    estado: "Activo",
  },
  {
    id: "104",
    nombre: "Rodrigo Callealta",
    rol: "Desarrollador",
    departamento: "Tecnología",
    email: "rcallealta@empresa.cl",
    ultimoLogin: "11 Sept 2026",
    estado: "Inactivo",
  },
  {
    id: "105",
    nombre: "Camila Soto",
    rol: "Vendedor",
    departamento: "Ventas",
    email: "csoto@empresa.cl",
    ultimoLogin: "13 Sept 2026",
    estado: "Activo",
  },
  {
    id: "106",
    nombre: "Diego Tapia",
    rol: "Vendedor",
    departamento: "Ventas",
    email: "dtapia@empresa.cl",
    ultimoLogin: "09 Sept 2026",
    estado: "En contratación",
  },
  {
    id: "107",
    nombre: "Luis Martínez",
    rol: "Transportista",
    departamento: "Logística",
    email: "lmartinez@empresa.cl",
    ultimoLogin: "13 Sept 2026",
    estado: "Activo",
  },
  {
    id: "108",
    nombre: "Javiera Silva",
    rol: "Cliente",
    departamento: "N/A",
    email: "javi.silva@gmail.com",
    ultimoLogin: "01 Sept 2026",
    estado: "Activo",
  },
  {
    id: "109",
    nombre: "Matías Muñoz",
    rol: "Cliente",
    departamento: "N/A",
    email: "matias.munoz@yahoo.es",
    ultimoLogin: "28 Ago 2026",
    estado: "Inactivo",
  },
  {
    id: "110",
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
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...users];
  },

  async getById(id) {
    const user = users.find((usr) => usr.id == id);
    return Promise.resolve(user ? { ...user } : null);
  },

  async getCategories() {
    return Promise.resolve([...roles]);
  },

  async getMetadata() {
    return Promise.resolve({ ...metadata });
  },

  async createCategory(newCategory) {
    await new Promise((resolve) => setTimeout(resolve, 300));

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
    await new Promise((resolve) => setTimeout(resolve, 300));

    const remainingUsers = users.filter((user) => user.id !== id);
    const deleted = remainingUsers.length !== users.length;
    users = remainingUsers;

    return deleted;
  },

  async create(newUser) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const nextId = String(Number(users[users.length - 1].id) + 1);
    const created = { ...newUser, id: nextId };

    users.push(created);

    return { ...created };
  },
};

export default usuarioService;
