import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Table } from "../../components/Table";
import TableLoading from "../../components/TableLoading";
import { useSelector } from "react-redux";
import { chainSymbolSelector } from "../../store/reducers/chainSlice";
import Card from "../../components/Card";
import { compatChildBountyData } from "../ChildBounties/utils";
import { useColumns } from "./tableColumns";

const CardWrapper = styled(Card)`
  overflow-x: hidden;
  padding: 0;
  table {
    border-radius: 0 !important;
    border: none !important;
  }
  @media screen and (max-width: 600px) {
    border-radius: 0;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const TableWrapper = styled.div`
  overflow: scroll;
`;

const HeaderWrapper = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BountiesTable = ({ data, loading, header, footer }) => {
  const symbol = useSelector(chainSymbolSelector);
  const history = useHistory();

  const { columns, getDetailRoute } = useColumns(symbol);

  const onRowClick = (row) => {
    if (window.innerWidth < 1140) {
      const detailRoute = getDetailRoute(row);
      history.push(detailRoute);
    }
  };

  return (
    <CardWrapper>
      {header && <HeaderWrapper>{header}</HeaderWrapper>}
      <Wrapper>
        <TableWrapper>
          <TableLoading loading={loading}>
            {data && (
              <Table
                tree
                treeKey="childBounties"
                treeDataTransform={compatChildBountyData}
                columns={columns}
                data={data}
                onRowClick={onRowClick}
              />
            )}
          </TableLoading>
        </TableWrapper>
      </Wrapper>
      {footer}
    </CardWrapper>
  );
};

export default BountiesTable;
