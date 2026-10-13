export class UserNotFoundError extends Error {
  constructor() {
    super("Couldn't find the searched user");
  }
}
