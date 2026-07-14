# Nueva web de Eagle Commercial S.A.

Repositorio listo para GitHub con una propuesta corporativa bilingüe, responsive y orientada a presentar a Eagle Commercial como empresa de ingeniería e integración tecnológica para operaciones críticas.

La solución utiliza un generador estático propio en Node.js y **no tiene dependencias de ejecución de terceros**. El resultado compilado queda en `dist/` y puede publicarse en GitHub Pages, cualquier hosting estático, un CDN o un servidor web convencional.

## Alcance incluido

- Página principal moderna con navegación tipo *liquid glass*.
- Versiones completas en español e inglés.
- Páginas de compañía, capacidades, sectores, ingeniería, soporte, Eagle Group y contacto.
- Área autorizada como interfaz demostrativa, sin autenticación real.
- Páginas preliminares de privacidad, cookies y tratamiento de datos.
- Formulario validado en el navegador, con alternativa por correo y punto de integración para backend.
- SEO técnico: títulos, descripciones, canonical, hreflang, Open Graph, datos estructurados, sitemap y robots.
- Accesibilidad: navegación por teclado, foco visible, etiquetas de formulario, movimiento reducido y estructura semántica.
- Recursos SVG originales sin marcas de fabricantes, modelos de producto ni especificaciones sensibles.
- Validación automática para detectar rutas rotas y términos/marcas que no deben publicarse.
- Flujo de GitHub Actions para construir, validar y desplegar en GitHub Pages.

## Estructura

```text
.
├── .github/workflows/deploy-pages.yml   # Despliegue automático
├── public/                              # CSS, JavaScript, SVG y manifiesto
├── scripts/
│   ├── build.mjs                        # Generador del sitio
│   ├── validate.mjs                     # Controles de publicación
│   ├── serve.mjs                        # Servidor local
│   └── dev.mjs                          # Compila y abre servidor local
├── src/
│   ├── page-copy.mjs                    # Textos de páginas ES/EN
│   └── site-data.mjs                    # Rutas, capacidades, sectores y datos
├── dist/                                # Sitio compilado listo para publicar
├── ASSETS.md                            # Política de recursos visuales
├── VALIDACION_PENDIENTE.md              # Aprobaciones antes de producción
└── README.md
```

## Requisitos

- Node.js 20 o superior. Se recomienda Node.js 22.
- Git, para subir el repositorio.

No es necesario instalar frameworks ni librerías.

## Uso local

```bash
npm run build
npm run validate
npm run preview
```

Abra `http://127.0.0.1:4173`.

También puede usar:

```bash
npm run dev
```

## Editar contenido

Los textos generales, capacidades, sectores, información de contacto y rutas se encuentran en:

```text
src/site-data.mjs
src/page-copy.mjs
```

Después de cualquier cambio:

```bash
npm run test
```

El comando genera nuevamente `dist/` y ejecuta la validación de publicación.

## Sustituir identidad e imágenes

El wordmark incluido es provisional. Reemplace:

```text
public/assets/images/eagle-wordmark.svg
public/favicon.svg
public/assets/images/og-image.svg
```

Los demás SVG son ilustraciones conceptuales originales. Para incorporar fotografías reales, siga los criterios de `ASSETS.md` y elimine marcas de fabricantes, referencias, pantallas, documentos, ubicaciones y cualquier información sensible antes de publicarlas.

## Formulario de contacto

La versión entregada valida los campos y, mientras no exista un backend, abre la aplicación de correo del visitante con la información preparada.

Para conectar un servicio aprobado, edite:

```text
public/assets/js/site-config.js
```

Ejemplo:

```js
window.EAGLE_SITE_CONFIG = Object.freeze({
  contactEndpoint: "https://dominio-autorizado.example/api/contact",
  contactEmail: "info@eaglecommercial.com.co"
});
```

El endpoint debe aceptar `POST` JSON y aplicar en el servidor:

- validación y normalización de entradas;
- protección antispam y límites de frecuencia;
- registro seguro de errores;
- cifrado en tránsito;
- política de retención y eliminación;
- consentimiento y tratamiento de datos aprobados por Eagle Commercial.

Nunca guarde claves, tokens o secretos en `site-config.js`, porque es un archivo público.

## Área autorizada

`/acceso/` y `/en/authorized-access/` son únicamente una demostración visual. No protegen información ni autentican usuarios. Antes de almacenar documentos técnicos se requiere un backend con identidad, autorización por roles, segundo factor, auditoría, expiración de sesiones y controles de descarga.

## Publicar en GitHub Pages

1. Cree un repositorio vacío en GitHub.
2. Suba este proyecto a la rama `main`.
3. En **Settings → Pages → Build and deployment**, seleccione **GitHub Actions**.
4. El flujo `.github/workflows/deploy-pages.yml` compilará, validará y publicará `dist/`.

Comandos iniciales:

```bash
git init
git add .
git commit -m "Nueva web corporativa de Eagle Commercial"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

## Dominio corporativo

El archivo `CNAME.example` es una plantilla. No se activa automáticamente para evitar cambios accidentales sobre el dominio vigente.

Cuando la nueva versión esté aprobada:

1. Defina el dominio o subdominio de publicación.
2. Configure los registros DNS según el proveedor de hosting.
3. Renombre `CNAME.example` a `CNAME` y escriba únicamente el dominio, cuando corresponda a GitHub Pages.
4. Confirme HTTPS antes de redirigir tráfico de producción.
5. Actualice `productionUrl` en `src/site-data.mjs` si cambia la URL final.

## Seguridad y confidencialidad

- No se incluyen marcas o modelos de fabricantes.
- No se incluyen rangos, frecuencias, potencias, precios, arquitecturas reales ni configuraciones de sistemas.
- El validador aplica reglas genéricas y puede recibir una lista privada de términos restringidos mediante la variable `EAGLE_RESTRICTED_TERMS`; los valores reales no deben guardarse en el repositorio.
- El repositorio no contiene credenciales ni secretos.
- Revise `SECURITY.md`, `ASSETS.md` y `VALIDACION_PENDIENTE.md` antes de producción.

## Lista mínima antes de publicar

- Logo oficial aprobado.
- Datos corporativos y empresas del grupo confirmados.
- Textos de capacidades aprobados por dirección, ingeniería y área jurídica.
- Políticas legales revisadas.
- Backend de formulario configurado.
- Área autorizada deshabilitada o implementada de forma segura.
- Dominio, analítica, cookies y monitoreo aprobados.
- Pruebas en móvil, tableta y escritorio.

## Comandos disponibles

```bash
npm run build      # Genera dist/
npm run validate   # Revisa páginas, activos, rutas y términos restringidos
npm run test       # Compila y valida
npm run preview    # Sirve dist/ en el puerto 4173
npm run dev        # Compila y sirve el sitio
```

© Eagle Commercial S.A. Todos los derechos reservados.
