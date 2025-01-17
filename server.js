const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  if (req.method === 'GET' && req.path === '/products') {
    try {
      const { _page = 1, _per_page = 10, sku, 'category.name': categoryName, name } = req.query;
      const page = parseInt(_page);
      const limit = parseInt(_per_page);

      let result = router.db.get('products').value();

      if (sku || name) {
        result = result.filter(product => {
          const skuMatch = sku ? product.sku === sku : false;
          const nameMatch = name ? product.name.toLowerCase().includes(name.toLowerCase()) : false;
          return skuMatch || nameMatch;
        });
      }

      if (categoryName) result = result.filter(product => product.category.name === categoryName);

      if (result.length === 0) return res.status(404).json("No encontrado");

      const total = result.length;
      const pages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const end = page * limit;

      const paginatedData = result.slice(start, end);

      // Set pagination information in headers
      res.header('X-Total-Count', total.toString());
      res.header('X-Total-Pages', pages.toString());
      res.header('X-Page', page.toString());
      res.header('X-Per-Page', limit.toString());
      res.header('X-Next-Page', (page < pages ? page + 1 : null)?.toString());
      res.header('X-Prev-Page', (page > 1 ? page - 1 : null)?.toString());
      
      // Return only the data array
      res.jsonp(paginatedData);
    } catch (error) {
      console.error('Error interno del servidor:', error);
      res.status(500).json("No se pudo cargar");
    }
  } else {
    next();
  }
});

server.use(router);

server.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json("No se pudo cargar");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

