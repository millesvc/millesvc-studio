# Imágenes de la página Proyectos

Cada proyecto tiene tres archivos WebP. Se generaron a partir de las composiciones entregadas por el propietario, sin retocar su contenido: solo se cambió el tamaño y el encuadre.

| Proyecto | Escritorio (2x / 1x) | Móvil (≤720 px) |
|---|---|---|
| 01 Café Brunch | `cafe-brunch-portfolio.webp` (1600×914) / `-800` | `cafe-brunch-portfolio-movil.webp` (900×948, encuadre centrado en el celular) |
| 02 EasyTech Store — Chatbot | `easytech-chatbot-portfolio.webp` (1600×900) / `-800` | `easytech-chatbot-portfolio-movil.webp` (1066×941, encuadre con los dos celulares) |
| 03 OEL Equipos Médicos | `oel-ecommerce-portfolio.webp` (1600×800, recorte 2:1) / `-800` | `oel-ecommerce-portfolio-movil.webp` (800×450, imagen completa 16:9) |

Para reemplazar una imagen, genera las tres variantes con las mismas proporciones y conserva los nombres. Si cambian las proporciones, ajusta `aspect-ratio` en el bloque "PROYECTOS PAGE" de `styles.css` y los atributos `width`/`height` del `<picture>` en `proyectos.html` y en `proyectos/index.html`.
