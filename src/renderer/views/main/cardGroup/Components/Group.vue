<template>
  <div class="group">
    <div class="card c1"></div>
    <div class="card c2"></div>
    <div class="card c3"></div>
  </div>
</template>
<style lang="scss" scoped>
.group {
  width: 160px;
  height: 200px;
  position: relative;
  filter: drop-shadow(2px 4px 3px rgba(50, 50, 0, 0.5));
}
.card {
  width: 40%;
  height: 40%;
  background: #000;
  border-radius: 10px;
  border: 3px solid #999;
  box-sizing: inherit;
  position: absolute;
  box-shadow: 0px -0px 3px 0 #666;
}
.c1 {
  top: 5px;
  right: 5px;
}
.c2 {
  top: 7px;
  right: 7px;
}
.c3 {
  top: 9px;
  right: 9px;
}
.group::before,
.group::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #ececec;
  border-radius: 10px;
  clip-path: polygon(0% 0%, 70% 0%, 100% 30%, 100% 100%, 0% 100%);
  z-index: 1;
}
.group::after {
  content: "卡组1";
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  top: 10px;
  left: 10px;
  background: #fff;
  z-index: 2;
}
</style>