import { useTableColumns } from "../../components/shared/useTableColumns";
import { useSelector } from "react-redux";
import { chainSymbolSelector } from "../../store/reducers/chainSlice";
import { useEffect, useState } from "react";
import SortableIndex from "../../components/SortableIndex";
import SortableValue from "../../components/SortableValue";
import { useHistory } from "react-router";
import useSort from "../../hooks/useSort";

export function useColumns(options) {
  const { defaultCurator = true } = options ?? {};

  const symbol = useSelector(chainSymbolSelector);
  const [isCurator, setIsCurator] = useState(defaultCurator);

  const {
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
  } = useSort();

  const getDetailRoute = (row) => {
    const type = row.parentBountyId >= 0 ? "child-bounties" : "bounties";
    return `/${symbol.toLowerCase()}/${type}/${row.bountyIndex}`;
  };

  let {
    bountyIndex,
    proposeTime,
    curator,
    title,
    value,
    bountiesStatus,
    detailRoute,
    beneficiary,
  } = useTableColumns({ getDetailRoute, recognizeLinks: true });

  const toggleCuratorBeneficiary = () => {
    setIsCurator(!isCurator);
  };

  curator = {
    ...curator,
    headerCellProps: {
      onClick: toggleCuratorBeneficiary,
    },
  };
  beneficiary = {
    ...beneficiary,
    headerCellProps: {
      onClick: toggleCuratorBeneficiary,
    },
  };
  curator = {
    ...curator,
    title: <span style={{ color: "var(--pink500)" }}>Curator</span>,
    show: isCurator,
  };
  beneficiary = {
    ...beneficiary,
    title: <span style={{ color: "var(--pink500)" }}>Beneficiary</span>,
    show: !isCurator,
  };

  const sortableBountyIndex = {
    ...bountyIndex,
    title: (
      <SortableIndex
        direction={sortField === "bountyIndex" ? sortDirection : ""}
        onClick={() => {
          setSortField("bountyIndex");
          setSortDirection(sortField === "bountyIndex" && sortDirection === "asc" ? "desc" : "asc");
        }}
      />
    ),
  };

  const sortByValue = {
    ...value,
    title: (
      <SortableValue
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    ),
  };

  const columns = [
    sortableBountyIndex,
    proposeTime,
    curator,
    beneficiary,
    title,
    sortByValue,
    bountiesStatus,
    detailRoute,
  ];

  return {
    columns,
    getDetailRoute,
  };
}