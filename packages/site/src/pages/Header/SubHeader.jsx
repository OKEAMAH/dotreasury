import React, { useEffect } from "react";
import styled from "styled-components";
import { Tab } from "semantic-ui-react";
import { NavLink, useLocation } from "react-router-dom";
import TipsMenu from "./TipsMenu";
import ProposalsMenu from "./ProposalsMenu";
import BountiesMenu from "./BountiesMenu";
import BurntMenu from "./BurntMenu";
import InflationMenu from "./InflationMenu";
import OthersIncomeMenu from "./OthersIncomeMenu";
import ProjectsMenu from "./ProjectsMenu";
import TransfersMenu from "./TransfersMenu";
import TansfersSlashMenu from "./TansfersSlashMenu";
import TipFindersMenu from "./TipFindersMenu";
import ProposalBeneficiariesMenu from "./ProposalBeneficiariesMenu";
import UsersMenu from "./UsersMenu";
import ReferendaMenu from "./ReferendaMenu";
import { fetchIncomeCount } from "../../store/reducers/incomeSlice";
import { useSelector, useDispatch } from "react-redux";
import { showMenuTabsSelector } from "../../store/reducers/menuSlice";
import {
  chainSelector,
  chainSymbolSelector,
} from "../../store/reducers/chainSlice";
import Card from "../../components/Card";
import Container from "../../components/Container";

import SlashMenu from "./SlashMenu";

const Wrapper = styled.div`
  position: relative;
`;

const WrapperBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 42px;
  width: 100%;
  z-index: -1;
  background-color: ${(p) =>
    p.symbol === "ksm" ? "#000" : "var(--neutral100)"};
`;

const TabWrapper = styled(Tab)`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  /* -ms-overflow-style: none; */
  scrollbar-width: none;
  overflow-y: auto;

  background: transparent;

  div {
    border-bottom: 0 !important;
  }

  a {
    padding-left: 0 !important;
    padding-right: 0 !important;
    border-width: 4px !important;
    font-family: "Inter" !important;
    color: var(--textSecondary) !important;
    margin-right: 32px !important;
    margin-bottom: 0px !important;
    & div.item {
      margin-bottom: -4px !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      color: var(--textSecondary) !important;
    }
    & div.ui.label,
    & div > div.ui.label {
      background: var(--secondary) !important;
      height: 20px !important;
      padding: 0 8px !important;
      line-height: 20px !important;
      border-radius: 10px !important;
      margin-left: 8px !important;
      color: var(--primary) !important;
      font-weight: 400;
    }
    &.active,
    &.active > div,
    &.active > div > div {
      font-weight: normal !important;
      color: var(--textPrimary) !important;
      border-color: var(--primary) !important;
    }
    &.item {
      padding: 2px 0 !important;
    }
  }
`;

const CustomCard = styled(Card)`
  padding: 0 24px;
  @media screen and (max-width: 600px) {
    border-radius: 0;
  }
`;

const TopWrapper = styled.div`
  padding: 11px 0;
  border-bottom: 1px solid var(--neutral300);
  > a {
    font-size: 13px;
    line-height: 18px;
    color: var(--textTertiary);
    :hover {
      color: var(--textSecondary);
    }
  }
`;

const OverviewWrapper = styled.div`
  line-height: 22px !important;
`;

const Divider = styled.div`
  position: relative;
  width: 1px;
  height: 20px;
  background: var(--neutral300);
  left: 16px;
