import React from "react";
import styled from "@emotion/styled";
import Calendar from "../../../src/components/modules/calendar/component";

export default function CalendarTestPage() {
  const start = new Date();
  start.setFullYear(2018);
  start.setMonth(5);
  start.setDate(1);

  //   console.log(now);

  return (
    <Wrapper>
      <Calendar
        startDate={start}
        // startDate={{
        //   year: 2022,
        //   month: 5,
        //   day: 10,
        // }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 100px;
`;
