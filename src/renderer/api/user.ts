import r from "@renderer/utils/request";

import { LoginDTO, RegDTO, UserInfoDTO } from "@renderer/types/user/dto";
const prefix = "user";
/**
 * 登录
 * @param data
 * @returns
 */
export const loginReq = (data: LoginDTO) =>
  r.request<R<UserInfoDTO>>({
    url: `${prefix}/login`,
    method: "post",
    data,
  });

/**
 * 注册
 * @param data
 * @returns
 */
export const registryReq = (data: RegDTO) =>
  r.request<R>({
    url: `${prefix}/register`,
    method: "post",
    data,
  });

/**
 * token授权
 */
export const authTokenReq = () =>
  r.request<R>({
    url: `${prefix}/token`,
    method: "post",
  });

/**
 * 更新
 * @returns
 */
export const updateUserReq = (data: GObj) =>
  r.request<R>({
    url: `${prefix}/update`,
    method: "post",
    data,
  });
