import React from "react";
import { Card, Row, Col, Typography, Tag } from "antd";
import {
  DashboardOutlined,
  CloudOutlined,
  ExperimentOutlined,
  WarningOutlined,
  TeamOutlined,
  SoundOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const OtherDashboard = () => {
  return (
    <div style={{ padding: 20, background: "#0f172a", minHeight: "100vh" }}>

      {/* ENVIRONMENT */}
      <Section title="Environment" icon={<DashboardOutlined />}>
        <DataCard label="Temperature" value="29°C" />
        <DataCard label="Humidity" value="37%" />
        <DataCard label="Pressure" value="944.4 hPa" />
        <DataCard label="Light" value="79 lux" />
      </Section>

      {/* AIR PARTICULATES */}
      <Section title="Air Particulates" icon={<CloudOutlined />}>
        <DataCard label="PM1" value="16 µg/m³" />
        <DataCard label="PM2.5" value="17 µg/m³" status="warning" />
        <DataCard label="PM10" value="17 µg/m³" />
      </Section>

      {/* GASES */}
      <Section title="Gases" icon={<ExperimentOutlined />}>
        <DataCard label="CO" value="2.2 ppm" status="success" />
        <DataCard label="NH3" value="0.0 ppm" />
        <DataCard label="NO2" value="4 ppb" status="success" />
        <DataCard label="CO2" value="2976 ppm" status="error" />
        <DataCard label="TVOC" value="400 ppb" status="success" />
      </Section>

      {/* AQI + HEALTH */}
      <Section title="Air Quality & Health" icon={<WarningOutlined />}>
        <BigCard label="AQI" value="85" color="#facc15" />
        <BigCard label="Health Index" value="5" sub="Hazardous" color="#ef4444" />
      </Section>

      {/* ROOM */}
      <Section title="Room Activity" icon={<TeamOutlined />}>
        <DataCard label="Motion" value="135" />
        <DataCard label="People Count" value="1" />
      </Section>

      {/* SOUND */}
      <Section title="Sound" icon={<SoundOutlined />}>
        <DataCard label="Noise Level" value="62 dB" />
        <DataCard label="High Gain" value="62 dB" />
        <DataCard label="Low Gain" value="63 dB" />
      </Section>

    </div>
  );
};

const Section = ({ title, icon, children }) => (
  <div style={{ marginBottom: 32 }}>
    <Title level={4} style={{ color: "#e5e7eb", display: "flex", gap: 8 }}>
      {icon} {title}
    </Title>
    <Row gutter={[16, 16]}>
      {React.Children.map(children, (child, i) => (
        <Col xs={24} sm={12} md={8} lg={6} key={i}>
          {child}
        </Col>
      ))}
    </Row>
  </div>
);

const DataCard = ({ label, value, status }) => {
  const statusColor = {
    success: "green",
    warning: "orange",
    error: "red",
  };

  return (
    <Card
      bordered={false}
      style={{
        background: "#1e293b",
        borderRadius: 12,
      }}
    >
      <Text style={{ color: "#94a3b8" }}>{label}</Text>
      <div style={{ marginTop: 8 }}>
        <Text strong style={{ fontSize: 18, color: "#fff" }}>
          {value}
        </Text>
      </div>

      {status && (
        <Tag color={statusColor[status]} style={{ marginTop: 10 }}>
          {status.toUpperCase()}
        </Tag>
      )}
    </Card>
  );
};

const BigCard = ({ label, value, sub, color }) => (
  <Card
    bordered={false}
    style={{
      background: color,
      borderRadius: 12,
      textAlign: "center",
    }}
  >
    <Text>{label}</Text>
    <div>
      <Title level={2} style={{ margin: 0 }}>
        {value}
      </Title>
    </div>
    {sub && <Text>{sub}</Text>}
  </Card>
);

export default OtherDashboard;