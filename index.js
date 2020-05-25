'use strict'

/**
 * Simple callback queue
 *
 * @class
 * @module cbq-js
 * @license MIT
 */
class CbQ {
  constructor () {
    this.q = new Map()
  }

  /**
   * Adds a callback to a named queue, creating it if it does not exist.
   *
   * @param {string} k - queue key/ID
   * @param {Function} cb - callback to add
   */
  push (k, cb) {
    if (!this.q.has(k)) {
      this.q.set(k, [])
    }

    const q = this.q.get(k)
    q.push(cb)
  }

  /**
   * Calls every callback in a named queue with the provided parameters if it
   * is found.
   *
   * @param {string} k - queue key/ID
   * @param {Error} err - first argument to callbacks
   * @param {*} res - second argument to callbacks
   */
  trigger (k, err, res) {
    const q = this.q.get(k)

    if (!q) return

    this.q.delete(k)
    q.forEach(cb => cb(err, res))
  }

  /**
   * Returns the length of the named queue
   *
   * @param {string} k - queue key/ID
   * @returns {number} length
   */
  cnt (k) {
    const q = this.q.get(k)
    if (!q) return 0
    return q.length
  }
}

module.exports = CbQ
