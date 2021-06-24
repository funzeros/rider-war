export const getIndexFromDOMS = (x: number, doms: NodeList) => {
  for (let index = 0; index < doms.length; index++) {
    const el = doms[index];
    const { offsetLeft, offsetWidth } = el as HTMLElement;
    const center = Math.round(offsetLeft + offsetWidth / 2);
    if (x < center) {
      return index;
    }
  }
  return doms.length;
};
