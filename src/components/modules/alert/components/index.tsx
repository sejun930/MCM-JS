import styled from "@emotion/styled";
import { AlertIProps, AlertPropsType } from "./alert.types";
import { CSSProperties } from "react";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

export default function _Alert(props: AlertPropsType & AlertIProps) {
  const { children, className, id } = props;
  return (
    <Wrapper
      className={getAllComponentsClassName("mcm-alert-wrapper", className)}
      id={id}
    >
      {children}
    </Wrapper>
  );
}

interface StyleTypes {
  sequence?: number;
}

export const Wrapper = styled.div`
  display: flex;
  padding: 8px 16px;
  border: double 3px black;
  border-radius: 999px;
  min-height: 40px;
  max-width: 767px;
  background-color: white;
`;
