import { computed, ComputedRef } from "vue";

/**
 * FNtoComputeds
 */
export const toComputeds = (obj: GObj) => {
  const newObj: GObj<ComputedRef> = {};
  Object.keys(obj).forEach((k: string) => {
    newObj[k] = computed(obj[k]);
  });
  return newObj;
};
