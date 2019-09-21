import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = (props) => {

  const { chartData } = props;

  const defaultProps = {
    displayTitle: false,
    displayLegend: true,
    legendPosition: 'bottom'
  }

    return (
      <div className="chart">
      <Doughnut
        data={chartData}
        options={{
          title:{
            display: defaultProps.displayTitle,
            text: 'Total Mobile Data Saved (MB)',
            fontSize: 25
          },
          legend:{ 
            display: defaultProps.displayLegend,
            position: defaultProps.legendPosition
          }
        }}
      />
      </div>
    )
}

export default DoughnutChart;