import styled from "@emotion/styled";

import { CurrentWrapper, CurrentItems } from "..";
import { calendarClassList } from "../calendar.class";
import { CalendarCurrentTypes } from "./calendar.current.types";

import Slider from "../../../slider";
import { _SpanText, _Input } from "mcm-js-commons";

import { getYearList } from "./calendar.current.func";
import { ChangeEvent } from "react";

export default function CalendarCurrentPage(props: CalendarCurrentTypes) {
  const { startDate, limitYear, useInputInfo } = props;

  // 연도 리스트 및 인덱스 정보
  const yearInfo = getYearList({ limitYear, startDate }) || {
    yearList: [],
    yearIdx: 0,
  };
  const { yearList, yearIdx } = yearInfo;

  // 월 범위 구하기 (12개월 고정)
  const monthList = Array.from(new Array(12), (_, num) => 1 + num);

  // input으로 입력된 월 변경하기
  const changeMonth = (e: ChangeEvent<HTMLInputElement>) => {
    if (!useInputInfo.month) return;

    console.log(e.target.value);
  };

  return (
    <CurrentWrapper className={calendarClassList.currentWrapper}>
      <CurrentItems className={calendarClassList.currentItems}>
        {yearList && yearList.length >= 1 && (
          <Slider
            useAnimation
            firstPage={yearIdx}
            // changePageEvent={(idx) =>
            //   changeTempDate({ key: "year", value: yearList[idx] })
            // }
            setArrow={{ showHover: true }}
          >
            {yearList.map((num) => (
              <Current>{num}</Current>
            ))}
          </Slider>
        )}
      </CurrentItems>

      <CurrentItems className={calendarClassList.currentItems} isMonth={true}>
        {monthList && monthList.length === 12 && (
          <Slider
            useAnimation
            firstPage={startDate.month}
            // changePageEvent={(idx) =>
            //   changeTempDate({ key: "year", value: yearList[idx] })
            // }
            setArrow={{ showHover: true }}
          >
            {monthList.map((num) => {
              const month = String(num).padStart(2, "0");

              return <Current>{month}</Current>;
            })}
          </Slider>
        )}
      </CurrentItems>
    </CurrentWrapper>
  );
}

export const Current = styled(_SpanText)`
  font-size: 24px;
  font-weight: 700;
`;

export const Input = styled.input`
  font-size: 24px;
  font-weight: 700;
  width: 160px;
  text-align: center;
  padding: 2px;
  border: unset;
`;
