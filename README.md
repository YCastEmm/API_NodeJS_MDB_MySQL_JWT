# 🎧 Backend de gestión multimedia con Node.js + MongoDB

Este proyecto es un backend desarrollado con Node.js y Express que permite gestionar usuarios, archivos multimedia y roles de acceso de forma segura y modular.  
Incluye autenticación con JWT, subida de archivos con Multer, validaciones con express-validator y control de acceso por roles.  


<br>

## 🚀 Funcionalidades principales

- ✅ Registro y login de usuarios con JWT
- ✅ Encriptación segura de contraseñas (bcrypt)
- ✅ Subida de archivos con Multer
- ✅ Acceso a archivos por ID
- ✅ Borrado lógico (soft delete)
- ✅ Middleware de autenticación y control de roles
- ✅ Validaciones con `express-validator`
- ✅ Manejo centralizado de errores y respuestas

<br>


## 🛠️ Tecnologías utilizadas

- **Node.js** + **Express**
- **MongoDB** + Mongoose
- **Multer** para manejo de archivos
- **JWT** para autenticación
- **bcrypt** para encriptar contraseñas
- **express-validator** para validaciones
- **mongoose-delete** para borrado lógico

<br>

## 📂 Estructura del proyecto
📦 src <br>
┣ 📁config <br>
┣ 📁controllers <br>
┣ 📁middlewares <br>
┣ 📁models <br>
┣ 📁routes <br>
┣ 📁storage <br>
┣ 📁utils <br>
┣ 📁validators <br>
┣ 📄app.js <br>
┗ 📄.env

<br>

## 📥 Instalación y uso

1. **Clonar el repositorio**  
   `git clone https://github.com/YCastEmm/API_NodeJS_Multimedia`  
   `cd API_NodeJS_Multimedia`

2. **Instalar las dependencias**  
   `npm install`

3. **Configurar las variables de entorno y crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:**  
   `PORT=3000`  
   `JWT_SECRET=tu_clave_secreta`  
   `PUBLIC_URL=http://localhost:3000`  
   `DB_URI=mongodb://localhost:27017/DB`

4. **Iniciar el servidor**  
`npm run dev`

<br>

## 📡 Endpoints

### 🔐 Autenticación

| Método | Ruta                   | Descripción                  | Autenticación |
|--------|------------------------|------------------------------|----------------|
| POST   | `/api/auth/register`   | Registro de nuevo usuario    | ❌              |
| GET    | `/api/auth/login`      | Login y generación de token  | ❌              |

---

### 🎵 Tracks (protegido)

| Método | Ruta                  | Descripción                          | Autenticación |
|--------|-----------------------|--------------------------------------|----------------|
| GET    | `/api/tracks/`        | Listar todos los tracks              | ✅              |
| GET    | `/api/tracks/:id`     | Obtener un track por ID              | ✅              |
| POST   | `/api/tracks/`        | Crear un nuevo track (solo admin)    | ✅ + 🔒         |
| PUT    | `/api/tracks/:id`     | Actualizar un track por ID           | ✅              |
| DELETE | `/api/tracks/:id`     | Eliminar un track (borrado lógico)   | ✅              |

> 🔒 Requiere rol `admin`.

---

### 🗂️ Storage (archivos)

| Método | Ruta                   | Descripción                          | Autenticación |
|--------|------------------------|--------------------------------------|----------------|
| GET    | `/api/storage/`        | Listar todos los archivos            | ✅              |
| GET    | `/api/storage/:id`     | Obtener archivo por ID               | ✅              |
| POST   | `/api/storage/`        | Subir un archivo (campo `myfile`)    | ✅              |
| DELETE | `/api/storage/:id`     | Borrado lógico de un archivo         | ✅              |
<br>

### 💻 Autor  
Desarrollado por **Yair Castagnola**

