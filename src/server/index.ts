export type Error = {
  status?: number;
  code?: string;
  title?: string;
  detail?: string;
  source?: {
    pointer?: string;
  };
};

export type Response<T> = {
  data: T | null;
  errors?: Error[];
};
