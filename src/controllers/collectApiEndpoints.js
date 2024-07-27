const extractEndpoints = require("../utils/extractEndPoints")

// this function will be exported to the end user's app to collect apis
// TODO : connect it with radar-api to show collected api points in UI when the user logs in
// TODO : add the feature to accept the apiKey as well for verification of app
const collectApiEndpoints = (app) => {
  const endpoints = extractEndpoints(app._router.stack);

  // Remove duplicate endpoints and clean up paths
  const uniqueEndpoints = endpoints.reduce((acc, endpoint) => {
    const key = `${endpoint.method}:${endpoint.path}`;
    if (!acc.map.has(key)) {
      acc.map.set(key, endpoint);
      acc.result.push(endpoint);
    }
    return acc;
  }, { map: new Map(), result: [] }).result;

  return uniqueEndpoints;
};

module.exports = collectApiEndpoints;
