const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Añadir lógica de paginación personalizada
server.use((req, res, next) => {
  if (req.method === 'GET' && req.path === '/products') {
    const { _page = 1, _per_page = 10 } = req.query;
    const page = parseInt(_page);
    const limit = parseInt(_per_page);

    req.query._page = page;
    req.query._limit = limit;

    const result = router.db.get('products').value();
    const total = result.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = page * limit;

    res.header('X-Total-Count', total);
    res.header('X-Total-Pages', pages);
    
    res.jsonp({
      data: result.slice(start, end),
      items: total,
      pages: pages,
      first: 1,
      last: pages,
      prev: page > 1 ? page - 1 : null,
      next: page < pages ? page + 1 : null
    });
  } else {
    next();
  }
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});