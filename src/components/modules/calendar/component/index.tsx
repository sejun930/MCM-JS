import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Slider from "../../slider";
import { _Title, _Button } from "mcm-js-commons";

import { calendarClassList } from "./calendar.class";
import { CalendarPropsTypes, calendarInitData } from "./calendar.types";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { transformObj, transformDate } from "./calendar.func";
import CalendarCurrentPage from "./current";

export default function _Calendar(props: CalendarPropsTypes) {
  const { className, id, startDate } = props;
  // 달력에 필요한 정보 모음
  const [info, setInfo] = useState(calendarInitData);
  // 현재 날짜
  const now = transformObj(new Date());
  // 시작 일자
  const _startDate = transformObj(startDate || now);

  useEffect(() => {
    setInfo({
      ...info,
      // 시작일 지정
      ["startDate"]: transformObj(startDate || now),
    });
  }, [startDate]);

  return (
    <Wrapper
      className={getAllComponentsClassName(
        calendarClassList.wrapper,
        className
      )}
      id={id}
    >
      <CalendarCurrentPage startDate={_startDate || info.startDate} />
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  min-width: 320px;
  border: solid 2px gray;
  padding: 10px;
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
`;
