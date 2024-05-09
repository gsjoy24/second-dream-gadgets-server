import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const responseData: TResponse<T> = {
    success: data.success,
    statusCode: data.statusCode || 200,
    message: data.message,
  };

  if (data.meta) {
    responseData.meta = data.meta;
  }
  responseData.data = data.data;

  return res.status(data?.statusCode).json(responseData);
};

export default sendResponse;
