const colors = require('colors');
const app = require('./app');
const _config = require('./config');
require('./lib/db/dbConn');

const port = _config.port || 3000;

// *** START THE APP ***
try {
  app.listen(port, () => {
    // *** BRING IN DB ***
    app.emit('appStarted');
    if (!_config.inProduction) {
      console.log(colors.yellow(`eCommerce listening on port ${port}`));
    }
  });
} catch (error) {
  console.error(colors.red(`Error starting ecommerce app: ${error.message}`));
  process.exit(2);
}
