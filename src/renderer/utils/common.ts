import { computed, ComputedRef } from "vue";
import { cloneDeep, intersection, isNil, keys, omitBy, pick } from "lodash";
import md5 from "md5";
// 表单序列化
export const serialize = (data: GObj): string => {
  const list: string[] = [];
  Object.keys(data).forEach((ele) => {
    list.push(`${ele}=${data[ele]}`);
  });
  return list.join("&");
};

export const formatZero = (num: number, len = 2) => {
  const str = `${num}`;
  if (str.length < len) {
    return (new Array(len).join("0") + str).substring(str.length - 1);
  }
  return str;
};

/**
 * 加密字符串不可逆
 * @param str 加密对象
 */
export const encryptStr = (str: string) => md5(str);

/**
 * 对象加密部分字段
 * @param obj
 */
export const encryptStrByObj = <T = GObj>(obj: T, list: string[]): T => {
  const newObj = cloneDeep(obj);
  list.forEach((m) => {
    const str = newObj[m];
    if (str.constructor === String) {
      newObj[m] = encryptStr(str as string);
    }
  });
  return newObj;
};
/**
 * 将对象加密为字符串
 * @param obj 加密对象
 */
export const objEncodeToStr = (obj: GObj) =>
  btoa(encodeURIComponent(JSON.stringify(obj)));
/**
 * 将字符串解密为对象
 * @param base64Str 加密后字符串
 */
export const strDecodeToObj = (str: string) =>
  JSON.parse(decodeURIComponent(atob(str)));

/**
 * 覆盖对象属性
 * @param distObject 初始化对象
 * @param srcObject 传递过来新对象
 */
export function mergeProperties<T>(distObject: T, srcObject: GObj) {
  const distPropList = keys(distObject);
  const srcPropList = keys(omitBy(srcObject, isNil));
  const propList = intersection(distPropList, srcPropList);
  return {
    ...distObject,
    ...pick(srcObject, propList),
  };
}

/**
 * dict对象转label value数组
 */
export const dictToList = (obj: GObj) => {
  return Object.entries(obj).map(([value, label]) => ({ label, value }));
};

/**
 * 正版验证方法
 */

export const wgaFn = (time: number) => {
  const oldTime = ("" + time).substr(6, 6);
  const newTime = ((+oldTime % 9845) + 127) * 1998;
  return oldTime + "-" + newTime;
};

/**
 * 随机数
 */
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/** 获取数组随机项 */
export const getRandomOne = <T = any>(arr: T[]): T => {
  const newArr = cloneDeep(arr);
  return newArr[Math.floor(Math.random() * newArr.length)];
};

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

/**
 *
 */
export const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(",");
  //注意base64的最后面中括号和引号是不转译的
  const _arr = arr[1].substring(0, arr[1].length - 2);
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(_arr);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
};

/**
 * 组装ossurl
 */
export const tempOssUrl = (str: string) => {
  return `https://gems-oss.oss-cn-hangzhou.aliyuncs.com/DNS/img/${str}`;
};

/**
 * 文字转码当id
 */

export const chatCodeAtAll = (name: string) =>
  name
    .split("")
    .map((m) => m.charCodeAt(0))
    .join("");

/**
 * dev
 * @returns
 */
export const isDev = () => process.env.NODE_ENV === "development";
