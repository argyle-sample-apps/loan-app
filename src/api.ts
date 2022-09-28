// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json())