`;

const Overview = () => {
  return (
    <OverviewWrapper className="item">
      Overview
      <Divider />
    </OverviewWrapper>
  );
};

const TabExampleSecondaryPointing = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const showMenuTabs = useSelector(showMenuTabsSelector);
  const chain = useSelector(chainSelector);
  const symbol = useSelector(chainSymbolSelector)?.toLowerCase();

  useEffect(() => {
    dispatch(fetchIncomeCount(chain));
  }, [dispatch, chain]);

  const isKusama = chain === "kusama";

  const panes =
    showMenuTabs === "Home"
      ? [
          {
            menuItem: {
              as: NavLink,
              id: "homeTab",
              content: <Overview />,
              to: `/${symbol}`,
              exact: true,
              key: "home",
              active: `/${symbol}` === pathname,
            },
          },
          ...(isKusama
            ? [
                {
                  menuItem: {
                    as: NavLink,
                    id: "referendaTab",
                    content: <ReferendaMenu />,
                    to: `/${symbol}/referenda`,
                    exact: true,
                    key: "referenda",
                    active: `/${symbol}/referenda` === pathname,
                  },
                },
              ]
            : []),
          {
            menuItem: {
              as: NavLink,
              id: "proposalsTab",
              content: <ProposalsMenu />,
              to: `/${symbol}/proposals`,
              exact: true,
              key: "proposals",
              active:
                `/${symbol}/proposals` === pathname ||
                pathname.indexOf(`/${symbol}/proposals`) === 0,
            },
          },
          {
            menuItem: {
              as: NavLink,
              id: "tipsTab",
              content: <TipsMenu />,
              to: `/${symbol}/tips`,
              exact: true,
              key: "tips",
              active:
                `/${symbol}/tips` === pathname ||
                pathname.indexOf(`/${symbol}/tips`) === 0,
            },
          },
          {
            menuItem: {
              as: NavLink,
              id: "bountiesTab",
              content: <BountiesMenu />,
              to: `/${symbol}/bounties`,
              exact: true,
              key: "bounties",
              active:
                pathname.indexOf(`/${symbol}/bounties`) === 0 ||
                pathname.indexOf(`/${symbol}/child-bounties`) === 0,
            },
          },
          {
            menuItem: {
              as: NavLink,
              id: "burntTab",
              content: <BurntMenu />,
              to: `/${symbol}/burnt`,
              exact: true,
              key: "burnt",
              active:
                `/${symbol}/burnt` === pathname ||
                pathname.indexOf(`/${symbol}/burnt`) === 0,
            },
          },
          {
            menuItem: {
              as: NavLink,
              id: "transfersTab",
              content: <TransfersMenu />,
              to: `/${symbol}/transfers`,
              exact: true,
              key: "transfers",
              active: `/${symbol}/transfers` === pathname,
            },
          },
        ]
      : showMenuTabs === "Income"
      ? [
          {
            menuItem: {
              as: NavLink,
              id: "inflationTab",
              content: <InflationMenu />,
              to: `/${symbol}/income`,
              exact: true,
              key: "inflation",
              active: `/${symbol}/income` === pathname,
            },
          },
          {
            menuItem: {
              id: "slashDropdownTab",
              content: <SlashMenu />,
              key: "slashDropdown",
              active: pathname.includes(`${symbol}/income/slash/`),
            },
          },
          {
            menuItem: {
              as: NavLink,
              id: "transfersSlashTab",
              content: <TansfersSlashMenu />,
              to: `/${symbol}/income/transfers`,
              exact: true,
              key: "transfersSlash",
              active:
                `/${symbol}/income/transfers` === pathname ||
                pathname.indexOf(`/${symbol}/income/transfers`) === 0,
            },
          },
          {
            menuItem: {
              as: NavLink,
              id: "othersIncomeTab",
              content: <OthersIncomeMenu />,
              to: `/${symbol}/income/others`,
              exact: true,
              key: "othersIncome",
              active:
                `/${symbol}/income/others` === pathname ||
                pathname.indexOf(`/${symbol}/income/others`) === 0,
            },
          },
        ]
      : showMenuTabs === "Projects"
      ? [
          {
            menuItem: {
              as: NavLink,
              id: "projectsTab",
              content: <ProjectsMenu />,
              to: `/${symbol}/projects`,
              exact: true,
              key: "projects",
              active:
                `/${symbol}/projects` === pathname ||
                pathname.indexOf(`/${symbol}/projects`) === 0,
            },
          },
        ]
      : showMenuTabs === "TipFinders"
      ? [
          {
            menuItem: {
              id: "tipFindersTab",
              to: `/${symbol}/tip-finders`,
              key: "tipFinders",
              content: <TipFindersMenu />,
              active: true,
            },
          },
        ]
      : showMenuTabs === "ProposalBeneficiaries"
      ? [
          {
            menuItem: {
              id: "ProposalBeneficiariesTab",
              to: `/${symbol}/proposal-beneficiaries`,
              key: "proposalBeneficiaries",
              content: <ProposalBeneficiariesMenu />,
              active: true,
            },
          },
        ]
      : showMenuTabs === "Users"
      ? [
          {
            menuItem: {
              as: NavLink,
              id: "UsersTab",
              to: `/${symbol}/users`,
              key: "users",
              content: <UsersMenu />,
              active: true,
            },
          },
        ]
      : [];

  return (
    <Wrapper>
      <WrapperBackground symbol={symbol} />
      <Container>
        <CustomCard>
          <TopWrapper>
            <NavLink to={`/${symbol}`}>Home</NavLink>
          </TopWrapper>
          <TabWrapper
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            activeIndex={"tipsTab"}
          />
        </CustomCard>
      </Container>
    </Wrapper>
  );
};

export default TabExampleSecondaryPointing;