export class QueryResultsModel<T = any> {
  // fields
  Description: any[];
  Content: T;
  IsSuccessful: boolean;

  constructor(_description: any[] = [], _totalCount: number = 0, _errorMessage: string = '') {
    this.Description = _description;
  }
}

export class ListQueryResultModel<T = any> extends QueryResultsModel<GenericQueryResult<T>> {}

export interface GenericQueryResult<T = any> {
  Entities: T[];
  Pagination: PaginationResult;
}

export interface PaginationResult {
  PageNo: number;
  PageCount: number;
  TotalRowCount: number;
  FirstPage: boolean;
  PreviousPage: boolean;
  NextPage: boolean;
  LastPage: boolean;
}
