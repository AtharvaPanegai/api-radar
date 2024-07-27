// this is helper function of helper function which will return us clean output of
const _extractBasePath = (regexSource) => {
    const cleanedPath = regexSource
      .replace(/^\^\\/, '')
      .replace(/\\\/?$/, '')
      .replace(/(?=\(.*\))/, '')
      .replace(/\\\//g, '/');
  
    return cleanedPath.replace(/\?\(\?=\/\|\$\)/g, '').replace(/\/+$/, '');
  };

// This function grabs the routes from app route stacks and push them into endpoint array
  const extractEndpoints = (stack, basePath = '', endpoints = []) => {
  stack.forEach((middleware) => {
    if (middleware.route) { // Routes registered directly on the app
      const path = basePath + middleware.route.path;
      middleware.route.stack.forEach((routeLayer) => {
        const method = routeLayer.method.toUpperCase();
        endpoints.push({ method, path });
      });
    } else if (middleware.name === 'router' && middleware.handle.stack) { // Router middleware
      const nestedBasePath = basePath + _extractBasePath(middleware.regexp.source);
      extractEndpoints(middleware.handle.stack, nestedBasePath, endpoints);
    }
  });
  return endpoints;
};

module.exports = extractEndpoints;
