import { Form, Col, Row } from "react-bootstrap";

const FormMain = (props) => {
  return (
    <div>
      <Form>
        <Row className="d-flex justify-content-between">

          <Col md={6} lg={4}>

            <Form.Group controlId="InvestmentsTotal">
              <Form.Label>
                Current investments
              </Form.Label>
              <Form.Control
                value={props.curInvestments}
                onChange={(e) => props.setCurInvestments(+e.target.value)}
                type="number"
                step="1000"
                min="0"
              />
            </Form.Group>

            <Form.Group controlId="InvestmentsPerYear">
              <Form.Label>How much are you investing per year</Form.Label>
              <Form.Control
                value={props.investmentsPerYear}
                onChange={(e) => props.setInvestmentsPerYear(+e.target.value)}
                type="number"
                step="1000"
                min="0"
              />
            </Form.Group>

          </Col>

          <Col md={6} lg={4}>
            
            <Form.Group controlId="RetirementSpending">
              <Form.Label>
                Yearly spending in retirement
              </Form.Label>
              <Form.Control
                value={props.retirementSpending}
                onChange={(e) => props.setRetirementSpending(+e.target.value)}
                type="number"
                step="1000"
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-0" controlId="Investments">
              <Form.Label>Safe withdrawal rate %</Form.Label>
              <Form.Control
                value={props.SWR}
                onChange={(e) => props.setSWR(e.target.value)}
                type="number"
                step="0.1"
                min="0.1"
              />
            </Form.Group>

            <p className="moneyNeeded">Total money needed £{Number(props.moneyNeeded()).toLocaleString()}</p>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormMain;
