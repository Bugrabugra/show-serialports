import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { PortInfo } from "@/global";

const { Option } = Select;

const App: React.FC = () => {
  const [ports, setPorts] = useState<PortInfo[] | null>([]);
  const [selectedPort, setSelectedPort] = useState<
    PortInfo | null
  >(null);
  const [helloMessage, setHelloMessage] = useState("");

  async function listSerialPorts() {
    const ports: PortInfo[] = await window.SerialPortAPI.getSerialPorts();
    setPorts(ports);
  }

  const listenHelloFromBackend = async () => {
    window.SerialPortAPI.onHelloFromBackend((_, message) => {
      setHelloMessage(message);
    });
  };

  useEffect(() => {
    listenHelloFromBackend();
    listSerialPorts();
  }, []);

  const handleChange = (value: string) => {
    if (ports) {
      const foundPort = ports.find(
        (port: PortInfo) => port.path === value
      );
      setSelectedPort(foundPort!);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      {helloMessage && <div style={{ textAlign: "center", padding: "5px" }}>{helloMessage}</div>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: "4px"
        }}
      >
        <label>COM Ports</label>
        <div style={{ width: "100%", display: "flex" }}>
          <Select
            id="select-ports"
            onChange={handleChange}
            style={{ width: "100%" }}
            bordered
          >
            {ports &&
              ports.map((port, index) => (
                <Option key={index} value={port.path}>
                  {port.path}
                </Option>
              ))}
          </Select>
          <Button type="text" onClick={listSerialPorts}>
            <ReloadOutlined style={{ color: "green" }} />
          </Button>
        </div>

        <label htmlFor="location-id">Location ID</label>
        <Input
          type="text"
          id="location-id"
          readOnly
          value={selectedPort?.locationId}
        ></Input>

        <label htmlFor="manufacturer">Manufacturer</label>
        <Input
          type="text"
          id="manufacturer"
          readOnly
          value={selectedPort?.manufacturer}
        ></Input>

        <label htmlFor="path">Path</label>
        <Input
          type="text"
          id="path"
          readOnly
          value={selectedPort?.path}
        ></Input>

        <label htmlFor="pnp-id">PNP ID</label>
        <Input
          type="text"
          id="pnp-id"
          readOnly
          value={selectedPort?.pnpId}
        ></Input>

        <label htmlFor="product-id">Product ID</label>
        <Input
          type="text"
          id="product-id"
          readOnly
          value={selectedPort?.productId}
        ></Input>

        <label htmlFor="serial-number">Serial Number</label>
        <Input
          type="text"
          id="serial-number"
          readOnly
          value={selectedPort?.serialNumber}
        ></Input>

        <label htmlFor="vendor-id">Vendor ID</label>
        <Input
          type="text"
          id="vendor-id"
          readOnly
          value={selectedPort?.vendorId}
        ></Input>
      </div>
    </div>
  );
};

export default App;
