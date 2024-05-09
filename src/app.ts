import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//! this is for cors error, but it's not working, so I commented it out. without this urls array, it's working fine.
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://dream-gadget.web.app/',
//   'https://dream-gadget.vercel.app/',
// ];
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   }),
// );
// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

// test api
app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Server is running',
  });
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
