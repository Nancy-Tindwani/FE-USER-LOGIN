import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Container,
  CssBaseline,
  Stack,
  Paper
} from "@mui/material";

function Home() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="body1" gutterBottom align="center">
          Please choose an option to continue
        </Typography>
        <Stack spacing={2} sx={{ mt: 3, width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Home;
