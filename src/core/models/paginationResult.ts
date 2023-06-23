export class PaginationResult<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;
}
