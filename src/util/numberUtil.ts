export const getRandomInteger = (range: number) => Math.floor(Math.random() / (1 / range))

export const getRandomFunNumber = (range: number, funFactor = 2) => {
  let sum = 0

  const fullIterations = Math.floor(funFactor)
  for (let i = 0; i < fullIterations; i++) {
    sum += Math.random() / (1 / range)
  }

  const restFactor = funFactor - fullIterations
  if (restFactor > 0) {
    sum += (Math.random() / (1 / range)) * restFactor
  }

  return (sum / funFactor + 0.5 * range) % range
}
