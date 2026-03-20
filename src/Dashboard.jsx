import React, { useEffect, useMemo, useState } from "react";
import {
  AlertOutlined,
  InfoCircleOutlined,
  BulbOutlined,
  DashboardOutlined,
  FireOutlined,
  SoundOutlined,
  TeamOutlined,
  ExperimentOutlined,
  CloudOutlined,
  WarningOutlined,
  DragOutlined,
  AimOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Layout, Row, Space, Typography } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

const toneColor = {
  good: "#16a34a",
  warning: "#ca8a04",
  danger: "#dc2626",
  neutral: "#0f172a",
};

const statusColor = {
  active: "#16a34a",
  inactive: "#dc2626",
};

const panelStyle = {
  borderRadius: 16,
  borderColor: "#d6dde6",
  minHeight: 300,
  height: "100%",
};

const iconStyle = { color: "#64748b", fontSize: 16 };

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#edf1f5" }}>
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <Row justify="space-between" align="bottom">
            <Col>
              <Title level={2} style={{ margin: 0, color: "#0b1d3a", fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1 }}>
                Device Status Overview
              </Title>
              <Text style={{ color: "#51698a", fontSize: "clamp(14px, 1.25vw, 20px)" }}>
                Real-time telemetry and environmental data
              </Text>
            </Col>
            <Col>
              <Text style={{ color: "#51698a", fontSize: "clamp(13px, 1.1vw, 18px)" }}>Last updated: Just now</Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <AlertCard
                value="5"
                title="Hazardous Health Index"
                description="Critical levels of CO2 and Particulates detected."
                type="danger"
              />
            </Col>
            <Col xs={24} lg={12}>
              <AlertCard
                value="85"
                title="Moderate Air Quality"
                description="PM2.5 levels are slightly elevated."
                type="warning"
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12} xl={6}>
              <CategoryCard
                title="Environment"
                items={[
                  { label: "Temperature", value: "29 C (85 F)", tone: "neutral", icon: <FireOutlined style={iconStyle} /> },
                  { label: "Humidity", value: "37%", tone: "neutral", icon: <CloudOutlined style={iconStyle} /> },
                  { label: "Pressure", value: "944.4 hPa", tone: "neutral", icon: <DashboardOutlined style={iconStyle} /> },
                  { label: "Light Level", value: "79 lux", tone: "neutral", icon: <BulbOutlined style={iconStyle} /> },
                ]}
              />
            </Col>

            <Col xs={24} md={12} xl={6}>
              <CategoryCard
                title="Gases"
                items={[
                  { label: "CO", value: "2.2 ppm", tone: "good", icon: <CloudOutlined style={iconStyle} /> },
                  { label: "NH3", value: "0.0 ppm", tone: "neutral", icon: <CloudOutlined style={iconStyle} /> },
                  { label: "NO2", value: "4 ppb", tone: "good", icon: <WarningOutlined style={iconStyle} /> },
                  { label: "TVOC", value: "397 ppb", tone: "warning", icon: <ExperimentOutlined style={iconStyle} /> },
                  { label: "CO2 (cal)", value: "3002 ppm", tone: "danger", strong: true, icon: <FireOutlined style={iconStyle} /> },
                ]}
                splitLast
              />
            </Col>

            <Col xs={24} md={12} xl={6}>
              <CategoryCard
                title="Air Particulates"
                items={[
                  { label: "PM 1.0", value: "16 ug/m3", tone: "good", icon: <ExperimentOutlined style={iconStyle} /> },
                  { label: "PM 2.5", value: "17 ug/m3", tone: "warning", icon: <ExperimentOutlined style={iconStyle} /> },
                  { label: "PM 10", value: "17 ug/m3", tone: "good", icon: <ExperimentOutlined style={iconStyle} /> },
                ]}
              />
            </Col>

            <Col xs={24} md={12} xl={6}>
              <CategoryCard
                title="Room Occupancy"
                items={[
                  { label: "Motion Events", value: "187", tone: "neutral", icon: <UserOutlined style={iconStyle} /> },
                  { label: "People Count", value: "1", tone: "neutral", icon: <TeamOutlined style={iconStyle} /> },
                  { label: "Sound Level", value: "54 dB", tone: "good", icon: <SoundOutlined style={iconStyle} /> },
                ]}
              />
            </Col>

            <Col xs={24} md={12} xl={6}>
              <AqiCard />
            </Col>

            <Col xs={24} md={12} xl={6}>
              <HealthCard />
            </Col>

            <Col xs={24} md={12} xl={6}>
              <CategoryCard
                title="Movement"
                items={[
                  { label: "Move", value: "25 mm/100", tone: "neutral", icon: <DragOutlined style={iconStyle} /> },
                  { label: "X,Y,Z", value: "-23, 2, -1074 milli g", tone: "neutral", icon: <AimOutlined style={iconStyle} /> },
                ]}
              />
            </Col>

            <Col xs={24} md={12} xl={6}>
              <CategoryCard
                title="Sound"
                items={[
                  { label: "Total Level", value: "62 dB", tone: "neutral", icon: <SoundOutlined style={iconStyle} /> },
                  { label: "High Gain Mic", value: "62 dB", tone: "neutral", icon: <NotificationOutlined style={iconStyle} /> },
                  { label: "Low Gain Mic", value: "63 dB", tone: "neutral", icon: <NotificationOutlined style={iconStyle} /> },
                ]}
              />
            </Col>
          </Row>
        </Space>
        </div>
      </Content>
    </Layout>
  );
};

