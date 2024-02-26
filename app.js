require('dotenv').config();
require('express-async-errors');

//extra security packages

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Swagger

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');

const express = require('express');
const app = express();

const connectDB = require('./db/connectDB');
const authenticateUser = require('./middleware/authentification');
//routers

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handler

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<h2>Jobster Project</h2> <a href="/api/docs">Swagger Documentation</a>'
    );
});
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//ro utes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, console.log(`Server is listening on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
