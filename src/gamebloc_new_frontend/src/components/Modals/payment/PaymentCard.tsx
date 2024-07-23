import {
  CheckCircleOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons"
import { Checkbox, ConfigProvider, Steps } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox"
import React from "react"

interface prop {
  onChange: (e: CheckboxChangeEvent) => void
  img: string
  paymentTitle: string
}

const PaymentCard = ({ onChange, img, paymentTitle }: prop) => {
  return (
    <div className="mt-[-1rem] mb-4 md:mt-0 p-2">
      <div className="flex  justify-between items-center py-8  px-6 w-full h-[3rem] rounded-md bg-white/20">
        <div className="flex items-center w-full">
          <img src={`${img}`} alt="" className="w-5 h-5 m-0" />
          <div className="flex ml-8 flex-col ">
            <p className="text-white font-bold text-[1rem] mb-1">
              {paymentTitle}
            </p>
            <p className="text-white text-[.6rem] ">te55ew.....Y67e</p>
          </div>
        </div>

        <div className="mt-[-6px]">
          <ConfigProvider
            theme={{
              token: {
                colorPrimaryActive: "#F6B8FC",
                colorPrimary: "#F6B8FC",
                colorPrimaryHover: "#F6B8FC",
                colorText: "#F6B8FC",
                colorBgContainer: "transparent",
                colorBorder: "#F6B8FC",
              },
            }}
          >
            <Checkbox onChange={onChange} />
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default PaymentCard
