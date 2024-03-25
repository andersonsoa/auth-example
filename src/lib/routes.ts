/**
 * Routes that are public
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * Routes used to Authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * API routes for authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile";
