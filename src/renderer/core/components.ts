import { App, Component } from "vue";
//  comp
import BackBtn from "@renderer/components/common/BackBtn.vue";
// list
const components = [BackBtn];
const installIepComponents = (app: App<Element>) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export { installIepComponents };
