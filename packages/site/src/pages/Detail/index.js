import React from "react";
import styled from "styled-components";
import { Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import InformationTable from "./InformationTable";
import TipLefeCycleTabel from "./TipLifeCycleTable";
import Timeline from "../Timeline";
import Comment from "../Comment";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 44px;
  color: #1d253c;
`;

const TableWrapper = styled.div`
  display: grid;
  gap: 16px;
  @media screen and (min-width: 556px) {
    grid-template-columns: repeat(auto-fit, minmax(556px, 1fr));
  }
  @media screen and (max-width: 556px) {
    grid-template-columns: repeat(1fr);
  }
`;

const TimelineCommentWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 24px;
  @media screen and (min-width: 1128px) {
    grid-template-columns: repeat(3, 1fr);
    & > div:first-child {
      grid-column: 1 / 2;
    }
    & > div:last-child {
      grid-column: 2 / 4;
    }
  }
`;

const Detail = () => {
  return (
    <>
      <HeaderWrapper>
        <NavLink to="/">
          <Image src="./imgs/left-arrow.svg" width={"32px"} height={"32px"} />
        </NavLink>
        <Header>Detail</Header>
      </HeaderWrapper>
      <TableWrapper>
        <InformationTable />
        <TipLefeCycleTabel />
      </TableWrapper>
      <TimelineCommentWrapper>
        <Timeline />
        <Comment />
      </TimelineCommentWrapper>
    </>
  );
};

export default Detail;