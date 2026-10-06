export class AdminUserAlreadyExistsError extends Error {
  constructor() {
    super("An admin user already exists");
  }
}

export class InitialUserNotAdminError extends Error {
  constructor() {
    super("The initial user must be an admin user");
  }
}
