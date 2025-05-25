const Sequencer = require('@jest/test-sequencer').default;

/**
 * Custom test sequencer to ensure tests run in a specific order
 */
class CustomSequencer extends Sequencer {
  /**
   * Sort test paths to determine the order of test execution
   * @param {Array} tests Array of test objects
   * @returns {Array} Sorted array of test objects
   */
  sort(tests) {
    // Define the order of test files
    const testOrder = [
      '01-launch.test.ts',
      '02-verify-token.test.ts',
      '03-deposit.test.ts',
      '04-get-balance.test.ts',
      '05-withdraw.test.ts',
      '06-rollback.test.ts',
      // Add other test files in the desired order
    ];

    // Sort tests based on the predefined order
    return tests.sort((testA, testB) => {
      const fileNameA = testA.path.split('/').pop();
      const fileNameB = testB.path.split('/').pop();

      const indexA = testOrder.indexOf(fileNameA);
      const indexB = testOrder.indexOf(fileNameB);

      // If both files are in the testOrder array, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // If only one file is in the testOrder array, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      // For files not in the testOrder array, maintain their original order
      return 0;
    });
  }
}

module.exports = CustomSequencer;