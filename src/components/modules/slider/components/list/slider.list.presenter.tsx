import { List, Contents } from "../slider.styles";
import { sliderClassList } from "../slider.class";
import { SliderListTypes } from "./slider.list.types";

import { SliderListUITypes } from "./slider.list.types";

export default function SliderListUIPage({
  useAnimation,
  listRef,
  useDragMode,
  list,
  startDrag,
  moveDrag,
  endDrag,
  uid,
  hasPageList,
  listMinHeight,
}: SliderListTypes & SliderListUITypes) {
  return (
    <List
      className={sliderClassList.list}
      useAnimation={useAnimation}
      ref={listRef}
      hasDragMode={useDragMode !== undefined}
      onMouseDown={(e) => useDragMode && startDrag(e.pageX || 0)}
      onMouseMove={(e) => useDragMode && moveDrag(e.pageX || 0)}
      onClick={(useDragMode && endDrag) || undefined}
      onTouchStart={(e) =>
        useDragMode && startDrag(e.targetTouches[0].pageX || 0)
      }
      onTouchMove={(e) =>
        useDragMode && moveDrag(e.targetTouches[0].pageX || 0)
      }
      onTouchEnd={(useDragMode && endDrag) || undefined}
      hasPageList={hasPageList}
      listMinHeight={listMinHeight}
    >
      {list.map((el, key) => (
        <Contents key={`${uid}-${key}`} className={sliderClassList.contents}>
          {el}
        </Contents>
      ))}
    </List>
  );
}
