
import React from 'react';
import { Bar } from 'react-chartjs-2';

const defaultProps = {
  displayTitle: true,
  displayLegend: true,
  legendPosition: 'top',
}

const BarChart = (props) => {
  const { chartData } = props;
  return (
     <div className="chart">
      <Bar
        data={chartData}
        height={125}
        options={{
          title:{
            display: defaultProps.displayTitle,
            text: 'Photos checked per search',
            fontSize: 37,
            fontColor: '#282c34',
          },
          legend:{
            display: defaultProps.displayLegend,
            position: defaultProps.legendPosition,
            labels: {
              fontSize: 24,
              fontColor: 'black',
            },
          },
        }}
      />
      </div>
    )
  }

export default BarChart;
