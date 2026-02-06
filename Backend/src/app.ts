import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import helmet from 'helmet';
import { allowedOrigins } from './app/utils/cors';
// import { allowedOrigins } from './app/utils/cors';
const app = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);


// Routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'The Match-Day Task Manager Server Is Running',
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
