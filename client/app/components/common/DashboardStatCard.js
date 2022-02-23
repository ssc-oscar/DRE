import React from 'react';
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

const DashboardStatCard = ({
  title, stat, icon, color, blurb
  }) => {
  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle
              tag="h5"
              className="text-uppercase text-muted mb-1"
            >
              {title}
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">
              {isNaN(stat) ? stat : stat.toLocaleString()}
            </span>
          </div>
          <Col className="col-auto">
            <div className={`icon icon-shape ${color} text-white rounded-circle shadow`}>
              <i className={`${icon}`}/>
            </div>
          </Col>
        </Row>
        <p className="mt-3 mb-0 text-muted text-sm">
          {/* <span className="text-success mr-2">
            <i className="fa fa-arrow-up" /> 3.48%
          </span>{" "} */}
          <span className="">{blurb}</span>
        </p>
      </CardBody>
    </Card>
  );
}

DashboardStatCard.propTypes = {
}

export default DashboardStatCard;