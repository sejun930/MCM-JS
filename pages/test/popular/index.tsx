import styled from "@emotion/styled";

import React from "react";
import Popular from "../../../src/components/modules/popular/components";

export default function PopularTestPage() {
  return (
    <Wrapper>
      <Popular>
        <h1>
          <u>11</u>
        </h1>
        <h2>22</h2>
        <h3>33</h3>
      </Popular>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 100px;
`;
