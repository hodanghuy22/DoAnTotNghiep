import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react'

const LineChart = (props) => {
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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