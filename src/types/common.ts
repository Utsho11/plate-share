/* eslint-disable @typescript-eslint/no-explicit-any */
export type IMeta = {
  page: string;
  limit: string;
  total: string;
};

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
