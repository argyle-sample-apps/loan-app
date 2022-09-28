export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export function getRandomIntFromRange(range: { min: number; max: number }) {
  return Math.floor(Math.random() * (range.max - range.min)) + range.min
}

export const fillWithRandom = (max: number, total: number, len = 4) => {
  let arr = new Array(len)
  let sum = 0
  do {
    for (let i = 0; i < len; i++) {
      arr[i] = Math.random()
    }
    sum = arr.reduce((acc, val) => acc + val, 0)
    const scale = (total - len) / sum
    arr = arr.map((val) => Math.min(max, Math.round(val * scale) + 1))
    sum = arr.reduce((acc, val) => acc + val, 0)
  } while (sum - total)
  return arr
}
