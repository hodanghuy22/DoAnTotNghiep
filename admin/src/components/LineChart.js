import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react'

const LineChart = (props) => {
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    let monthNames = [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];
    let data = []
    for (let index = 0; index < props?.value?.length; index++) {
      const element = props?.value[index];
      data.push({
        type: monthNames[element?.month] ? monthNames[element?.month - 1] : "December",
        total: props?.value[index]?.total
      })
    }
    setMonthData(data)
  }, [props?.value])

  const config = {
    data: monthData,
    xField: 'type',
    yField: 'total',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return (
    <Line {...config} />
  )
}

export default LineChart