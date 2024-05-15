import React from 'react'
import DasboardCard from '../components/DasboardCard'
import { AiOutlineShopping } from 'react-icons/ai'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { FiUser } from 'react-icons/fi'
import { Line } from '@ant-design/charts'

const Dashboard = () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
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
    <>
      <h1>Trang thống kê</h1>
      <div className='mt-3 container-fuild d-flex  justify-content-between'>
        <DasboardCard
          icon={<MdOutlineShoppingCart
            style={{
              color: "green",
              backgroundColor: "rgba(0,225,0,0.25)",
              borderRadius: 20,
              fontSize: 42,
              padding: 8,
            }}
          />}
          title={"Hóa đơn trong tháng"}
          value={500} />
        <DasboardCard
          icon={<AiOutlineShopping
            style={{
              color: "blue",
              backgroundColor: "rgba(0,0,225,0.25)",
              borderRadius: 20,
              fontSize: 42,
              padding: 8,
            }}
          />}
          title={"Sản phẩm tồn kho"}
          value={123144} />
        <DasboardCard
          icon={<FiUser
            style={{
              color: "purple",
              backgroundColor: "rgba(0,225,225,0.25)",
              borderRadius: 20,
              fontSize: 42,
              padding: 8,
            }}
          />}
          title={"Khách hàng"}
          value={123124} />
        <DasboardCard
          icon={<RiMoneyDollarCircleLine
            style={{
              color: "red",
              backgroundColor: "rgba(225,0,0,0.25)",
              borderRadius: 20,
              fontSize: 42,
              padding: 8,
            }}
          />}
          title={"Doanh thu trong tháng"}
          value={12344} />
          <DasboardCard
          icon={<RiMoneyDollarCircleLine
            style={{
              color: "green",
              backgroundColor: "rgba(0,225,0,0.25)",
              borderRadius: 20,
              fontSize: 42,
              padding: 8,
            }}
          />}
          title={"Lợi nhuận trong tháng"}
          value={12344} />
      </div>
      <div className='mt-5 container-fuild'>
        <h3 className='mb-3'>Doanh số theo tháng</h3>
        <div className='border rounded-3 p-3 bg-white'>
          <Line {...config} />
        </div>
      </div>
    </>
  )
}

export default Dashboard