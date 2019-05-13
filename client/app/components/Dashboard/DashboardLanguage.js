import React from 'react';
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../../../../node_modules/react-vis/dist/style.css';
import {RadialChart, Hint} from 'react-vis';

const DashboardStatCard = ({
  title, stat, icon, color, blurb
  }) => {
  const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
  ];
  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        Chart
        {/* <RadialChart
          className={'donut-chart-example'}
          innerRadius={100}
          radius={140}
          getAngle={d => d.theta}
          data={[
            {theta: 2, className: 'custom-class'},
            {theta: 6},
            {theta: 2},
            {theta: 3},
            {theta: 1}
          ]}
          width={150}
          height={300}
          padAngle={0.04}
        >
        </RadialChart> */}
      </CardBody>
    </Card>
  );
}

DashboardStatCard.propTypes = {
}

export default DashboardStatCard;