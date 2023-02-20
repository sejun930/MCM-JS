import React from "react";

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ModalPage from "../../../../src/components/modules/modal/modal.container";
// import ModalPage from "../../../../src/components/modules/test";

// @ts-ignore
export default it("Modal Page Sanpshot", () => {
  const component = render(
    <ModalPage
      //   str1="1"
      //   str2="2"
      //   onModalOpenAnimation={() => {}}
      show={true}
      onCloseModal={() => {}}
      onBGAnimation={false}
      onModalOpenAnimation={false}
    />
  );
  // @ts-ignore
  expect(component.container).toMatchSnapshot();
});
