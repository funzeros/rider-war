<template>
  <div class="login-wrap" :class="{ loginFormShow }" @click="showLoginForm">
    <video class="video" muted="" autoplay="" preload="" loop="">
      <source :src="video.mp4_saber_02" />
    </video>
    <el-form
      ref="FormRef"
      :model="modelRef"
      :rules="rule"
      class="form-box"
      label-width="auto"
      v-show="loginFormShow"
    >
      <el-form-item label="用户名" prop="name">
        <el-input
          ref="nameRef"
          v-model.trim="modelRef.name"
          placeholder="请输入你的大名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model.trim="modelRef.password"
          placeholder="请输入你的密码"
          @keydown.enter="handleKeySubmit(isReg)"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="isReg" label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          v-model.trim="modelRef.confirmPassword"
          placeholder="请输入确认密码"
          @keydown.enter="handleKeySubmit()"
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
    <div class="login-tip" v-show="!loginFormShow">按下任意键</div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
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
import { video } from "@renderer/assets/resource";
export default defineComponent({
  setup() {
    const { pushRouteFullpath, currentQuery, replaceRouteQuery } = useGRoute();
    const store = useStore();
    const FormRef = ref();
    const nameRef = ref();
    const modelData = reactive({
      modelRef: new RegDTO(),
      submitLoading: false,
      loginFormShow: false,
    });
    const isReg = computed(() => {
      return currentQuery.value.type === "reg";
    });
    const methods = {
      pushRouteFullpath,
      replaceRouteQuery,
      async login() {
        modelData.submitLoading = true;
        try {
          const params = encryptStrByObj<LoginDTO>(modelData.modelRef, [
            "password",
          ]);
          const { data, message } = await loginReq(params);
          if (data) {
            store.commit(UserMutationsType.SET_USER_INFO, data);
            await store.dispatch(UserActionsType.TOKEN_AUTH);
            pushRouteFullpath("/");
          } else {
            gMessage(message, "warning");
          }
        } catch (error) {
          console.error(error);
        } finally {
          modelData.submitLoading = false;
        }
      },
      async registry() {
        modelData.submitLoading = true;
        try {
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
        } catch (error) {
          console.error(error);
        } finally {
          modelData.submitLoading = false;
        }
      },
      handleSubmit(flag = true) {
        FormRef.value.validate((v: boolean) => {
          if (v) {
            if (flag) methods.login();
            else methods.registry();
          }
        });
      },
      showLoginForm() {
        if (modelData.loginFormShow) return;
        modelData.loginFormShow = true;
        document.removeEventListener("keydown", methods.showLoginForm);
        nameRef.value.focus();
      },
      handleKeySubmit(disabled = false) {
        if (disabled) return;
        methods.handleSubmit(!isReg.value);
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
    onMounted(() => {
      document.addEventListener("keydown", methods.showLoginForm);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", methods.showLoginForm);
    });
    return {
      isReg,
      FormRef,
      nameRef,
      video,
      ...toRefs(modelData),
      ...methods,
      ...constData,
    };
  },
});
</script>
<style lang="scss" scoped>
.login-wrap {
  background-color: #333;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &:not(.loginFormShow) {
    cursor: none;
    & > * {
      cursor: inherit;
    }
  }
}
.form-box {
  border-radius: 10px;
  width: 400px;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 0 10px 2px #bababa;
  position: relative;
  background-color: rgba($color: #ececec, $alpha: 0.8);
  opacity: 0;
}
.loginFormShow {
  .form-box {
    animation: formShow 200ms forwards;
  }
}
.video {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  transform: scale(1.2);
  pointer-events: none;
}
.login-tip {
  position: fixed;
  bottom: 30%;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 0 4px #000;
  opacity: 0.8;
  animation: tipBreath 4s ease-in-out infinite;
  pointer-events: none;
}
@keyframes tipBreath {
  0% {
    opacity: 0.8;
    text-shadow: 0 0 4px #000;
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 12px gold;
  }
  100% {
    opacity: 0.8;
    text-shadow: 0 0 4px #000;
  }
}
@keyframes formShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>