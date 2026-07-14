# Seguridad

Este repositorio genera un sitio estático y no implementa autenticación real ni almacena datos de formularios.

## Antes de producción

1. Conectar el formulario a un backend autorizado con validación del lado servidor, protección CSRF, límites de frecuencia y registro seguro.
2. Implementar el Área autorizada en un dominio o subdominio independiente, con autenticación multifactor, control de roles, auditoría y cifrado.
3. Configurar encabezados HTTP en el CDN o servidor: Content-Security-Policy, Strict-Transport-Security, Referrer-Policy, Permissions-Policy y X-Content-Type-Options.
4. No publicar fichas técnicas, modelos, marcas, frecuencias, alcances, precios, clientes, contratos ni imágenes operacionales sin aprobación formal.
5. Revisar periódicamente dependencias de las GitHub Actions y fijarlas a versiones aprobadas por TI.

Para reportes internos de seguridad, utilice el canal corporativo definido por Eagle Commercial S.A.
