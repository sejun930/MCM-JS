import { _Error } from "mcm-js-commons";
import { useState, useEffect, memo } from "react";

import { GetHeightWrapper, GetHeightList } from "./popular.styles";
import { PopularPropsTypes } from "./popular.types";
import _Popular from ".";

const initInfo = {
  load: false, // 컴포넌트 렌더링 완료 여부
  maxHeight: 0, // 컴포넌트 중 제일 큰 높이값 가져오기
};

// 각각의 Popular 모듈의 숫자 기입
let componentIdx = 0;

// Popular 모듈 렌더 페이지
const _RenderPopular = (props: PopularPropsTypes) => {
  const { children } = props;
  let maxHeight = 0;

  componentIdx++;

  // 컴포넌트 렌더 정보
  const [info, setInfo] = useState({ ...initInfo });

  // children이 배열 형태로 (2개 이상)구성되어 있는지 체크
  const ableChildren =
    children && Array.isArray(children) && children.length > 1;

  // 컴포넌트 중 최고 높이값 구하기
  const getMaxHeight = () => {
    const _info = { ...info };
    const nodes = document.getElementsByClassName("getHeight-list");

    if (nodes && nodes.length) {
      _info.load = true;

      Array.from(nodes).forEach((node) => {
        const height = node.clientHeight;
        if (height > maxHeight) maxHeight = height;
      });
    }

    _info.maxHeight = maxHeight + 10;
    setInfo({ ..._info });
  };

  useEffect(() => {
    // children 변화 감지시 로딩 초기화
    setInfo({ ...initInfo });

    window.setTimeout(() => {
      getMaxHeight();
    }, 0);
  }, [children]);

  const { load, ...sideInfo } = info;
  const _props = { ...props, ...sideInfo };

  return (
    <_Error propsList={{ ...props }} requiredList={["children"]}>
      {info.maxHeight > 0 && info.load ? (
        <_Popular {..._props} componentIdx={componentIdx} />
      ) : (
        ableChildren && (
          <GetHeightWrapper className="getHeight-list-wrapper">
            {children.map((node, idx) => {
              return (
                <GetHeightList
                  key={`getHeight-list-${idx}-${componentIdx}`}
                  className="getHeight-list"
                >
                  {node}
                </GetHeightList>
              );
            })}
          </GetHeightWrapper>
        )
      )}
    </_Error>
  );
};

export default memo(_RenderPopular);
