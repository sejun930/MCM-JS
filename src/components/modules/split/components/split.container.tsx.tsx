import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

import SplitUIPage from "./split.presenter";
import { SplitPropsTypes } from "./split.types";
import { _Error } from "mcm-js-commons";

export default function _RenderSplit(props: SplitPropsTypes) {
  let uid = v4();
  uid = `${uid.split("-")[0]}-${uid.split("-").at(-1)}`;

  return <_Split {...props} _uid={uid} />;
}

function _Split(props: SplitPropsTypes & { _uid: string }) {
  const { _uid } = props;

  // action 종료하기
  const [disActive, setDisActive] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    // uid 고정하기
    setUid(_uid);
  }, [_uid]);

  // disable toggle
  const toggleDisAction = (bool: boolean) => {
    setDisActive(bool);
  };

  return (
    <_Error propsList={{ ...props }} requiredList={["list"]}>
      {uid && (
        <SplitUIPage
          {...props}
          disActive={disActive}
          uid={uid}
          toggleDisAction={toggleDisAction}
        />
      )}
    </_Error>
  );
}
