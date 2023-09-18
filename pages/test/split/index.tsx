import React from "react";
import styled from "@emotion/styled";
import Split from "../../../src/components/modules/split";

export default function SplitTestPage() {
  return (
    <Wrapper>
      <Split
        list={[
          { children: <div>111</div> },
          { children: <div>222</div> },
          //   { children: <div>333</div> },
          //   { children: <div>444</div> },

          //   { children: <div>444</div> },
        ]}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 60px;
  height: 300px;
`;
