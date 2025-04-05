export const getEventCountString = (events: number) => {
  if (events === 1) {
    return `${events} in-game event`
  }

  return `${events} in-game events`
}