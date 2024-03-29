import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabConsultForecast from "../../components/TabConsultForecast";
import TabCompareForecasts from "../../components/TabCompareForecasts";
import TabHistoric from "../../components/TabHistoric";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Bem-vindo ao desafio Amplimed
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Consultar" {...a11yProps(0)} />
          <Tab label="Comparar" {...a11yProps(1)} />
          <Tab label="Histórico" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TabConsultForecast />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabCompareForecasts />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TabHistoric />
      </CustomTabPanel>
    </Box>
  );
};

export default Home;
