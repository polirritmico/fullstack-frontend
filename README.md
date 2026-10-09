# jKiltro

## Setup

```bash
npm install
```

## Ejecución

Levantar el sitio en modo desarrollo:

```bash
npm run dev
```

Ejecutar tests unitarios:

```bash
npm test
```

---

## Desarrollo

Para organización y consistencia seguir las siguientes prácticas:

- Cada componente en su carpeta con todo lo necesario para que funcione (css,
  js, etc.) menos assets como imágenes. Sigan los componentes que ya están como
  ejemplo, pero básicamente es `src/components/NombreComponente/index.jsx`,
  `src/components/NombreComponente/NombreComponente.module.css`. Se referencia
  así: `import NombreComponente from "@/componentes/NombreComponente;` y el
  código quedaría así:

```jsx
// Archivo src/components/Foo/index.jsx

// este import sí es referencia porque es parte del mismo componente. Si se mueve
// el componente Foo a otra carpeta queda funcionando ya que está autocontenido
// dentro de la carpeta `src/components/Foo`.
import styles from "./Foo.module.css";

function Foo() {
  return <div className={styles.nombreClaseCss}>Bien</div>;
}

export default Foo;
```

- Para los imports o referencias que **usan** un componente, no usar paths
  relativos. O sea, _esto sí_: `import Foo from "@/components/Foo";` _ESTO NO_:
  `import Foo from "../../components/Foo"`.

- Las imágenes deberían ir en `public/img` y referenciarse con este path
  `/img/nombre_de_la_imagen.png`. Si se necesita poner muchas imágenes, por
  ejemplo para productos, avatares o entradas de blog; se deben crear
  subcarpetas para mantener el orden dentro de `public/img`.

- Los logos, íconos, fuentes y otros assets reutilizables deben ir en
  `src/assets`.

- Los CSS `src/styles/globals.css` y `src/styles/theme.css` son importados en
  `src/main.jsx` y por lo tanto, aplican a los componentes de la aplicación.
  Para estilos compartidos entre componentes similares, utilizar
  `src/styles/shared/`. Los estilos específicos de los componentes o páginas,
  deben ir en la carpeta de ese elemento.

  > [!IMPORTANT]
  >
  > Evitar duplicar estilos y abusar de estilos específicos para mantener la
  > coherencia y consistencia visual del sitio. Las reglas CSS que deban
  > compartirse entre múltiples componentes _y que no pertenezcan a un
  > componente reutilizable_ deben centralizarse en `src/styles/shared`.
  >
  > Por ejemplo, si distintas tablas necesitan compartir reglas visuales, se
  > deberían definir en `src/styles/shared/tables.css`, pero si comparten
  > estructura o comportamiento se debe preferir crear y utilizar un componente
  > reutilizable como `Table` cuyos estilos específicos deberían ir en
  > `src/components/Table/Table.module.css`.
