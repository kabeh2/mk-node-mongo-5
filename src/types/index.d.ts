declare namespace Express {
  interface Request {
    token?: string;
    user?: typeof import("../interfaces/IUserDocument");
  }
}
