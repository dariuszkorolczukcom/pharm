/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";

import axios from 'axios';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartExample3
} from "../variables/charts.js";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://x8cfmast4e.execute-api.us-east-1.amazonaws.com/dev/all',
      );
        let fetchedLabels = []
        let fetchedData = []
        let Percent = 0
        result.data.map((record,index) => {
          Percent +=record.Percent
          if (index<5 ) {
            fetchedLabels.push(record.Postcode)
            fetchedData.push(record.Percent.toFixed(2))
          }
        })
      setData(fetchedData);
      setLabels(fetchedLabels);
      setLoading(false)
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-chart-bar-32 text-primary" />{" "}
                  Number Of Surgeries per Postcode (%)
                </CardTitle>
              </CardHeader>
              {!loading && 
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={canvas => {
                      let ctx = canvas.getContext("2d");
                  
                      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
                  
                      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
                      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
                      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
                      return {
                        labels: labels,
                        datasets: [
                          {
                            label: "Surgeries",
                            fill: true,
                            backgroundColor: gradientStroke,
                            hoverBackgroundColor: gradientStroke,
                            borderColor: "#d048b6",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data: data
                          }
                        ]
                      };
                    }}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
