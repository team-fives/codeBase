import React, { useContext, useState } from "react";
import { useNavigate, Navigate, Link as RouterLink } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import { Grid, Paper, Box, TextField, Button, Typography, Link, createTheme, ThemeProvider } from "@mui/material";
import background from "../imgs/backgroundCityGreen.jpg";

const theme = createTheme({
  palette: {
    primary: {
      main: '#45885f',
    },
  },
});

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password) return setErrorText('Missing username or password');
    if (password !== passwordCheck) return setErrorText('Passwords do not match');
    const [user, error] = await createUser({ username, password });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'passwordCheck') setPasswordCheck(value);
  };

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
            <Typography component="h1" variant="h5" sx={{ color: '#45885f', mt: 3, mb: 1 }}>
              Sign Up
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
                onChange={handleChange}
                value={username}
                sx={{ borderColor: '#45885f' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
                value={password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordCheck"
                label="Confirm Password"
                type="password"
                id="passwordCheck"
                autoComplete="new-password"
                onChange={handleChange}
                value={passwordCheck}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
              >
                Sign Up
              </Button>
              {errorText && (
                <Typography color="error" sx={{ mt: 2 }}>{errorText}</Typography>
              )}
              <Link component={RouterLink} to="/login" variant="body2" sx={{ mt: 2 }}>
                {"Already have an account? Log In"}
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
