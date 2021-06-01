import { App } from "vue";
//  comp
import BackBtn from "@renderer/components/common/BackBtn.vue";
import RiderCard from "@renderer/components/common/RiderCard.vue";
// list
const components = [BackBtn, RiderCard];
const installIepComponents = (app: App<Element>) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export { installIepComponents };
