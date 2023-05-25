import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { bnToBn } from "@polkadot/util";
import dayjs from "dayjs";
import { useTheme } from "../../../context/theme";

import Text from "../../../components/Text";
import Card from "../../../components/Card";
import ListOrigin from "../CustomList";
import Chart from "./Chart";
import { getPrecision, toPrecision } from "../../../utils";

import {
  fetchStatsHistory,
  statsHistorySelector,
} from "../../../store/reducers/overviewSlice";
import {
  chainSelector,
  chainSymbolSelector,
} from "../../../store/reducers/chainSlice";
import { h4_16_semibold } from "../../../styles/text";
import {
  gap,
  h_full,
  justify_between,
  p_b,
  w,
  w_full,
} from "../../../styles/tailwindcss";
import { breakpoint } from "../../../styles/responsive";

const CardWrapper = styled(Card)`
  padding: 24px;
  @media screen and (max-width: 600px) {
    border-radius: 0;
  }
`;

const Title = styled(Text)`
  margin-bottom: 16px;
  ${h4_16_semibold};
`;

const ContentWrapper = styled.div`
  display: flex;
  ${justify_between};
  ${gap(72)};
  @media screen and (max-width: 1140px) {
    flex-direction: column;
    ${gap(24)};
  }
`;

const ChartWrapper = styled.div`
  ${h_full};
  min-width: 252px;
  max-height: 324px;
  flex-grow: 1;
  ${p_b(24)};
`;

const List = styled(ListOrigin)`
  ${w(276)};
  ${breakpoint(600, w_full)};
`;
const ListWrapper = styled.div`
  display: flex;
  @media screen and (min-width: 600px) {
    & > :first-child {
      margin-right: 24px;
    }
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    & > :first-child {
      margin-bottom: 24px;
    }
  }
`;

const SecondListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    & > :first-child {
      margin-bottom: 24px;
    }
  }
