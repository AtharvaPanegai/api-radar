const collectApiEndpoints = require("./collectApiEndpoints");
const { _sendApiLogToRadar } = require("../utils/gateway.utils");

const AddRadar = (app,projectId,apiKey) => {
  app.use((req, res, next) => {
    if (!req.app.locals.apiEndpoints) {
      req.app.locals.apiEndpoints = collectApiEndpoints(app);
    }
    next();
  });

  app.use((req, res, next) => {
    const start = process.hrtime();

    const logData = {
      method: req.method,
      path: req.originalUrl,
      projectId : projectId
    };

    res.on('finish', () => {
      const duration = process.hrtime(start);
      const durationInMs = duration[0] * 1000 + duration[1] / 1e6;

      logData.statusCode = res.statusCode;
      logData.responseTime = `${durationInMs.toFixed(3)} ms`;

      _sendApiLogToRadar(apiKey,logData);
    });

    // return logData;
    next();
  });
};

module.exports = AddRadar;
