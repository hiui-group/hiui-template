export * from './format'
export * from './native'
export * from './request'

export const sleep = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

let AUTO_INREMENT_COUNT:number = 0;
export const getAutoInrementId = ():number => {
  return AUTO_INREMENT_COUNT++;
}