`;

const TotalStacked = () => {
  const theme = useTheme();
  const chain = useSelector(chainSelector);
  const isKusama = chain === "kusama";
  const dispatch = useDispatch();
  const [dateLabels, setDateLabels] = useState([]);
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [outputHistory, setOutputHistory] = useState([]);
  const [treasuryHistory, setTreasuryHistory] = useState([]);
  const [showIndex, setShowIndex] = useState();
  const [incomeData, setIncomeData] = useState({
    title: "Income",
    icon: "square",
    labels: [
      {
        name: "Inflation",
        value: 0,
      },
      {
        name: "Slashes",
        children: [
          {
            name: "Staking",
            value: 0,
          },
          {
            name: "Treasury",
            value: 0,
          },
          {
            name: "Election",
            value: 0,
          },
          {
            name: "Democracy",
            value: 0,
          },
          {
            name: "Identity",
            value: 0,
          },
          ...(isKusama
            ? [
                {
                  name: "Referenda",
                  value: 0,
                },
                {
                  name: "Fellowship",
                  value: 0,
                },
              ]
            : []),
        ],
      },
      {
        name: "Others",
        value: 0,
      },
    ],
  });
  const [outputData, setOutputData] = useState({
    title: "Output",
    icon: "square",
    labels: [
      {
        name: "Proposal",
        value: 0,
      },
      {
        name: "Tips",
        value: 0,
      },
      {
        name: "Bounties",
        value: 0,
      },
      {
        name: "Burnt",
        value: 0,
      },
    ],
  });
  const [treasuryData, setTreasuryData] = useState({
    title: "Treasury",
    icon: "square",
    labels: [
      {
        name: "Balance",
        value: 0,
      },
    ],
  });

  const symbol = useSelector(chainSymbolSelector);
  const precision = getPrecision(symbol);

  useEffect(() => {
    dispatch(fetchStatsHistory(chain));
  }, [dispatch, chain]);

  const statsHistory = useSelector(statsHistorySelector);

  useEffect(() => {
    const dateLabels = statsHistory.map(
      (statsItem) => statsItem.indexer.blockTime,
    );
    setDateLabels(dateLabels);

    const incomeHistory = statsHistory
      .map((statsItem) =>
        bnToBn(statsItem.income.inflation)
          .add(bnToBn(statsItem.income.slash))
          .add(bnToBn(statsItem.income.others)),
      )
      .map((bn) => toPrecision(bn, precision, false));
    setIncomeHistory(incomeHistory);

    const outputHistory = statsHistory
      .map((statsItem) =>
        bnToBn(statsItem.output.tip)
          .add(bnToBn(statsItem.output.proposal))
          .add(bnToBn(statsItem.output.bounty))
          .add(bnToBn(statsItem.output.burnt)),
      )
      .map((bn) => toPrecision(bn, precision, false));
    setOutputHistory(outputHistory);

    const treasuryHistory = statsHistory.map((statsItem) =>
      toPrecision(statsItem.treasuryBalance, precision, false),
    );
    setTreasuryHistory(treasuryHistory);
  }, [statsHistory, precision]);

  useEffect(() => {
    if (statsHistory && statsHistory.length > 0) {
      const index = showIndex ?? statsHistory.length - 1;
      const statsData = statsHistory[index];
      setIncomeData({
        title: "Income",
        date: dayjs(dateLabels?.[index]).format("YYYY-MM-DD hh:mm"),
        icon: "square",
        labels: [
          {
            name: "Inflation",
            color: theme.pink500,
            value: toPrecision(statsData.income.inflation, precision, false),
          },
          {
            name: "Slashes",
            color: theme.pink500,
            children: [
              {
                name: "Staking",
                color: "transparent",
                value: toPrecision(
                  statsData.income.slashSeats.staking,
                  precision,
                  false,
                ),
              },
              {
                name: "Treasury",
                color: "transparent",
                value: toPrecision(
                  statsData.income.slashSeats.treasury,
                  precision,
                  false,
                ),
              },
              {
                name: "Election",
                color: "transparent",
                value: toPrecision(
                  statsData.income.slashSeats.election,
                  precision,
                  false,
                ),
              },
              {
                name: "Democracy",
                color: "transparent",
                value: toPrecision(
                  statsData.income.slashSeats.democracy,
                  precision,
                  false,
                ),
              },
              {
                name: "Identity",
                color: "transparent",
                value: toPrecision(
                  statsData.income.slashSeats.identity,
                  precision,
                  false,
                ),
              },
              ...(isKusama
                ? [
                    {
                      name: "Referenda",
                      color: "transparent",
                      value: toPrecision(
                        statsData.income.slashSeats.referenda || 0,
                        precision,
                        false,
                      ),
                    },
                    {
                      name: "Fellowship",
                      color: "transparent",
                      value: toPrecision(
                        statsData.income.slashSeats.fellowshipReferenda || 0,
                        precision,
                        false,
                      ),
                    },
                  ]
                : []),
            ],
          },
          {
            name: "Others",
            color: theme.pink500,
            value: toPrecision(statsData.income.others, precision, false),
          },
        ],
      });

      setOutputData({
        title: "Output",
        date: dayjs(dateLabels?.[index]).format("YYYY-MM-DD hh:mm"),
        icon: "square",
        labels: [
          {
            name: "Proposal",
            color: theme.yellow500,
            value: toPrecision(statsData.output.proposal, precision, false),
          },
          {
            name: "Tips",
            color: theme.yellow500,
            value: toPrecision(statsData.output.tip, precision, false),
          },
          {
            name: "Bounties",
            color: theme.yellow500,
            value: toPrecision(statsData.output.bounty, precision, false),
          },
          {
            name: "Burnt",
            color: theme.yellow500,
            value: toPrecision(statsData.output.burnt, precision, false),
          },
        ],
      });

      setTreasuryData({
        title: "Treasury",
        date: dayjs(dateLabels?.[index]).format("YYYY-MM-DD hh:mm"),
        icon: "solid",
        labels: [
          {
            name: "Balance",
            color: theme.orange500,
            value: toPrecision(statsData.treasuryBalance, precision, false),
          },
        ],
      });
    }
  }, [showIndex, statsHistory, dateLabels, precision, isKusama, theme]);

  const chartData = {
    dates: dateLabels,
    values: [
      {
        label: "Income",
        primaryColor: theme.pink300,
        secondaryColor: theme.pink100,
        data: incomeHistory,
        fill: true,
        icon: "square",
        order: 2,
      },
      {
        label: "Output",
        primaryColor: theme.yellow300,
        secondaryColor: theme.yellow100,
        data: outputHistory,
        fill: true,
        icon: "square",
        order: 1,
      },
      {
        label: "Treasury",
        primaryColor: theme.orange300,
        secondaryColor: theme.orange300,
        data: treasuryHistory,
        fill: false,
        icon: "bar",
        order: 0,
      },
    ],
  };

  const onHover = (index) => {
    setShowIndex(index);
  };

  return (
    <CardWrapper>
      <Title>Total Stacked</Title>
      <ContentWrapper>
        <ListWrapper>
          <List data={incomeData}></List>
          <SecondListWrapper>
            <List data={outputData}></List>
            <List data={treasuryData}></List>
          </SecondListWrapper>
        </ListWrapper>
        <ChartWrapper>
          <Chart data={chartData} onHover={onHover} />
        </ChartWrapper>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default TotalStacked;