export enum ApiErrorCode {
  SUCCESS = 200, // 成功
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500, // 服务器内部错误
  USER_ID_INVALID = 10001, // 用户id无效
  USER_NOTEXIST = 10002, // 用户id无效
  USER_EXIST = 10003, // 用户已存在
}
