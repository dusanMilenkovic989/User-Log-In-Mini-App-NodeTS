import 'reflect-metadata'
import { RequestHandler } from 'express'
import { METADATA_KEYS, HandlerPropertyDescriptor } from '../../types'

/**
 * Decorator factory which registers middleware provided as metadata for later usage inside the controller decorator.
 * @param {RequestHandler} middleware Middleware to be ran on visiting certain server route path before Express's request (route) handler.
 * @returns {Function} Returns method decorator.
 */
const use = (middleware: RequestHandler): Function =>
    /**
     * Method decorator which registers middleware as metadata for later usage inside the controller decorator.
     * @param {Object} target Class prototype.
     * @param {string | symbol} key Method of the class prototype.
     * @param {HandlerPropertyDescriptor} propDesc Property descriptor with customized *value* property to represent the Express RequestHandler type and, hence, prevent this method decorator to be used on method other than the Express request (route) handler.
     * @returns {void} No return value.
     */
    (target: Object, key: string | symbol, propDesc: HandlerPropertyDescriptor): void =>
    {
        const MIDDLEWARES = Reflect.getMetadata(METADATA_KEYS.middlewares, target, key) || []
        Reflect.defineMetadata(METADATA_KEYS.middlewares, [...MIDDLEWARES, middleware], target, key)
    }

export { use }