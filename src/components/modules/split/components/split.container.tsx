import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

import SplitUIPage from "./split.presenter";
import { SplitPropsTypes } from "./split.types";
import { _Error } from "mcm-js-commons";

import { getAllWidthList } from "./split.data";
import { initInfo, InitInfoTypes } from "./split.data";

export default function _RenderSplit(props: SplitPropsTypes) {
  let uid = v4();
  uid = `${uid.split("-")[0]}-${uid.split("-").at(-1)}`;

  return <_Split {...props} _uid={uid} />;
}

function _Split(props: SplitPropsTypes & { _uid: string }) {
  const { _uid, list } = props;

  const [info, setInfo] = useState<InitInfoTypes>(initInfo);

  useEffect(() => {
    const _initInfo = { ...initInfo };
    if (!info.uid) {
      _initInfo.uid = _uid;
    }

    // 현재 컴포넌트들의 최소 크기값 가져오기
    const widthList = getAllWidthList(list);
    _initInfo.widthList = widthList;

    setInfo(_initInfo);
  }, [_uid, list]);

  // disable toggle
  const toggleActive = (bool: boolean) => {
    setInfo({ ...info, active: bool });
  };

  return (
    <_Error propsList={{ ...props }} requiredList={["list"]}>
      {info.uid && (
        <SplitUIPage
          {...props}
          active={info.active}
          uid={info.uid}
          toggleActive={toggleActive}
          widthList={info.widthList}
        />
      )}
    </_Error>
  );
}
