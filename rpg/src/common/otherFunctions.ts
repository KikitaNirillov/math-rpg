export const fromStringToArrayOfNumbers = (string: string) => string.split(',').map(Number)

export const compareTwoArrays = (a: Array<number>, b: Array<number>): boolean => {
    if (a.length !== b.length) {
        return false
    }
    const bCopy = b.slice()
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < bCopy.length; j++) {
            if (a[i] === bCopy[j]) {
                bCopy.splice(j, 1)
                break
            }
            if (j === bCopy.length - 1) {
                return false
            }
        }
    }
    return true
}