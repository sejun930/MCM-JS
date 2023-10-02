import { _Error } from "mcm-js-commons";
import { useState, useEffect, memo } from "react";
import { createRoot } from "react-dom/client";

import { PopularPropsTypes } from "../popular.types";
import _Popular from "..";

import { v4 } from "uuid";

// 1. Error 컴포넌트 검증
const _WithErrorPopular = (props: PopularPropsTypes) => {
  return (
    <_Error propsList={{ ...props }} requiredList={["children"]}>
      <_RenderPopular {...props} />
    </_Error>
  );
};

// 2. 리스트 최대 높이값 및 uuid 설정
const _RenderPopular = (props: PopularPropsTypes) => {
  const { children } = props;

  // 모듈 개별의 uuid 지정
  const [uuid] = useState(v4());
  // 모듈 개별의 최대 높이값
  const [maxHeight, setMaxHeight] = useState(0);

  // 초기 및 children 변경시 리스트의 최대 높이값 구하기
  useEffect(() => {
    // 최초 중복 실행 방지
    const checkOverlap = document.getElementById(`mcm-popular-${uuid}`);

    // children이 배열 형태로 (2개 이상)구성되어 있는지 체크
    const ableChildren =
      children && Array.isArray(children) && children.length > 1;

    if (ableChildren && !checkOverlap) {
      const wrapper = document.createElement("ul");
      wrapper.style.position = "absolute";
      wrapper.style.maxHeight = "0px";
      wrapper.style.overflow = "hidden";
      wrapper.style.top = "0";

      wrapper.setAttribute("class", "mcm-popular-temp-wrapper");
      wrapper.setAttribute("id", `mcm-popular-${uuid}`);

      children.forEach((node) => {
        const div = document.createElement("li");

        wrapper.appendChild(div);
        createRoot(div).render(node);
      });

      document.body.append(wrapper);
      window.setTimeout(() => {
        // 우선순위 값 정하기 (현재 실행되어 있는 popular 모두 가져오기)
        const allNodes = Array.from(
          document.getElementsByClassName("mcm-popular-wrapper")
        );
        let zIdx = allNodes.length - 1;

        if (allNodes.length > 1) {
          allNodes.forEach((node: HTMLElement) => {
            node.style.zIndex = String(zIdx);
            zIdx--;
          });
        }

        // 최대 높이값
        let max = 0;

        // 해당 모듈의 전체 리스트 가져오기
        const nodes = document.getElementById(`mcm-popular-${uuid}`);
        nodes.childNodes.forEach((node: HTMLElement) => {
          const height = node.offsetHeight;

          if (height > max) max = height;
        });

        if (max) {
          if (max < 20) max = 20;
          setMaxHeight(max + 16);
        }
        nodes.remove();
      }, 0);
    }
  }, [children]);

  const _props = { ...props, maxHeight, uuid };
  return <_Popular {..._props} />;
};

export default memo(_WithErrorPopular);
