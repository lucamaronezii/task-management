import { ConfigProvider, theme } from "antd"
import { ReactNode } from "react"
import ptBR from 'antd/locale/pt_BR'

interface ITheme {
  children: ReactNode
}

const ThemeProvider = ({ children }: ITheme) => {
  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#FFF"
        },
        components: {
          Segmented: {
            itemSelectedBg: '#000',
            trackBg: '#27272A'
          },
          DatePicker: {
            cellActiveWithRangeBg: 'black',
            colorPrimary: 'black'
          },
          Calendar: {
            colorPrimary: '#27272A'
          },
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
