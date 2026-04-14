# Nyx Digital Web

Una aplicación web moderna y completa para la agencia digital Nyx Digital, construida con React en el frontend y Node.js/Express en el backend.

## ð Características Principales

### Frontend (React)
- **Diseño Moderno**: Interfaz elegante con efectos visuales y animaciones suaves
- **Responsive Design**: Adaptable a todos los dispositivos móviles y de escritorio
- **Componentes Reutilizables**: Arquitectura basada en componentes con React
- **Navegación Intuitiva**: Sistema de routing con React Router
- **Formularios Inteligentes**: Validación en tiempo real y manejo de errores
- **Estados de Carga**: Indicadores visuales durante las operaciones asíncronas

### Backend (Node.js/Express)
- **API RESTful**: Endpoints bien estructurados con métodos HTTP adecuados
- **Base de Datos MongoDB**: Almacenamiento flexible y escalable con Mongoose
- **Autenticación JWT**: Sistema seguro de autenticación basado en tokens
- **Validación de Entrada**: Sanitización y validación robusta de datos
- **Servicio de Email**: Notificaciones automáticas para formularios de contacto
- **Seguridad**: Helmet, CORS, rate limiting y otras medidas de seguridad

## ð¡ Arquitectura del Proyecto

```
nyx-digital-web/
âââ nyx-digital/                 # Frontend React
â   âââ src/
â   â   âââ components/          # Componentes UI reutilizables
â   â   âââ pages/              # Páginas principales
â   â   âââ services/           # Servicios API
â   â   âââ hooks/              # Hooks personalizados
â   â   âââ styles/             # Estilos CSS y responsive
â   â   âââ assets/             # Imágenes y recursos
â   â   âââ App.jsx             # Componente principal
â   â   âââ main.jsx            # Punto de entrada
â   âââ package.json
â   âââ vite.config.js
â   âââ .env.example
â
âââ backend/                     # Backend Node.js
â   âââ config/                  # Configuración de base de datos
â   âââ models/                  # Modelos de datos Mongoose
â   âââ routes/                  # Rutas API
â   âââ middleware/              # Middleware personalizado
â   âââ utils/                   # Utilidades (email, etc.)
â   âââ server.js                # Servidor principal
â   âââ package.json
â   âââ .env.example
â
âââ README.md                    # Documentación principal
```

## ð Endpoints de la API

### Contacto
- `POST /api/contact` - Enviar formulario de contacto
- `GET /api/contact` - Obtener todos los contactos (admin)
- `GET /api/contact/:id` - Obtener contacto específico
- `PUT /api/contact/:id` - Actualizar contacto
- `POST /api/contact/:id/notes` - Añadir nota a contacto

### Servicios
- `GET /api/services` - Obtener todos los servicios
- `GET /api/services/popular` - Obtener servicios populares
- `GET /api/services/:slug` - Obtener servicio por slug
- `POST /api/services` - Crear servicio (admin)
- `PUT /api/services/:id` - Actualizar servicio (admin)
- `DELETE /api/services/:id` - Eliminar servicio (admin)

### Proyectos
- `GET /api/projects` - Obtener todos los proyectos
- `GET /api/projects/featured` - Obtener proyectos destacados
- `GET /api/projects/:slug` - Obtener proyecto por slug

### Usuarios
- `POST /api/users/register` - Registrar usuario
- `POST /api/users/login` - Iniciar sesión
- `GET /api/users/profile` - Obtener perfil
- `PUT /api/users/profile` - Actualizar perfil

## ð Tecnologías Utilizadas

### Frontend
- **React 19.2.4** - Framework de UI
- **React Router 7.14.0** - Navegación
- **Vite 8.0.4** - Build tool
- **CSS3** - Estilos y animaciones

### Backend
- **Node.js** - Runtime de JavaScript
- **Express 4.18.2** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose 7.4.0** - ODM para MongoDB
- **JWT** - Autenticación
- **Nodemailer 6.9.4** - Envío de emails
- **bcryptjs** - Hashing de contraseñas

## ð Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- MongoDB (instalado localmente o MongoDB Atlas)
- npm o yarn

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd nyx-digital-web
```

### 2. Configurar el Backend
```bash
cd backend
npm install
cp .env.example .env
```

Configurar las variables de entorno en `.env`:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/nyx-digital
JWT_SECRET=tu-secreto-super-seguro
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-app
```

### 3. Configurar el Frontend
```bash
cd ../nyx-digital
npm install
cp .env.example .env
```

Configurar las variables de entorno en `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_NODE_ENV=development
```

### 4. Iniciar MongoDB
```bash
# Para MongoDB local
mongod

# O usar MongoDB Atlas (configurar en .env)
```

### 5. Iniciar los Servidores
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd nyx-digital
npm run dev
```

### 6. Acceder a la Aplicación
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/health

## ð¡ Desarrollo

### Scripts del Frontend
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Previsualizar build
npm run lint     # Linting del código
```

### Scripts del Backend
```bash
npm run dev      # Servidor con nodemon
npm start        # Servidor de producción
npm test         # Ejecutar tests
```

### Estructura de Componentes
- **Navbar**: Navegación responsive con menú móvil
- **Hero**: Sección principal con animaciones
- **Services**: Grid de servicios con filtrado
- **ContactPage**: Formulario de contacto completo
- **Footer**: Información de contacto y redes sociales

### Hooks Personalizados
- `useApi`: Para llamadas a API genéricas
- `useFormApi`: Para manejo de formularios
- `usePaginatedApi`: Para datos paginados
- `useRealTimeApi`: Para datos en tiempo real

## ð¡ Despliegue

### Frontend (Vercel/Netlify)
1. Build del proyecto: `npm run build`
2. Desplegar la carpeta `dist`
3. Configurar variables de entorno

### Backend (Heroku/Railway)
1. Configurar variables de entorno
2. Asegurar conexión a MongoDB
3. Configurar dominio y SSL

### Variables de Entorno de Producción
```env
NODE_ENV=production
FRONTEND_URL=https://tudominio.com
MONGODB_URI=mongodb+srv://...
JWT_SECRET=secreto-muy-seguro
EMAIL_USER=email@tudominio.com
EMAIL_PASS=contraseña-segura
```

## ð¡ Contribución

1. Fork del proyecto
2. Crear rama de feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit de cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Pull Request

## ð¡ Licencia

MIT License - Ver archivo LICENSE para detalles

## ð¡ Soporte

Para soporte o preguntas:
- Email: contacto@nyxdigital.com
- GitHub Issues: [Repository Issues]

---

**Nyx Digital** - Tu partner digital para el éxito
