
export const isMobile = () => {
  // @ts-ignore
  return window && 'ontouchstart' in window;
}
