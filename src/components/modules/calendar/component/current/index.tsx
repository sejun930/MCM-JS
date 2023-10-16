import styled from "@emotion/styled";
import { CurrentWrapper, CurrentItems } from "..";
import { calendarClassList } from "../calendar.class";
import { CalendarCurrentTypes } from "./calendar.current.types";

import Slider from "../../../slider";
import { _Title } from "mcm-js-commons";

export default function CalendarCurrentPage(props: CalendarCurrentTypes) {
  const { startDate } = props;

  // 연도 범위 구하기 (현재 연도의 앞 뒤로 50년 나열)
  const yearList = Array.from(new Array(100), (_, num) => (
    <span>{startDate.year - 50 + num}</span>
  ));
  console.log(yearList);

  return (
    <CurrentWrapper className={calendarClassList.currentWrapper}>
      <CurrentItems>
        <Slider useAnimation children={yearList} firstPage={51} />
      </CurrentItems>
    </CurrentWrapper>
  );
}

export const Year = styled(_Title)`
  margin: 0;
`;
