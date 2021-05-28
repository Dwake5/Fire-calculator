import { Table } from "react-bootstrap";

const OneTable = ({ interestArray, mapInterestCalculations }) => {
  return (
    <Table size="sm" hover="true" striped="true">
      <thead>
        <tr>
          <th>Interest %</th>
          <th>Months</th>
          <th>Years and Months</th>
        </tr>
      </thead>
      <tbody>{interestArray.map((i) => mapInterestCalculations(i))}</tbody>
    </Table>
  );
};

export default OneTable;
