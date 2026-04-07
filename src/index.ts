import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { env } from './config/env';
import { globalRateLimit } from './middlewares/rateLimit';
import router from './router';

const app = express();
const isProduction = env.nodeEnv === 'production';

if (isProduction) {
  app.set('trust proxy', 1);
}

app.use(express.json());
app.use(helmet());
app.use(globalRateLimit);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === env.frontendOrigin) {
        return callback(null, true);
      }

      return callback(new Error('CORS origin not allowed'));
    },
    credentials: true,
  }),
);

app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(router);

app.listen(env.port, () => {
  console.log(`Servidor rodando na porta ${env.port}`);
});