function AlertCard({ value, title, description, type }) {
  const isDanger = type === "danger";
  const status = isDanger ? "inactive" : "active";
  const bg = isDanger ? "#fff1f2" : "#fffbe6";
  const border = isDanger ? "#fecaca" : "#fde68a";
  const badge = isDanger ? "#ef4444" : "#facc15";
  const titleColor = isDanger ? "#991b1b" : "#854d0e";
  const descColor = isDanger ? "#b91c1c" : "#a16207";

  return (
    <Card style={{ borderRadius: 16, borderColor: border, background: bg, minHeight: 122 }} bodyStyle={{ padding: 20 }}>
      <Row gutter={20} align="middle">
        <Col>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              background: badge,
              display: "grid",
              placeItems: "center",
              color: isDanger ? "#fff" : "#1f2937",
              fontSize: "clamp(24px, 2vw, 40px)",
              fontWeight: 800,
            }}
          >
            <AnimatedValue value={value} />
          </div>
        </Col>
        <Col flex="auto">
          <Space direction="vertical" size={2}>
            <Space align="center" size={8}>
              {isDanger ? (
                <WarningOutlined style={{ color: statusColor[status], fontSize: 18 }} />
              ) : (
                <InfoCircleOutlined style={{ color: statusColor[status], fontSize: 18 }} />
              )}
              <Text style={{ color: titleColor, fontWeight: 700, fontSize: "clamp(18px, 1.6vw, 30px)" }}>{title}</Text>
            </Space>
            <Text style={{ color: descColor, fontSize: "clamp(13px, 1vw, 16px)" }}>{description}</Text>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}

