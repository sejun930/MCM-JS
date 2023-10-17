import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { _Title, _Button } from "mcm-js-commons";
import CalendarCurrentPage from "./current";

import { calendarClassList } from "./calendar.class";
import { CalendarPropsTypes, calendarInitData } from "./calendar.types";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { transformObj, getUseInputInfo } from "./calendar.func";

import { v4 } from "uuid";
export default function _RenderCalendar(props: CalendarPropsTypes) {
  const uuid = v4();

  return <_Calendar {...props} _uuid={uuid} />;
}

function _Calendar(props: CalendarPropsTypes & { _uuid: string }) {
  const { className, id, startDate, _uuid, limitYear, useInput } = props;
  // 달력에 필요한 정보 모음
  const [info, setInfo] = useState(calendarInitData);
  // 현재 날짜
  const now = transformObj(new Date());
  // 시작 일자
  let _startDate = transformObj(startDate || now);

  useEffect(() => {
    const _info = { ...info };
    _info.startDate = transformObj(startDate || now);
    if (!info.uuid) _info.uuid = _uuid;

    setInfo(_info);
  }, [startDate, _uuid]);

  // 연, 월, 일 임시 변경하기
  const changeDate = ({ key, value }: { key: string; value: number }) => {
    _startDate[key] = value;
  };

  // useInput 사용 여부에 대한 결과값 가져오기
  const useInputInfo = getUseInputInfo(useInput || false);

  return (
    <Wrapper
      className={getAllComponentsClassName(
        calendarClassList.wrapper,
        className
      )}
      id={id}
    >
      <CalendarCurrentPage
        startDate={_startDate || info.startDate}
        changeDate={changeDate}
        limitYear={limitYear}
        useInputInfo={useInputInfo}
      />
    </Wrapper>
  );
}

interface StyleTypes {
  isMonth?: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  position: relative;
  min-width: 320px;
  border: solid 2px gray;
  display: flex;
  flex-direction: column;

  .mcm-title-unit {
    margin: 0;
    text-align: center;
  }
`;

export const CurrentWrapper = styled.div`
  width: 100%;
`;

export const CurrentItems = styled.div`
  width: 100%;
  padding: 6px;
  height: 54px;

  ${(props: StyleTypes) =>
    props.isMonth && {
      borderTop: "solid 2px black",
    }}
`;
