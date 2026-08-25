/**
 * ==============================================================================
 * 📌 ASYNC MUTEX LOCK UTILITY (src/lib/mutex.ts)
 * ==============================================================================
 * 💡 WHAT IS THIS?
 * A lightweight, zero-dependency async Mutex primitive.
 * Used by RTK Query's baseQueryWithReauth to synchronize concurrent 401
 * requests and prevent multiple simultaneous refresh token API calls (race condition).
 * ==============================================================================
 */

export class Mutex {
  private _locking: Promise<void> = Promise.resolve();
  private _isLocked: boolean = false;

  /**
   * Check whether the mutex is currently locked.
   */
  isLocked(): boolean {
    return this._isLocked;
  }

  /**
   * Acquire the lock. If already locked, waits in queue until previous locks are released.
   * Returns an unlock / release function that MUST be called when work is done.
   */
  async acquire(): Promise<() => void> {
    let releaseLock: () => void = () => {};

    // Chain onto the existing lock queue
    const previousLock = this._locking;

    this._locking = new Promise<void>((resolve) => {
      releaseLock = () => {
        this._isLocked = false;
        resolve();
      };
    });

    await previousLock;
    this._isLocked = true;

    return releaseLock;
  }

  /**
   * Wait until the mutex is unlocked without acquiring the lock.
   */
  async waitForUnlock(): Promise<void> {
    if (this._isLocked) {
      await this._locking;
    }
  }
}

export default Mutex;
