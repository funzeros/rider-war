<template>
  <div class="login-wrap">
    <el-form
      ref="FormRef"
      :model="modelRef"
      :rules="rule"
      class="form-box"
      label-width="auto"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="modelRef.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="modelRef.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmit()">登录</el-button>
        <el-button>注册</el-button>
        <el-button @click="pushRouteFullpath('/')">首页</el-button>
      </el-form-item>
    </el-form>
    <g-back></g-back>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { LoginDTO } from "@renderer/types/user/dto";
import { useGRoute } from "@renderer/hooks/useRoute";
export default defineComponent({
  setup() {
    const { pushRouteFullpath } = useGRoute();
    const FormRef = ref();
    const modelData = reactive({
      modelRef: new LoginDTO(),
    });
    const methods = {
      pushRouteFullpath,
      handleSubmit() {
        FormRef.value.validate((v: boolean) => {
          if (v) {
            console.log(modelData.modelRef);
          }
        });
      },
    };
    const constData = {
      rule: {
        name: { required: true, message: "用户名不能为控", trigger: "blur" },
        password: { required: true, message: "密码不能为控", trigger: "blur" },
      },
    };
    return {
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