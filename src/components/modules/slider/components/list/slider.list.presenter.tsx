import { List, Contents } from "../slider.styles";
import { sliderClassList } from "../slider.class";
import { SliderListTypes } from "./slider.list.types";

import { SliderListUITypes } from "./slider.list.types";

export default function SliderListUIPage({
  useAnimation,
  listRef,
  useSwipeMode,
  list,
  startDrag,
  moveDrag,
  endDrag,
  hasPageList,
  listMinHeight,
  info,
}: SliderListTypes & SliderListUITypes) {
  return (
    <List
      className={sliderClassList.list}
      useAnimation={useAnimation}
      ref={listRef}
      hasDragMode={useSwipeMode !== undefined}
      onMouseDown={(e) => useSwipeMode && startDrag(e.pageX || 0)}
      onMouseMove={(e) => useSwipeMode && moveDrag(e.pageX || 0, e)}
      onClick={(useSwipeMode && endDrag) || undefined}
      onTouchStart={(e) =>
        useSwipeMode && startDrag(e.targetTouches[0].pageX || 0, true)
      }
      onTouchMove={(e) =>
        useSwipeMode && moveDrag(e.targetTouches[0].pageX || 0, e)
      }
      onTouchEnd={(useSwipeMode && endDrag) || undefined}
      hasPageList={hasPageList}
      listMinHeight={listMinHeight}
    >
      {list.map((el, key) => (
        <Contents
          key={`${info.uid}-${key}`}
          className={sliderClassList.contents}
        >
          {el}
        </Contents>
      ))}
    </List>
  );
}
