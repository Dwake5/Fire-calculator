import { Col, Container, Form, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import TwoTables from "./TwoTables";
import OneTable from "./OneTable";

const Results = ({ curInvestments, investmentsPerYear, moneyNeeded }) => {
  const zeroMoney = moneyNeeded !== 0;
  let interestArray = [];

  const [minInterest, setMinInterest] = useState(5);
  const [maxInterest, setMaxInterest] = useState(15);
  const [interestStep, setInterestStep] = useState(0.5);

  const calculate = (curr, perYear, interest, amountNeeded) => {
    const monthlyConversion = 1 / 12;
    if (perYear === 0 && curr === 0) return;
    let total = curr;
    const monthlyIncrease = (interest / 100 + 1) ** monthlyConversion;

    let months = 0;
    while (total <= amountNeeded) {
      total += perYear / 12;
      total *= monthlyIncrease;
      months++;
    }
    return months;
  };

  const updateInterestArray = () => {
    interestArray = [];
    if (interestStep < 0.1) return [];
    for (let i = minInterest; i <= maxInterest; i += interestStep) {
      const fixedInterest = i.toFixed(1);
      interestArray.push(fixedInterest);
    }
    interestArray.push("8.2");
    interestArray = [...new Set(interestArray.sort((a, b) => a - b))];
  };

  const monthsToMonthsAndYears = (months) => {
    const years = Math.floor(months / 12);
    const monthsRes = Math.floor(months % 12);
    let result = "";
    if (years > 1) result += years + " years";
    if (years === 1) result += years + " year";
    if (years > 0 && monthsRes > 0) result += " ";
    if (monthsRes > 1) result += monthsRes + " months";
    if (monthsRes === 1) result += monthsRes + " month";
    return result;
  };

  const mapInterestCalculations = (interest) => {
    const localMonths = calculate(
      curInvestments,
      investmentsPerYear,
      interest,
      moneyNeeded
    );
    const localYearsAndMonths = monthsToMonthsAndYears(localMonths);
    return (
      <tr
        className={interest === "8.2" ? "golden cellWithComment" : ""}
        key={interest}
      >
        <td>
          {interest}
          {interest === "8.2" && (
            <span className="cellComment">8.2% is the historic average</span>
          )}
        </td>
        <td>{localMonths}</td>
        <td>{localYearsAndMonths}</td>
      </tr>
    );
  };

  const doChecks = () => {
    if (curInvestments >= moneyNeeded) return false;
    if (interestStep < 0.1) return false;
    if (!zeroMoney) return false;
    return true;
  };

  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = () => setWidth(window.innerWidth);
  useEffect(() => (window.onresize = updateWidth), []);

  // Show 1 or 2 tables?
  const showTable = () => {
    if (interestArray.length > 26 && width > 850) {
      return (
        <TwoTables
          interestArray={interestArray}
          mapInterestCalculations={mapInterestCalculations}
        />
      );
    } else {
      return (
        <OneTable
          interestArray={interestArray}
          mapInterestCalculations={mapInterestCalculations}
        />
      );
    }
  };

  useEffect(() => {
    updateInterestArray();
  }, [minInterest, maxInterest, interestStep]);

  useEffect(() => {
    if (maxInterest > 200) setMaxInterest(200);
  }, [maxInterest]);

  updateInterestArray();

  return (
    <Container>
      <Form>
        <Form.Row className="mt-4">
          <Col>
            <Form.Group as={Row} controlId="MinInterest">
              <Form.Label className="ml-3 mt-1">Min Interest:</Form.Label>
              <Col md={5}>
                <Form.Control
                  value={minInterest}
                  onChange={(e) => setMinInterest(+e.target.value)}
                  type="number"
                  step="1"
                  min="1"
                  size="sm"
                />
              </Col>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group as={Row} controlId="MaxInterest">
              <Form.Label className="ml-3 mt-1">Max Interest:</Form.Label>
              <Col md={5}>
                <Form.Control
                  value={maxInterest}
                  onChange={(e) => setMaxInterest(+e.target.value)}
                  type="number"
                  step="1"
                  min="5"
                  size="sm"
                />
              </Col>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group as={Row} controlId="InterestStep">
              <Form.Label className="ml-3 mt-1">Interest Step:</Form.Label>
              <Col md={5}>
                <Form.Control
                  value={interestStep}
                  onChange={(e) => setInterestStep(+e.target.value)}
                  type="number"
                  step=".1"
                  min=".1"
                  size="sm"
                />
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      {curInvestments >= moneyNeeded && moneyNeeded > 0 && (
        <h2 className="mt-3 text-center">You already have enough to retire!</h2>
      )}
      {(moneyNeeded === 0 || interestStep < 0.1) && (
        <h3 className="mt-3 text-center">Please fill in the above</h3>
      )}

      {doChecks() && showTable()}
    </Container>
  );
};

export default Results;
