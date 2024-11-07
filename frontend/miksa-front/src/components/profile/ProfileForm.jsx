import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { BasicDatePicker } from "../BasicDatePicker";
import { Button } from "@mui/material";
import { postEmployee, putEmployee } from "../../utils/Axios";
import { useAuth0 } from "@auth0/auth0-react";

export const ProfileForm = ({ profile }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: profile,
  });

  const { user } = useAuth0();

  useEffect(() => {
    if (profile) {
      for (const key in profile) {
        setValue(key, profile[key]);
      }
    }
  }, [profile, setValue]);

  const onSubmit = async (data) => {
    if (data.id === undefined) {
      await postEmployee(data);
    } else {
      await putEmployee(data.id, data);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Nombre"
          variant="standard"
          {...register("firstname", { required: "El nombre es obligatorio" })}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
        />
        <TextField
          label="Apellido"
          variant="standard"
          {...register("lastname", { required: "El apellido es obligatorio" })}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
        />
        <TextField
          label="DNI"
          variant="standard"
          {...register("dni", { required: "El DNI es obligatorio" })}
          error={!!errors.dni}
          helperText={errors.dni?.message}
        />
        <TextField
          label="CUIL"
          variant="standard"
          {...register("cuil", { required: "El CUIL es obligatorio" })}
          error={!!errors.cuil}
          helperText={errors.cuil?.message}
        />
        <TextField
          label="Celular"
          variant="standard"
          {...register("cell_phone_number", { required: "El celular es obligatorio" })}
          error={!!errors.cell_phone_number}
          helperText={errors.cell_phone_number?.message}
        />
        <TextField
          label="Teléfono"
          variant="standard"
          {...register("home_phone_number", { required: "El teléfono es obligatorio" })}
          error={!!errors.home_phone_number}
          helperText={errors.home_phone_number?.message}
        />
        <TextField
          label="Email"
          variant="standard"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: { value: /\S+@\S+\.\S+/, message: "El email no es válido" },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Estado civil"
          variant="standard"
          select
          {...register("marital_status", { required: "El estado civil es obligatorio" })}
          error={!!errors.marital_status}
          helperText={errors.marital_status?.message}
        >
          <MenuItem value="soltero">Soltero</MenuItem>
          <MenuItem value="casado">Casado</MenuItem>
          <MenuItem value="divorciado">Divorciado</MenuItem>
          <MenuItem value="viudo">Viudo</MenuItem>
        </TextField>
        <TextField
          label="Género"
          variant="standard"
          select
          {...register("gender", { required: "El género es obligatorio" })}
          error={!!errors.gender}
          helperText={errors.gender?.message}
        >
          <MenuItem value="hombre">Hombre</MenuItem>
          <MenuItem value="mujer">Mujer</MenuItem>
          <MenuItem value="otro">Otro</MenuItem>
        </TextField>
        <TextField
          label="Nacionalidad"
          variant="standard"
          select
          {...register("nationality", { required: "La nacionalidad es obligatoria" })}
          error={!!errors.nationality}
          helperText={errors.nationality?.message}
        >
          <MenuItem value="Argentina">Argentina</MenuItem>
          <MenuItem value="Brasil">Brasil</MenuItem>
          <MenuItem value="Chile">Chile</MenuItem>
          {/* Agrega más países latinoamericanos aquí */}
        </TextField>
        <TextField
          label="Horario laboral"
          variant="standard"
          {...register("working_hours", { required: "El horario laboral es obligatorio" })}
          error={!!errors.working_hours}
          helperText={errors.working_hours?.message}
        />
        <TextField
          label="Puesto laboral"
          variant="standard"
          {...register("job_position", { required: "El puesto laboral es obligatorio" })}
          error={!!errors.job_position}
          helperText={errors.job_position?.message}
        />
        <BasicDatePicker
          label="Fecha de nacimiento"
          {...register("date_of_birth", { required: "La fecha de nacimiento es obligatoria" })}
        />
        <BasicDatePicker
          label="Fecha de admisión"
          {...register("date_of_admission")}
        />
      </Box>

      {user && user["roles/roles"] && user["roles/roles"].includes("admin") && (
        <Button
          sx={{ mt: "15px" }}
          type="submit"
          variant="contained"
          size="large"
        >
          Guardar
        </Button>
      )}
    </Box>
  );
};


// import { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { BasicDatePicker } from "../BasicDatePicker";
// import { Button } from "@mui/material";
// import { postEmployee, putEmployee } from "../../utils/Axios";
// import { useAuth0 } from "@auth0/auth0-react";

// export const ProfileForm = ({ profile }) => {
//   const [data, setData] = useState(profile);
//   const { user } = useAuth0();

//   useEffect(() => {
//     setData(profile);
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleDateChange = (name, date) => {
//     setData((prevData) => ({
//       ...prevData,
//       [name]: date.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (data.id === undefined) {
//       postEmployee(data);
//     } else {
//       putEmployee(data.id, data);
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit}>
//       <Box
//         sx={{
//           "& > :not(style)": { m: 1, width: "25ch" },
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         <TextField
//           label="Nombre"
//           variant="standard"
//           name="firstname"
//           value={data.firstname || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Apellido"
//           variant="standard"
//           name="lastname"
//           value={data.lastname || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Dni"
//           variant="standard"
//           name="dni"
//           value={data.dni || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Cuil"
//           variant="standard"
//           name="cuil"
//           value={data.cuil || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Celular"
//           variant="standard"
//           name="cell_phone_number"
//           value={data.cell_phone_number || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Telefono"
//           variant="standard"
//           name="home_phone_number"
//           value={data.home_phone_number || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Email"
//           variant="standard"
//           name="email"
//           value={data.email || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Estado civil"
//           variant="standard"
//           name="marital_status"
//           value={data.marital_status || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Horario laboral"
//           variant="standard"
//           name="working_hours"
//           value={data.working_hours || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Nacionalidad"
//           variant="standard"
//           name="nationality"
//           value={data.nationality || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Puesto laboral"
//           variant="standard"
//           name="job_position"
//           value={data.job_position || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Genero"
//           variant="standard"
//           name="gender"
//           value={data.gender || ""}
//           onChange={handleChange}
//         />
//         <BasicDatePicker
//           label="Fecha de nacimiento"
//           date={data.date_of_birth}
//           onChange={(date) => handleDateChange("date_of_birth", date)}
//         />
//         <BasicDatePicker
//           label="Fecha de admisión"
//           date={data.date_of_admission}
//           onChange={(date) => handleDateChange("date_of_admission", date)}
//         />
//       </Box>

//       {user && user["roles/roles"] && user["roles/roles"].includes("admin") && (
//         <Button
//           sx={{ mt: "15px" }}
//           type="submit"
//           variant="contained"
//           size="large"
//         >
//           Guardar
//         </Button>
//       )}
//     </Box>
//   );
// };
