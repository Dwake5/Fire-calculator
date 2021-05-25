import FormMain from "./components/FormMain";
import { Container } from "react-bootstrap";
import React, { useState } from "react";
import Results from "./components/Results";

function App() {
  const [curInvestments, setCurInvestments] = useState(20000);
  const [investmentsPerYear, setInvestmentsPerYear] = useState(5000);
  const [retirementSpending, setRetirementSpending] = useState(20000);
  const [SWR, setSWR] = useState(3);

  const moneyNeeded = () => {
    if (SWR < 0.1) return 0
    return (+retirementSpending * 100/SWR).toFixed(2)
  }

  return (
    <Container>
      <h1 className="text-center my-3">Months to FIRE based on interest rate</h1>
      <FormMain
        curInvestments={curInvestments}
        setCurInvestments={setCurInvestments}
        investmentsPerYear={investmentsPerYear}
        setInvestmentsPerYear={setInvestmentsPerYear}
        retirementSpending={retirementSpending}
        setRetirementSpending={setRetirementSpending}
        SWR={SWR}
        setSWR={setSWR}
        moneyNeeded={moneyNeeded}
      />
      <Results
        curInvestments={curInvestments}
        investmentsPerYear={investmentsPerYear}
        moneyNeeded={moneyNeeded()}
      />
    </Container>
  );
}

export default App;
