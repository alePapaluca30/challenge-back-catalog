const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  if (req.method === "GET" && req.path === "/products") {
    const {
      _page = 1,
      _per_page = 10,
      sku,
      "category.name": categoryName,
      name,
    } = req.query;
    const page = parseInt(_page);
    const limit = parseInt(_per_page);

    let result = router.db.get("products").value();

    if (sku || name) {
      result = result.filter((product) => {
        const skuMatch = sku ? product.sku === sku : false;
        const nameMatch = name
          ? product.name.toLowerCase().includes(name.toLowerCase())
          : false;
        return skuMatch || nameMatch;
      });
    }

    if (categoryName)
      result = result.filter(
        (product) => product.category.name === categoryName
      );

    const total = result.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = page * limit;

    const paginatedData = result.slice(start, end);

    res.header("X-Total-Count", total);
    res.header("X-Total-Pages", pages);

    res.jsonp({
      data: paginatedData,
      items: total,
      pages: pages,
      first: 1,
      last: pages,
      prev: page > 1 ? page - 1 : null,
      next: page < pages ? page + 1 : null,
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

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
  } else {
    console.error("An error occurred:", error);
  }
});
