/**
 * Collection of available roles
 *
 * You must use these roles for your <auth> wrapper or v-auth directive
 * @readonly Do not modify
 */
const roles = ['SUPERADMIN', 'ADMIN', 'USER', 'ALL']
/**
 * SUPERADMIN permission
 * @readonly Do not modify
 */
const SUPERADMIN = ['SUPERADMIN']
/**
 * ADMIN permission
 * @readonly Do not modify
 */
const ADMIN = ['ADMIN']
/**
 * EDITOR permission
 * @readonly Do not modify
 */
const USER = ['USER']
/**
 * COLABORATOR permission
 *
 * Including EDITOR permission
 * @readonly Do not modify
 */
/**
 * Normal user permission
 * @readonly Do not modify
 */
const ALL = ['ALL']
/**
 * Only if user is the author of item
 * @readonly Do not modify
 */

export { roles, SUPERADMIN, ADMIN, ALL, USER }
