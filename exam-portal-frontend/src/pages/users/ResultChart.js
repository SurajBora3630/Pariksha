import React from 'react';
import { Line } from 'react-chartjs-2';

const ResultChart = ({ userNames, resultMarks }) => {
  const data = {
    labels: userNames,
    datasets: [
      {
        label: 'User Result Marks',
        data: resultMarks,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
        x: {
          type:'time' , // Use 'category' for the x-axis
          title: {
            display: true,
            text: 'userNames',
          },
        },
        y: {
          type: 'linear', // Use 'linear' for the y-axis
          title: {
            display: true,
            text: 'resultMarks',
          },
        },
      },
    };

  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default ResultChart;
