import { LoginRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ILogin, useLoginMutation } from "../../app/services/auth/auth";
import MyAlert from "../../components/common/ui/myAlert/MyAlert";
import { role_list } from "../../constants/const";
import { admin_routes, store_routes } from "../../constants/path";

import Logo from "../../assets/images/logo-dark.png";

const defaultTheme = createTheme();

const validationSchema = yup.object({
  login: yup.string().required("Login talab qilinadi"),
  parol: yup.string().required("Parol talab qilinadi"),
});

function Login() {
  // Navigate
  const navigate = useNavigate();

  // Api
  const [sendAuthLogin, { isLoading, data, isError }] = useLoginMutation();

  // Formik
  const formik = useFormik({
    initialValues: {
      login: "",
      parol: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // Handle navigate
  const onTo = useCallback(
    (to: string) => {
      setTimeout(() => {
        navigate(to);
      }, 1000);
    },
    [navigate]
  );

  // useEffect
  useEffect(() => {
    if (data && data.success) {
      switch (data.data.rol) {
        case role_list.admin:
          onTo(admin_routes.home);
          break;
        case role_list.store:
          onTo(store_routes.home);
          break;
      }
    }
  }, [data, onTo]);

  // useMemo
  const alertStatus = useMemo(() => {
    if (data?.success) return "success";
    else return "error";
  }, [data?.success]);

  // Submit
  const handleSubmit = async ({ login, parol }: ILogin) => {
    await sendAuthLogin({ login, parol });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="My System Logo" width={120} />
          <Typography component="h1" variant="h5">
            Kirish
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box sx={{ mt: 1 }}>
              <TextField
                autoFocus={true}
                margin="normal"
                size="small"
                fullWidth
                id="login"
                name="login"
                label="Login"
                value={formik.values.login}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
              />
              <TextField
                margin="normal"
                size="small"
                fullWidth
                id="parol"
                name="parol"
                label="Parol"
                type="password"
                value={formik.values.parol}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.parol && Boolean(formik.errors.parol)}
                helperText={formik.touched.parol && formik.errors.parol}
              />

              <MyAlert status={alertStatus} isErrNetwork={isError}>
                {data?.message}
              </MyAlert>

              <LoadingButton
                loadingPosition="start"
                loading={isLoading}
                startIcon={<LoginRounded />}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Kirish
              </LoadingButton>
            </Box>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default Login;
