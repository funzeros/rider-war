import { App } from "vue";
//  comp
import BackBtn from "@renderer/components/common/BackBtn.vue";
import RiderCard from "@renderer/components/common/RiderCard.vue";
import CircularText from "@renderer/components/common/CircularText.vue";
import GButton from "@renderer/components/GemsComp/Button/index.vue";
// list
const components = [BackBtn, RiderCard, CircularText, GButton];
const installIepComponents = (app: App<Element>) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export { installIepComponents };
