import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import { AccountFields } from '../components/profile/AccountFields';
import { FamilyFields } from '../components/profile/FamilyFields';
import { ProfileForm } from '../components/profile/ProfileForm';
import { DocsTable } from '../components/profile/DocsTable';
import { getEmployee } from '../utils/Axios';
import { useParams } from 'react-router-dom';
import { BankAccountData } from '../components/profile/BankAccountData';

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

export const ProfilePage = () => {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState({});
  const [documentation, setDocumentation] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id && id !== "0") {
      callApi();
    }  
  }, [id]);

  const callApi = async () => {
    const respuesta = await getEmployee(id);
    setProfile(respuesta.data);
    setDocumentation(respuesta.data.documentation_list);
  };

  const handleNext = () => {
    if (value < 3) {
      setValue(value + 1);
    }
  };

  const handlePrevious = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ style: { backgroundColor: '#5bbc5e' } }}
          sx={{
            '& .MuiTab-root.Mui-selected': { color: '#5bbc5e' },
          }}
        >
          <Tab label="Datos personales" {...a11yProps(0)} disabled />
          <Tab label="Datos bancarios" {...a11yProps(1)} disabled />
          <Tab label="Grupo familiar" {...a11yProps(2)} disabled />
          <Tab label="Documentacion" {...a11yProps(3)} disabled />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProfileForm profile={profile} setProfile={setProfile} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {profile.id && <BankAccountData employeeId={profile.id} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {profile.id && <FamilyFields employeeId={profile.id} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <DocsTable documentation={documentation} reload={callApi} employeeId={id} />
      </CustomTabPanel>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <button onClick={handlePrevious} disabled={value === 0}>
          Anterior
        </button>
        <button onClick={handleNext} disabled={value === 3}>
          Siguiente
        </button>
      </Box>
    </Box>
  );
};

export default ProfilePage;