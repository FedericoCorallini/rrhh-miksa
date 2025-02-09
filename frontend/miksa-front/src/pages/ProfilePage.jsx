import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import { AccountFields } from '../components/profile/AccountFields';
import { FamilyFields } from '../components/profile/FamilyFields';
import { ProfileForm } from '../components/profile/ProfileForm';
import { DocsTable } from '../components/profile/DocsTable';
import { getEmployee } from '../utils/Axios';
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

export const ProfilePage = () => {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState([]);
  const [documentation, setDocumentation] = useState([]);
  const {id} = useParams();
  const [newEmployee, setNewEmployee] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id && id !== "0") {
      callApi();
    }else{
      setNewEmployee(true);
    }
  }, [id]);

  const callApi = async () => {
    const respuesta = await getEmployee(id);
    setProfile(respuesta.data);
    setDocumentation(respuesta.data.documentation_list)
  };
  console.log("ProfilePage");
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ style: { backgroundColor: '#5bbc5e' } }} // Cambia el color de la barra inferior
          sx={{
            '& .MuiTab-root.Mui-selected': { color: '#5bbc5e' }, // Cambia el color del texto de la pestaña seleccionada
          }}
        >
          <Tab label="Datos personales" {...a11yProps(0)} />
          <Tab label="Datos bancarios" {...a11yProps(1)} />
          <Tab label="Grupo familiar" {...a11yProps(2)} />
          <Tab label="Documentacion" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProfileForm profile={profile} setProfile={setProfile} newEmployee={newEmployee}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {profile.id ? (<AccountFields employeeId={profile.id}/>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#ffebee', borderRadius: 1 }}>
            <Typography color="error" variant="h6">Debe ingresar al empleado antes de acceder a esta sección.</Typography>
          </Box>)}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {profile.id ? (<FamilyFields employeeId={profile.id} />
        ) : (
          <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#ffebee', borderRadius: 1 }}>
            <Typography color="error" variant="h6">Debe ingresar al empleado antes de acceder a esta sección.</Typography>
          </Box>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {!newEmployee ? (<DocsTable documentation={documentation} reload={callApi} employeeId={id} ></DocsTable>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#ffebee', borderRadius: 1 }}>
            <Typography color="error" variant="h6">Debe ingresar al empleado antes de acceder a esta sección.</Typography>
          </Box>
        )}
      </CustomTabPanel>
    </Box>
  );
};

export default ProfilePage;