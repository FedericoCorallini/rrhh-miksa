
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import { AccountFields } from '../components/AccountFields';
import { FamilyFields } from '../components/FamilyFields';
import { ProfileForm } from '../components/ProfileForm';
import { getEmployee } from '../utils/Axios';
import { DocsTable } from '../components/DocsTable';
import { DocumentationModal } from '../components/DocumentationModal';
import { useParams } from 'react-router-dom';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props; 

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Profile = () => {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState([]);
  const [documentation, setDocumentation] = useState([]);
  const {id} = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    callApi();
    
  }, []);

  const callApi = async () => {
    console.log(id)
    const respuesta = await getEmployee(id);
    setProfile(respuesta.data);
    setDocumentation(respuesta.data.documentation_list)
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Perfil" {...a11yProps(0)} />
          <Tab label="Datos bancarios" {...a11yProps(1)} />
          <Tab label="Grupo familiar" {...a11yProps(2)} />
          <Tab label="Documentacion" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProfileForm profile={profile} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AccountFields />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FamilyFields />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <DocsTable documentation={documentation} reload={callApi} employeeId={id} ></DocsTable>
      </CustomTabPanel>
    </Box>
  );
}
