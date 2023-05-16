const {Router} = require("express");
const newsRouter = Router();
const {verifyToken, iscreator} = require("../middlewares/verifyToken");
const newsController = require("../controllers/newsController");

/**
 * @swagger
 *  components:
 *      schemas:
 *          NOTICIA:
 *              type: object
 *              properties: 
 *                  titulo:
 *                      type: string
 *                      description: Titulo de la noticia
 *                  descripcion:
 *                      type: string
 *                      description: Descripcion de la noticia
 *                  categoria:
 *                      type: string
 *                      description: categoria de la noticia
 *                  pais:
 *                      type: string
 *                      description: pais de la noticia
 *                  createdAt: 
 *                      type: date
 *                      description: fecha de la creacion
 *              required:
 *                  - titulo
 *                  - descripcion
 *                  - categoria
 *                  - pais
 *              example:
 *                  name: Example Noticia
 *                  descripcion: una descripcion
 *                  categoria: Categoria
 *                  pais: Mexico
 */

/**
 * @swagger
 * /crudNews/:
 *  post:
 *      summary: Registra una noticia
 *      tags: [NOTICIA]
 *      parameters:
 *          - name: x-auth-token
 *            in: header
 *            description: JWT token Valido
 *            required: true
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          titulo:
 *                              type: string
 *                              description: Titulo de la noticia
 *                          descripcion:
 *                              type: string
 *                              description: Descripcion de la noticia
 *                          categoria:
 *                              type: string
 *                              description: categoria de la noticia
 *                          pais:
 *                              type: string
 *                              description: pais de la noticia
 *      responses:
 *          501: 
 *              description: Noticia ya creada
 *          200:
 *              description: Noticia creada correctamente 
 */

newsRouter.post('/', [verifyToken, iscreator], newsController.crearNoticia);

/**
 * @swagger
 * /crudNews/:
 *  get:
 *      summary: Lee todas las noticias
 *      tags: [NOTICIA]
 *      parameters:
 *          - name: x-auth-token
 *            in: header
 *            description: JWT token Valido
 *            required: true
 *            type: string
 *      requestBody:
 *          required: false
 *      responses:
 *          404: 
 *              description: Noticias no encontradas
 *          401:
 *              description: Token no valido
 *          200:
 *              description: Listado de noticias
 *          500:
 *              description: Ocurrio un error
 * 
 */
newsRouter.get('/', [verifyToken], newsController.readNoticias);

/**
 * @swagger
 * /crudNews/{id}:
 *  put:
 *      summary: Actualizar una noticia por su id
 *      tags: [NOTICIA]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la noticia por actualizar
 *            required: true
 *            type: string
 *          - name: x-auth-token
 *            in: header
 *            description: JWT token Valido
 *            required: true
 *            type: string
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          titulo:
 *                              type: string
 *                              description: Titulo de la noticia
 *                          descripcion:
 *                              type: string
 *                              description: Descripcion de la noticia
 *                          categoria:
 *                              type: string
 *                              description: categoria de la noticia
 *                          pais:
 *                              type: string
 *                              description: pais de la noticia
 *      responses:
 *          404: 
 *              description: Noticia no actualizada
 *          401:
 *              description: Token no valido
 *          200:
 *              description: Actualizado correctamente
 *          500:
 *              description: Ocurrio un error
 */
newsRouter.put('/:id', [verifyToken, iscreator], newsController.updateNoticia);

/**
 * @swagger
 * /crudNews/{id}:
 *  get:
 *      summary: Leer una noticia por su id
 *      tags: [NOTICIA]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la noticia por leer
 *            required: true
 *            type: string
 *      requestBody:
 *          required: false
 *      responses:
 *          404: 
 *              description: Noticia no actualizada
 *          401:
 *              description: Token no valido
 *          200:
 *              description: Actualizado correctamente
 *          500:
 *              description: Ocurrio un error
 */
newsRouter.get('/:id', newsController.readNoticia);
/**
 * @swagger
 * /crudNews/{id}:
 *  delete:
 *      summary: Eliminar una noticia por su id
 *      tags: [NOTICIA]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la noticia por eliminar
 *            required: true
 *            type: string
 *          - name: x-auth-token
 *            in: header
 *            description: JWT token Valido
 *            required: true
 *            type: string
 *      requestBody:
 *          required: false
 *      responses:
 *          404: 
 *              description: Noticia no eliminada
 *          401:
 *              description: Token no valido
 *          200:
 *              description: Noticia eliminada correctamente
 *          500:
 *              description: Ocurrio un error
 */
newsRouter.delete('/:id', [verifyToken, iscreator], newsController.deleteNoticia);

module.exports = newsRouter;