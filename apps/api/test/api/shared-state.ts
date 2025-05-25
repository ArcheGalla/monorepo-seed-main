import * as fs from 'fs';
import * as path from 'path';

/**
 * File-based shared state module for storing and retrieving data between tests
 */
class SharedState {
  private static instance: SharedState;
  private statePath: string;

  private constructor() {
    this.statePath = path.resolve(__dirname, '.test-state.json');

    // Initialize empty state file if it doesn't exist
    if (!fs.existsSync(this.statePath)) {
      this.writeState({});
    }
  }

  /**
   * Get the singleton instance of SharedState
   */
  public static getInstance(): SharedState {
    if (!SharedState.instance) {
      SharedState.instance = new SharedState();
    }
    return SharedState.instance;
  }

  /**
   * Read the current state from file
   */
  private readState(): Record<string, any> {
    try {
      const data = fs.readFileSync(this.statePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading shared state:', error);
      return {};
    }
  }

  /**
   * Write state to file
   */
  private writeState(state: Record<string, any>): void {
    try {
      fs.writeFileSync(this.statePath, JSON.stringify(state, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing shared state:', error);
    }
  }

  /**
   * Set a value in the shared state
   * @param key The key to store the value under
   * @param value The value to store
   */
  public set(key: string, value: any): void {
    const state = this.readState();
    state[key] = value;
    this.writeState(state);
  }

  /**
   * Get a value from the shared state
   * @param key The key to retrieve
   * @returns The stored value or undefined if not found
   */
  public get(key: string): any {
    const state = this.readState();
    return state[key];
  }

  /**
   * Check if a key exists in the shared state
   * @param key The key to check
   * @returns True if the key exists, false otherwise
   */
  public has(key: string): boolean {
    const state = this.readState();
    return key in state;
  }

  /**
   * Clear all data in the shared state
   */
  public clear(): void {
    this.writeState({});
  }
}

export default SharedState.getInstance();
