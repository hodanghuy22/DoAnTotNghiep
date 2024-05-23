import { Card, Space, Statistic } from 'antd'
import React from 'react'

const DasboardCard = ({icon, title, value}) => {
  return (
    <>
      <Card style={{ 
        minWidth: "210px",
       }}>
        <Space direction='horizontal'>
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    </>
  )
}

export default DasboardCard