import { Flex, Typography } from "antd"
import React from "react"

const ObgSpan: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Flex gap={6}>
      <Typography style={{ fontWeight: '500' }}>
        {text}
      </Typography>
      <span style={{ color: "red" }}>
        *
      </span>
    </Flex>
  )
}

export default ObgSpan
