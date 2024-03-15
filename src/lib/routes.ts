/**
 * Routes that are public
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Routes used to Authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

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
