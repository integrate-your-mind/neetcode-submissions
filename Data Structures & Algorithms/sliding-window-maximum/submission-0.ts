class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums: number[], k: number): number[] {
        const n: number = nums.length;
        const dequeue: number[] = [];
        const result: number[] = [];

        let head: number = 0;
        let tail: number = 0;

        for (let i = 0; i < n; i++) {
            while (
                head < tail &&
                nums[dequeue[tail - 1]] <= nums[i]
            ) {
                tail--;
            }

            dequeue[tail++] = i;

            if (dequeue[head] < i - k + 1) {
                head++;
            }

            if (i >= k - 1) {
                result[i - k + 1] = nums[dequeue[head]];
            }
        }

        return result;
    }
}