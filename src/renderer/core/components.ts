import { App } from "vue";
//  comp
import BackBtn from "@renderer/components/common/BackBtn.vue";
import RiderCard from "@renderer/components/common/RiderCard.vue";
import CircularText from "@renderer/components/common/CircularText.vue";
import GButton from "@renderer/components/GemsComp/Button/index.vue";
import GTextBtn from "@renderer/components/GemsComp/TextBtn/index.vue";
import FaceIcon from "@renderer/components/GemsComp/FaceIcon/index.vue";
// list
const components = [
  BackBtn,
  RiderCard,
  CircularText,
  GButton,
  GTextBtn,
  FaceIcon,
];
const installIepComponents = (app: App<Element>) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export { installIepComponents };
