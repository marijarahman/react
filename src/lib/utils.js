/**
 * @param fn
 * @param args
 */
export const partial = (fn, ...args) => fn.bind(null, ...args);

/**
 *
 * @param f
 * @param g
 * @private
 */
const _pipe = (f, g) => (...args) => g(f(...args));

/**
 *
 * @param fns
 */
export const pipe = (...fns) => fns.reduce(_pipe);

