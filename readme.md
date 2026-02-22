TIENDA DE ROPA
La web centrada en el backend principalmente se basa en el desarrollo de una API REST. Esta esta a su vez desarollada con Node.js, Express y Mongo DB como principal base de datos. Esta API permite:
- registro y login de usuarios
- autenticacion con sesiones que duran 24h si no se cierra la sesion.
- CRUD de products.
- subida de imagenes a Cloudinary por medio de multer.
- dashboard en el que se ven todos los productos.
- documentación interactiva con Swagger

TECNOLOGIAS REQUERIDAS:
Node.js

Express

MongoDB

Mongoose

Express-session

Bcrypt

Multer

Cloudinary

Method-override

Swagger (OpenAPI 3.0)

Swagger UI Express

COMO HACER LA INSTALACION:
1.- Instalamos dependencias en el bash con npm install (express, mongoose, supertest, method-override, cloudinary multer-storage-cloudinary multer, express-session bcrypt).
2-. Crear archivo .env:
PORT=3000
MONGO_URI=tu_mongo_uri
USER_SESSION_SECRET=supersecret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
3-. Ejecutar el servidor en el bash node index.js el servidor esta en el http://localhost:3000
4-. Creamos usuario administrador manualmente en el bash node createAdmin.js
5-. Podemos crear un usuario normal en el bash con node createUser.js

AUTENTICACION:
La autenticación se hace mediante sesiones:
*Al hacer login → se guarda req.session.userId
*Para acceder al dashboard → se comprueba sesión
*Logout → destruye sesión

ENDPOINTS:
-AUTH
GET /auth/login
POST /auth/login
GET /auth/register
POST /auth/register
GET /auth/logout
POST /auth/logout

-PRODUCTOS
GET /products/products
GET /products/products/:id
GET /products/dashboard
POST /products/dashboard
PUT /products/dashboard/:id
DELETE /products/dashboard/:id/delete

DOCUMENTACION DE LA API CON SWAGGER:
Una vez inicializadfo el servidor puede consultarse en http://localhost:3000/api-docs desde donde se pueden visualizar los endpoints, ver los modelos de datos y probar las peticiones desde el navegador.


SUBIR IMAGENES EN CLOUDINARY:
La subida se hace con multer y las imagenes se guardan en la cuenta de cloudinry.


SEGURIDAD:
-Passwords hasheadas con bcrypt
-Validación de email
-Validación de password (letras + números)
-Sesiones protegidas
-Method override para PUT y DELETE


PROXIMAS MEJORAS:
- Darle estilo con styles.css
- Desarrollo de frontend con React
- Separación clara de roles (admin / user)
- Middleware de protección por rol
- Dockerizar el proyecto