function CategoryCard({ title, items, splitLast = false }) {
  return (
    <Card
      style={panelStyle}
      bodyStyle={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}
    >
      <Text style={{ fontSize: "clamp(20px, 1.4vw, 28px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.15 }}>{title}</Text>

      {items.map((item, index) => {
        const addTopBorder = splitLast && index === items.length - 1;
        const itemStatus = getItemStatus(item);

        return (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 40,
              borderTop: addTopBorder ? "1px solid #f0d4d4" : "none",
              marginTop: addTopBorder ? 4 : 0,
              paddingTop: addTopBorder ? 16 : 0,
              gap: 10,
            }}
          >
            <Space size={8} style={{ flex: 1, minWidth: 0 }}>
              {getStatusIcon(item, itemStatus)}
              <Text style={{ color: "#486284", fontSize: "clamp(14px, 1vw, 18px)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</Text>
            </Space>

            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <Text
                style={{
                  color: toneColor[item.tone],
                  fontSize: getValueFontSize(item.value, item.strong),
                  fontWeight: item.strong ? 800 : 600,
                  lineHeight: 1,
                  textAlign: "right",
                }}
              >
                <AnimatedValue value={item.value} />
              </Text>
            </div>
          </div>
        );
      })}
    </Card>
  );
}

function AqiCard() {
  return (
    <Card style={panelStyle} bodyStyle={{ padding: 22 }} title={<Text style={{ fontSize: "clamp(20px, 1.4vw, 28px)", fontWeight: 700 }}>Air Quality Index</Text>} extra={<InfoCircleOutlined style={{ color: "#1677ff" }} />}>
      <Row gutter={14}>
        <Col span={11}>
          <div
            style={{
              background: "#fff200",
              minHeight: 132,
              borderRadius: 6,
              display: "grid",
              placeItems: "center",
              fontSize: "clamp(56px, 4.5vw, 86px)",
              fontWeight: 900,
              color: "#111",
            }}
          >
            <AnimatedValue value="85" />
          </div>
        </Col>
        <Col span={13}>
          <Row gutter={[12, 12]}>
            <Col span={12}><SmallMetric label="PM2.5" value="85" tone="warning" /></Col>
            <Col span={12}><SmallMetric label="PM10" value="26" tone="good" /></Col>
            <Col span={12}><SmallMetric label="CO" value="6" tone="good" /></Col>
            <Col span={12}><SmallMetric label="NO2" value="2" tone="good" /></Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

function HealthCard() {
  return (
    <Card style={panelStyle} bodyStyle={{ padding: 22 }} title={<Text style={{ fontSize: "clamp(20px, 1.4vw, 28px)", fontWeight: 700 }}>Health Index</Text>} extra={<InfoCircleOutlined style={{ color: "#1677ff" }} />}>
      <Row gutter={14}>
        <Col span={11}>
          <div
            style={{
              background: "#9b0000",
              minHeight: 132,
              borderRadius: 6,
              display: "grid",
              placeItems: "center",
              color: "#fff",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(58px, 4.2vw, 88px)", lineHeight: 1, fontWeight: 900 }}><AnimatedValue value="5" /></div>
              <div style={{ fontSize: "clamp(16px, 1.2vw, 24px)", fontWeight: 700 }}>Hazardous</div>
            </div>
          </div>
        </Col>
        <Col span={13}>
          <Row gutter={[12, 12]}>
            <Col span={12}><SmallMetric label="PM1" value="Unhealthy" tone="warning" compact /></Col>
            <Col span={12}><SmallMetric label="PM2.5" value="Moderate" tone="warning" compact /></Col>
            <Col span={12}><SmallMetric label="PM10" value="Good" tone="good" compact /></Col>
            <Col span={12}><SmallMetric label="CO2cal" value="Hazardous" tone="danger" compact /></Col>
            <Col span={12}><SmallMetric label="TVOC" value="Good" tone="good" compact /></Col>
            <Col span={12}><SmallMetric label="RH" value="Good" tone="good" compact /></Col>
            <Col span={12}><SmallMetric label="NO2" value="Good" tone="good" compact /></Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

function SmallMetric({ label, value, tone, compact = false }) {
  return (
    <div>
      <Text style={{ color: "#486284", fontSize: compact ? 12 : 14, lineHeight: 1.2 }}>{label}</Text>
      <div style={{ color: toneColor[tone], fontSize: compact ? 13 : 22, fontWeight: 700, lineHeight: 1.15 }}><AnimatedValue value={value} /></div>
    </div>
  );
}

function getItemStatus(item) {
  if (item.status) return item.status;
  return item.tone === "danger" ? "inactive" : "active";
}

function getStatusIcon(item, status) {
  const iconColor = statusColor[status] || statusColor.active;

  if (!item.icon) {
    return <AlertOutlined style={{ ...iconStyle, color: iconColor }} />;
  }

  if (React.isValidElement(item.icon)) {
    return React.cloneElement(item.icon, {
      style: {
        ...(item.icon.props?.style || {}),
        color: iconColor,
      },
    });
  }

  return item.icon;
}

function AnimatedValue({ value, duration = 900 }) {
  const displayValue = useCountUpValue(value, duration);
  return <>{displayValue}</>;
}

function useCountUpValue(value, duration) {
  const source = String(value);

  const parsed = useMemo(() => {
    const match = source.trim().match(/^(-?\d+(?:\.\d+)?)(\s*[a-zA-Z%/().-]*)$/);
    if (!match) return null;

    const target = Number.parseFloat(match[1]);
    if (Number.isNaN(target)) return null;

    const decimals = (match[1].split(".")[1] || "").length;
    return {
      target,
      decimals,
      suffix: match[2] || "",
    };
  }, [source]);

  const [display, setDisplay] = useState(() => {
    if (!parsed) return source;
    return formatCountValue(0, parsed.decimals) + parsed.suffix;
  });

  useEffect(() => {
    if (!parsed) {
      setDisplay(source);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = parsed.target * eased;

      setDisplay(formatCountValue(nextValue, parsed.decimals, progress === 1) + parsed.suffix);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [parsed, source, duration]);

  return display;
}

function formatCountValue(value, decimals, isFinal = false) {
  if (decimals > 0) {
    return value.toFixed(decimals);
  }

  if (isFinal) {
    return String(Math.round(value));
  }

  return String(Math.floor(value));
}

function getValueFontSize(value, isStrong) {
  if (isStrong) return "clamp(30px, 2.1vw, 44px)";
  if (value.length > 11) return "clamp(18px, 1.25vw, 24px)";
  if (value.length > 7) return "clamp(20px, 1.45vw, 28px)";
  return "clamp(24px, 1.8vw, 34px)";
}

export default Dashboard;