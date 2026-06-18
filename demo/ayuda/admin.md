# Guía de administración

## Iconos personalizados

Poné tus archivos PNG en la carpeta `wwwroot/iconos/` con estos nombres:

| Archivo | Se usa en |
|---|---|
| `carrito.png` | Botón del carrito flotante |
| `producto.png` | Menú lateral "Productos" |
| `venta.png` | Menú lateral "Ventas" |
| `usuario.png` | Menú lateral "Usuarios" |
| `inicio.png` | Menú lateral "Inicio" |
| `filtros.png` | Botón "Filtros" en Ventas |
| `config.png` | Icono de configuración |
| `empresa.png` | Avatar del negocio |

Para el avatar de cada usuario, poné `{nombre}.png`. Ejemplo: `admin.png`, `pepe.png`.

Si no ponés un PNG, la app usa un emoji (elegido durante la creación) o la inicial del nombre. No se rompe nada.

---

## Permisos

Hay **10 permisos** que se pueden activar o desactivar por usuario desde el panel de Usuarios (botón "Permisos"):

- **Ver productos** — ver inventario
- **Crear producto** — agregar nuevos productos
- **Editar producto** — modificar stock, precio, nombre
- **Eliminar producto** — borrar productos
- **Registrar venta** — hacer ventas
- **Ver historial de ventas** — acceder a Ventas
- **Gestionar usuarios** — crear/eliminar usuarios y editar permisos
- **Ver resumen del día** — ver el dashboard
- **Ver cajas** — ver saldo de efectivo y Mercado Pago
- **Administrar negocio** — cambiar nombre, rubro e ícono

### Presets

- **Admin**: todos los permisos (no se puede modificar)
- **Empleado**: inventario completo + ventas + cajas + administrar negocio
- **Cajero**: ver productos + vender + ver resumen

---

## Vender

1. Clic en **"+ Nueva venta"** dentro de la sección Ventas
2. Se abre una grilla visual con todos los productos
3. Clic en un producto → popup con cantidad → **Agregar**
4. El carrito aparece abajo a la derecha
5. Clic en el carrito → **Ir a pagar**
6. Elegí método de pago (efectivo o MP), o activá **pago combinado**
7. **Confirmar venta**

---

## Productos por peso o unidad

Al crear un producto podés tildar **"Vender por unidad"**. Si está activado, el stock y precio se muestran como "unid." en vez de "kg".

---

## Datos

Toda la información se guarda en archivos JSON locales:
- `productos.json` — inventario
- `usuarios.json` — usuarios y permisos
- `config.json` — nombre y rubro del negocio
- `caja.json` — saldos de cajas
- `ventas_YYYYMMDD.json` — ventas del día

---

## Modo oscuro / claro

El toggle de sol/luna en la barra lateral cambia entre tema oscuro y claro. Se guarda automáticamente.
