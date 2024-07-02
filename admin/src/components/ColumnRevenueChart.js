import { Column } from '@ant-design/charts';
import React, { useEffect, useState } from 'react'

const ColumnRevenueChart = (props) => {
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
     const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
    let data = []
    for (let index = 0; index < props?.value?.length; index++) {
      const element = props?.value[index];
      data.push({
        name: props?.value[index]?.name,
        type: monthNames[element?.month] ? monthNames[element?.month - 1] : "December",
        revenue: props?.value[index]?.revenue
      })
    }
    setMonthData(data)
  }, [props?.value])

  const config = {
    data: monthData,
    xField: 'type',
    yField: 'revenue',
    colorField: 'name',
    group: true,
    style: {
      inset: 5,
    },
  };
  return <Column {...config} />;
}

export default ColumnRevenueChart