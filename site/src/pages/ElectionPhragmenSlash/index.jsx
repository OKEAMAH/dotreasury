import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ResponsivePagination from "../../components/ResponsivePagination";
import SlashTable from "./SlashTable";
import { useDispatch, useSelector } from "react-redux";
import { useChainRoute, useQuery, useLocalStorage } from "../../utils/hooks";
import { useHistory } from "react-router";

import {
  fetchElectionPhragmenSlashList,
  electionPhragmenSlashListSelector,
  electionPhragmenSlashListLoadingSelector,
} from "../../store/reducers/incomeSlice";
import { chainSelector } from "../../store/reducers/chainSlice";
import Text from "../../components/Text";
import { DEFAULT_PAGE_SIZE, DEFAULT_QUERY_PAGE } from "../../constants";

const HeaderWrapper = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`;

const ElectionPhragmenSlash = () => {
  useChainRoute();

  const searchPage = parseInt(useQuery().get("page"));
  const queryPage =
    searchPage && !isNaN(searchPage) && searchPage > 0
      ? searchPage
      : DEFAULT_QUERY_PAGE;
  const [tablePage, setTablePage] = useState(queryPage);
  const [pageSize, setPageSize] = useLocalStorage(
    "electionPageSize",
    DEFAULT_PAGE_SIZE
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const { items: itemList, total } = useSelector(
    electionPhragmenSlashListSelector
  );
  const loading = useSelector(electionPhragmenSlashListLoadingSelector);
  const chain = useSelector(chainSelector);

  useEffect(() => {
    dispatch(fetchElectionPhragmenSlashList(chain, tablePage - 1, pageSize));
  }, [dispatch, chain, tablePage, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <SlashTable
        data={itemList}
        loading={loading}
        header={
          <HeaderWrapper>
            <Title>Election phragmen slash</Title>
          </HeaderWrapper>
        }
        footer={
          <ResponsivePagination
            activePage={tablePage}
            totalPages={totalPages}
            pageSize={pageSize}
            setPageSize={(pageSize) => {
              setTablePage(DEFAULT_QUERY_PAGE);
              setPageSize(pageSize);
              history.push({
                search: null,
              });
            }}
            onPageChange={(_, { activePage }) => {
              history.push({
                search:
                  activePage === DEFAULT_QUERY_PAGE
                    ? null
                    : `?page=${activePage}`,
              });
              setTablePage(activePage);
            }}
          />
        }
      />
    </>
  );
};

export default ElectionPhragmenSlash;