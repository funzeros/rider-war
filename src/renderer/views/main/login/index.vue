<template>
  <div class="login-wrap" v-loading="loginLoading">
    <el-form
      ref="FormRef"
      :model="modelRef"
      :rules="rule"
      class="form-box"
      label-width="auto"
    >
      <el-form-item label="用户名" prop="name">
        <el-input
          v-model.trim="modelRef.name"
          placeholder="请输入你的大名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model.trim="modelRef.password"
          placeholder="请输入你的密码"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="isReg" label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          v-model.trim="modelRef.confirmPassword"
          placeholder="请输入确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <template v-if="!isReg">
          <el-button @click="handleSubmit()" :loading="submitLoading"
            >登录</el-button
          >
          <el-button @click="replaceRouteQuery({ type: 'reg' })"
            >注册</el-button
          >
        </template>
        <template v-else>
          <el-button @click="handleSubmit(false)" :loading="submitLoading"
            >注册</el-button
          >
          <el-button @click="replaceRouteQuery({ type: 'login' })"
            >返回登录</el-button
          >
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { LoginDTO, RegDTO } from "@renderer/types/user/dto";
import { useGRoute } from "@renderer/hooks/useRoute";
import { loginReq, registryReq } from "@renderer/api/user";
import { encryptStrByObj } from "@renderer/utils/common";
import { gMessage } from "@renderer/hooks/useMessage";
import { useStore } from "@renderer/store";
import { UserMutationsType } from "@renderer/store/modules/user/mutations";
import { UserActionsType } from "@renderer/store/modules/user/actions";
export default defineComponent({
  setup() {
    const { pushRouteFullpath, currentQuery, replaceRouteQuery } = useGRoute();
    const store = useStore();
    const FormRef = ref();
    const modelData = reactive({
      modelRef: new RegDTO(),
      submitLoading: false,
      loginLoading: true,
    });
    const isReg = computed(() => {
      return currentQuery.value.type === "reg";
    });
    const methods = {
      pushRouteFullpath,
      replaceRouteQuery,
      async login() {
        modelData.submitLoading = true;
        const params = encryptStrByObj<LoginDTO>(modelData.modelRef, [
          "password",
        ]);
        const { data, message } = await loginReq(params);
        if (data) {
          store.commit(UserMutationsType.SET_USER_INFO, data);
          pushRouteFullpath("/");
        } else {
          gMessage(message, "warning");
        }
        modelData.submitLoading = false;
      },
      async registry() {
        modelData.submitLoading = true;
        const params = encryptStrByObj<RegDTO>(modelData.modelRef, [
          "password",
        ]);
        const { data, message } = await registryReq(params);
        if (data) {
          gMessage("注册成功", "success");
          replaceRouteQuery({ type: "login" });
        } else {
          gMessage(message, "warning");
        }
        modelData.submitLoading = false;
      },
      handleSubmit(flag = true) {
        FormRef.value.validate((v: boolean) => {
          if (v) {
            if (flag) methods.login();
            else methods.registry();
          }
        });
      },
    };
    const validConfirmPassword = (rules: GObj, value: string, callBack: Fn) => {
      if (value !== modelData.modelRef.password)
        callBack(new Error("两次密码不一致"));
      else callBack();
    };
    const constData = {
      rule: {
        name: { required: true, message: "用户名不能为空", trigger: "blur" },
        password: { required: true, message: "密码不能为空", trigger: "blur" },
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validConfirmPassword, trigger: "blur" },
        ],
      },
    };
    onMounted(async () => {
      const res = await store.dispatch(UserActionsType.TOKEN_AUTH);
      if (res) pushRouteFullpath("/");
      modelData.loginLoading = false;
    });
    return {
      isReg,
      FormRef,
      ...toRefs(modelData),
      ...methods,
      ...constData,
    };
  },
});
</script>
<style lang="scss" scoped>
.login-wrap {
  background-color: #cecece;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-box {
  background-color: #ececec;
  border-radius: 10px;
  width: 400px;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 0 10px 2px #bababa;
}
</style>