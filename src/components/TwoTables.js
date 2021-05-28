import { Table } from "react-bootstrap";

const TwoTables = ({interestArray, mapInterestCalculations}) => {
  const lengths = () => {
    let length = interestArray.length;
    if (length % 2 === 1) length++;
    return length / 2;
  };

  return (
    <div className="d-flex">
      <Table className="smallTable" size="sm" hover="true" striped="true">
        <thead>
          <tr>
            <th>Interest %</th>
            <th>Months</th>
            <th>Years and Months</th>
          </tr>
        </thead>
        <tbody>
          {interestArray
            .slice(0, lengths())
            .map((i) => mapInterestCalculations(i))}
        </tbody>
      </Table>

      <Table className="leftBorder smallTable" size="sm" hover="true" striped="true">
        <thead>
          <tr>
            <th>Interest %</th>
            <th>Months</th>
            <th>Years and Months</th>
          </tr>
        </thead>
        <tbody>
          {interestArray
            .slice(lengths())
            .map((i) => mapInterestCalculations(i))}
        </tbody>
      </Table>
    </div>
  );
};

export default TwoTables;