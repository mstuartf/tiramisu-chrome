export interface Errors {
  [fieldName: string]: string[];
}

export interface ErrorRes {
  status: number;
  body: Errors;
}
