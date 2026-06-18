class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s: string, t: string): string {
        if (t === "") return "";
        const n: number = s.length;

        const countT: Record<string, number> = {};

        for (const char of t) {
            countT[char] = (countT[char] ?? 0) + 1;
        }

        const window: Record<string, number> = {};
        let have: number = 0;
        let need: number = Object.keys(countT).length;
        let res: [number, number] = [-1, -1];
        let resLen: number = Infinity;
        let left: number = 0;

        for (let right = 0; right < n; right++) {
            const char: string = s[right];

            window[char] = (window[char] ?? 0) + 1;

            if (char in countT && window[char] === countT[char]) {
                have++;
            }

            while (have === need) {
                const idx: number = right - left + 1;

                if (idx < resLen) {
                    res = [left, right];
                    resLen = idx;
                }


                const leftChar: string = s[left];

                window[leftChar]--;

                if (leftChar in countT && window[leftChar] < countT[leftChar]) {
                    have--;
                }

                left++;
            }
        }
        return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1);
    }
}
