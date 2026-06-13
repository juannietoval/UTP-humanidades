# UTP Humanidades

Proyecto React + Vite configurado para publicarse en GitHub Pages del repositorio:

- `https://juannietoval.github.io/UTP-humanidades/`

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

## Publicación en GitHub Pages (automática)

El repositorio incluye el workflow:

- `.github/workflows/deploy-pages.yml`

Este despliegue se ejecuta automáticamente en cada push a `main` (o manualmente desde **Actions** con `workflow_dispatch`).

> En el repositorio, configura **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Publicación manual (opcional)

```bash
npm run deploy
```

> El proyecto ya usa `base: '/UTP-humanidades/'` en `vite.config.js` para que las rutas funcionen correctamente en GitHub Pages.
