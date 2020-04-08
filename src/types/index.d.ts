declare namespace Express {
  type NewType = import("../interfaces/IUserDocument").IUserDocument;

  interface Request {
    token: string;
    user: NewType;
  }
}
