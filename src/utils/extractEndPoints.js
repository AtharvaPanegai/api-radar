
// This function grabs the routes from app route stacks and push them into endpoint array
export const extractEndpoints = (stack, basePath = '', endpoints = []) => {
    stack.forEach((middleware) => {
        if (middleware.route) { // Routes registered directly on the app
            const path = basePath + middleware.route.path;
            middleware.route.stack.forEach((routeLayer) => {
                const method = routeLayer.method.toUpperCase();
                endpoints.push({ method, path });
            });
        } else if (middleware.name === 'router' && middleware.handle.stack) { // Router middleware
            const nestedBasePath = basePath + extractBasePath(middleware.regexp.source);
            extractEndpoints(middleware.handle.stack, nestedBasePath);
        }
    });
    return endpoints;
};

