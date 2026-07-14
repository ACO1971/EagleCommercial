# Instrucciones para subir el sitio a GitHub

1. Descomprima el archivo ZIP.
2. Abra la carpeta extraida.
3. En GitHub, cree un repositorio vacio, sin README ni licencia.
4. Use **Add file > Upload files**.
5. Arrastre todo el contenido de esta carpeta. Deben quedar en la raiz `.github`, `dist`, `public`, `scripts`, `src`, `package.json` y los demas archivos.
6. Confirme con **Commit changes**.
7. Abra **Settings > Pages** y seleccione **GitHub Actions** como fuente.
8. Abra **Actions** y espere que `build` y `deploy` terminen en verde.

No publique archivos confidenciales, fichas tecnicas completas, claves, contrasenas ni archivos `.env` con datos reales.
