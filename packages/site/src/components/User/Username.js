import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

import TextMinor from "../TextMinor";
import { TEXT_DARK_MAJOR } from "../../constants";

const TextUsername = styled(TextMinor)`
  cursor: pointer;
  flex-grow: 1;
  &:hover {
    color: ${TEXT_DARK_MAJOR};
    text-decoration-line: underline;
  }
`;

const Username = ({ name, address }) => {
  const usernameRef = useRef(null);
  useLayoutEffect(() => {
    // check if address is valid
    if (!name && usernameRef.current.clientWidth > 120 && address) {
      usernameRef.current.innerHTML = `${address.substring(
        0,
        6
      )}...${address.substring(address.length - 6, address.length)}`;
    }
  });
  const username = name ? name : address ? address : "";
  return <TextUsername ref={usernameRef}>{username}</TextUsername>;
};

export default Username;
