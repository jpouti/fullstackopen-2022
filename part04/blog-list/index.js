const app = require('./app')
const logger = require('./utils/logger');
const config = require('./utils/config');
const http = require('http');

const server = http.createServer(app);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})