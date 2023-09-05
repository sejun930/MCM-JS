import { modalClassList } from "../../components/modules/modal/component/modal.class";
import { tooltipClassList } from "../../components/modules/tooltip/component/tooltip.class";
import { sliderClassList } from "../../components/modules/slider/components/slider.class";

const classList = {
  modal: modalClassList as typeof modalClassList,
  tooltip: tooltipClassList as typeof tooltipClassList,
  slider: sliderClassList as typeof sliderClassList,
};

export default classList;
