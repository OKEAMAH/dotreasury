import React from "react";
import styled from "styled-components";

import Container from "../../components/container";
import MainHeader from "./MainHeader";

const Wrapper = styled.header`
  background: #fff;
  height: 136px;
  border-bottom: 1px solid #eee;
`;

const Header = () => (
  <Wrapper>
    <Container>
      <MainHeader />
    </Container>
  </Wrapper>
);

export default Header;
