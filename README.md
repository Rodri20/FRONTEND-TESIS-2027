# Faultwise

Prototipo de tesis para monitoreo y predicción de fallas en pipelines CI/CD.

## Desarrollo

Requiere Node.js 22.18 o superior y npm.

```sh
npm install
npm run dev
```

## Verificación

```sh
npm run lint
npm test
npm run format:check
npm run build
```

`npm run format` aplica el formato de Prettier.

## Organización

- `app/page.tsx`: resumen.
- `app/predicciones`, `app/alertas`, `app/ejecuciones`, `app/evaluacion`: rutas de cada pantalla, compatibles con enlaces directos y navegación del navegador.
- `app/components`: interfaz y componentes interactivos.
- `app/lib/types.ts`: contratos de datos compartidos.
- `app/lib/demo-data.ts`: ejecuciones y alertas de demostración.
- `app/lib/executions.ts`: búsqueda, filtros y formato de fechas.
- `tests`: pruebas de lógica de filtros y fechas.

Usamos Next.js App Router, React, TypeScript y Tailwind CSS 4. Los estilos visuales existentes se conservan en `app/globals.css`; Tailwind se puede usar para la composición de componentes nuevos. El diálogo de ejecución utiliza el elemento nativo `dialog`, con cierre por Escape, foco contenido y devolución del foco al control de origen.

## Datos de demostración

No hay conexión con backend ni modelo predictivo. La predicción es una heurística ilustrativa y su historial dura mientras la vista permanece montada. Los períodos del historial se calculan respecto al 8 de noviembre de 2026 para mantener reproducibles los ejemplos. Las tarjetas de indicadores muestran valores ilustrativos; la matriz de confusión es un ejemplo independiente.
