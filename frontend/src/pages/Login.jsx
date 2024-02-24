import React, { useContext, useState } from "react";
import { useNavigate, Navigate, Link as RouterLink } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import { Grid, Paper, Box, TextField, Button, Typography, Link, createTheme, ThemeProvider } from "@mui/material";
import background from "../imgs/backgroundCityGreen.jpg";

const theme = createTheme({
  palette: {
    primary: {
      main: '#45885f',
    },
  },
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(Object.fromEntries(formData));
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{
        p: 3,
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(' + background + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Grid item xs={12} sm={8} md={5} lg={4} xl={3} component={Paper} elevation={6} square sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 4 }, backgroundColor: '#fff', borderRadius: '2vh' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ color: 'primary.main', mt: 3, mb: 1 }}>
              Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
              >
                Log In
              </Button>
              {errorText && (
                <Typography color="error" sx={{ mt: 2 }}>{errorText}</Typography>
              )}
              <Link component={RouterLink} to="/sign-up" variant="body2" sx={{ mt: 2 }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
