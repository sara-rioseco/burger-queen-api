const { MongoClient } = require('mongodb');
const {
  requireAuth,
  requireAdmin,
} = require('../middleware/auth');
const Product = require('../models/product');
const config = require('../config');
const { getProducts } = require('../controller/products');

/** @module products */
module.exports = (app, nextMain) => {
  /**
   * @name GET /products
   * @description Lista productos
   * @path {GET} /products
   * @query {String} [page=1] Página del listado a consultar
   * @query {String} [limit=10] Cantitad de elementos por página
   * @header {Object} link Parámetros de paginación
   * @header {String} link.first Link a la primera página
   * @header {String} link.prev Link a la página anterior
   * @header {String} link.next Link a la página siguiente
   * @header {String} link.last Link a la última página
   * @auth Requiere `token` de autenticación
   * @response {Array} products
   * @response {String} products[]._id Id
   * @response {String} products[].name Nombre
   * @response {Number} products[].price Precio
   * @response {URL} products[].image URL a la imagen
   * @response {String} products[].type Tipo/Categoría
   * @response {Date} products[].dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   */
  app.get('/products', requireAuth, getProducts);

  /**
   * @name GET /products/:productId
   * @description Obtiene los datos de un producto especifico
   * @path {GET} /products/:productId
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.get('/products/:productId', requireAuth, async (req, res, next) => {
    try {
      // Obtener el ID desde params
      const { productId } = req.params;

      // Buscar producto en la base de datos
      const productToGet = await Product.findOne({ _id: productId });

      // Si no se encuentra el producto, devolver error 404
      if (!productToGet) {
        return res.status(404).json({ error: 'El producto no existe' });
      }

      // Verificar si hay autorización
      const isAuth = req.authorization !== '';

      if (!isAuth) {
        return res.status(401).json({ message: 'Sin autorización' });
      }

      console.info('Producto obtenido exitosamente.');
      // Devolver una respuesta exitosa
      res.status(200).json({
        message: 'producto encontrado',
        id: productToGet._id,
        name: productToGet.name,
        price: productToGet.price,
        image: productToGet.image,
        type: productToGet.type,
        dateEntry: productToGet.dateEntry,
      });
    } catch (error) {
      console.error('Error al buscar usuario', error);
    }
  });

  /**
   * @name POST /products
   * @description Crea un nuevo producto
   * @path {POST} /products
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @body {String} name Nombre
   * @body {Number} price Precio
   * @body {String} [imagen]  URL a la imagen
   * @body {String} [type] Tipo/Categoría
   * @response {Object} product
   * @response {String} products._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican `name` o `price`
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.post('/products', requireAdmin, async (req, res, next) => {
    try {
      // Obtener los datos del cuerpo de la solicitud
      const {
        name, price, image, type,
      } = req.body;

      if (!name || !price) {
        return res.status(400).json({ message: 'Debe proporcionar un nombre y un precio' });
      }

      // Crear una instancia de MongoClient para conectar con la base de datos
      const client = new MongoClient(config.dbUrl);
      await client.connect();
      // Obtener referencia a la base de datos y colección
      const db = client.db();
      const productsCollection = db.collection('products');

      // Verificar si el usuario autenticado es un administrador
      const isAdmin = req.isAdmin === 'admin';

      if (!isAdmin) {
        return res.status(403).json({ message: 'No tiene autorización para agregar productos' });
      }

      // Verificar si hay autorización
      const isAuth = req.authorization !== '';

      if (!isAuth) {
        return res.status(401).json({ message: 'No hay información de autorización' });
      }

      // Verificar si ya existe el producto
      const existingProduct = await Product.findOne({ name });

      if (existingProduct) {
        await client.close();
        return res.status(404).json({ error: 'Este producto ya está registrado' });
      }

      // OBTENER FECHA Y HORA ACTUAL EN FORMATO CORRECTO
      const getDateAndTime = () => {
        const now = new Date();

        return now.toISOString().replace(/[TZ]+/gm, ' ').substring(0, 19);
      };

      // Lógica para crear el producto
      const newProduct = {
        name,
        price,
        image,
        type,
        dateEntry: getDateAndTime(),
      };

      // Insertar el nuevo producto en la base de datos
      const insertedProduct = await productsCollection.insertOne(newProduct);

      await client.close();

      console.info('Producto creado exitosamente.');
      // Enviar la respuesta con los detalles del producto creado
      res.status(200).json({
        id: insertedProduct.insertedId,
        name: newProduct.name,
        price: newProduct.price,
        image: newProduct.image,
        type: newProduct.type,
        dateEntry: newProduct.dateEntry,
      });
    } catch (error) {
      console.error('Error al agregar producto', error);
    }
  });

  /**
   * @name PATCH /products
   * @description Modifica un producto
   * @path {PATCH} /products
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación y que el producto sea **admin**
   * @body {String} [name] Nombre
   * @body {Number} [price] Precio
   * @body {String} [imagen]  URL a la imagen
   * @body {String} [type] Tipo/Categoría
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican ninguna propiedad a modificar
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.patch('/products/:productId', requireAdmin, async (req, res, next) => {
    try {
      // Obtener el ID desde params
      const { productId } = req.params;

      // Obtener los datos del cuerpo de la solicitud
      const {
        name, price, image, type,
      } = req.body;

      // Buscar producto en la base de datos
      const productToUpdate = await Product.findOne({ _id: productId });

      // Si no se encuentra el producto, devolver error 404
      if (!productToUpdate) {
        return res.status(404).json({ error: 'El producto no existe' });
      }

      // Verificar si el usuario autenticado es un administrador
      const isAdmin = req.isAdmin === 'admin';

      if (!isAdmin) {
        return res.status(403).json({ error: 'No tiene autorización para modificar productos' });
      }

      // Verificar si hay autorización
      const isAuth = req.authorization !== '';

      if (!isAuth) {
        return res.status(401).json({ error: 'Sin autorización' });
      }

      // Verificar si se proporciona al menos una propiedad para modificar
      if (Object.keys(req.body).length === 0 || name === '' || price === '' || typeof price !== 'number' || image === '' || type === '') {
        return res.status(400).json({ error: 'Proporciona al menos una propiedad para modificar' });
      }

      // Actualizar las propiedades del producto si se proporcionan en el cuerpo de la solicitud
      if (name) {
        if (typeof name !== 'string') {
          return res.status(400).json({ error: 'Proporciona las propiedades a editar en el formato adecuado' });
        }
        productToUpdate.name = name;
      }

      if (price) {
        if (typeof price !== 'number') {
          return res.status(400).json({ error: 'Proporciona las propiedades a editar en el formato adecuado' });
        }
        productToUpdate.price = price;
      }

      if (image) {
        if (typeof image !== 'string') {
          return res.status(400).json({ error: 'Proporciona las propiedades a editar en el formato adecuado' });
        }
        productToUpdate.image = image;
      }

      if (type) {
        if (typeof type !== 'string') {
          return res.status(400).json({ error: 'Proporciona las propiedades a editar en el formato adecuado' });
        }
        productToUpdate.type = type;
      }

      // Guardar los cambios en la base de datos
      await productToUpdate.save();

      console.info('Producto actualizado exitosamente.');
      // Devolver una respuesta exitosa con los detalles del producto actualizado
      res.status(200).json({
        id: productToUpdate._id,
        name: productToUpdate.name,
        price: productToUpdate.price,
        image: productToUpdate.image,
        type: productToUpdate.type,
        dateEntry: productToUpdate.dateEntry,
      });
    } catch (error) {
      console.error('Error al buscar usuario', error);
    }
  });

  /**
   * @name DELETE /products
   * @description Elimina un producto
   * @path {DELETE} /products
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación y que el producto sea **admin**
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es ni admin
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.delete('/products/:productId', requireAdmin, async (req, res, next) => {
    try {
      // Obtener el ID o correo de producto a eliminar desde los parámetros de la URL
      const { productId } = req.params;

      // Buscar el producto en la base de datos
      const productToDelete = await Product.findOne({ _id: productId });

      // Verificar si el usuario autenticado es un administrador
      const isAdmin = req.isAdmin === 'admin';

      // Si el usuario no es un administrador devolver un error 403
      if (!isAdmin) {
        return res.status(403).json({ error: 'No tienes autorización para eliminar este producto' });
      }

      // Si no se encuentra el producto, devolver un error 404
      if (!productToDelete) {
        return res.status(404).json({ error: 'El producto que intentas eliminar no existe' });
      }

      // Verificar si hay autorización
      const isAuth = req.authorization !== '';

      if (!isAuth) {
        return res.status(401).json({ message: 'No hay infromación de autorización' });
      }

      // Eliminar la producto de la base de datos
      await Product.deleteOne({ _id: productToDelete._id });

      console.info('Producto eliminado exitosamente.');
      // Devolver una respuesta exitosa
      return res.status(200).json({
        message: 'producto eliminado exitosamente',
        id: productToDelete._id,
        name: productToDelete.name,
        price: productToDelete.price,
        image: productToDelete.image,
        type: productToDelete.type,
        dateEntry: productToDelete.dateEntry,
      });
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  });

  nextMain();
};
