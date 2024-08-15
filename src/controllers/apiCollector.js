const { default: axios } = require("axios");
const collectApiEndpoints = require("./collectApiEndpoints");

const apiCollector = (app) => {
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
    };

    res.on('finish', () => {
      const duration = process.hrtime(start);
      const durationInMs = duration[0] * 1000 + duration[1] / 1e6;

      logData.statusCode = res.statusCode;
      logData.responseTime = `${durationInMs.toFixed(3)} ms`;

      console.log(logData);

      // Send log data to radar-api
      // axios.post("",logData); //fire and forget
    });

    // return logData;
    next();
  });
};

module.exports = apiCollector;
