import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  CssBaseline,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Paper
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { useStyles } from './themes/loginTheme';
import bubble from './images/bubble.svg';

const Login = (props) => {

  const classes = useStyles(props);
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <CssBaseline />
      
      {/* ------------------------------- SIDE IMAGE AND TAGLINE ------------------------------- */}
      <Grid container item xs={false} sm={4} md={5} className={classes.image} justifyContent="center" alignItems="center" direction="column">
        <div className={classes.sideContent}>
          <img src={bubble} alt="bubble" />
          <Typography component="h1" variant="h5" className={classes.tagline}>Converse with anyone with any language</Typography>
        </div>
      </Grid>

      {/* ------------------------------- LOGIN PART ------------------------------- */}
      <Grid item xs={12} sm={8} md={7} component={Paper} square>

        <div className={classes.paper}>

          <Grid container item justifyContent="flex-end" alignItems="center">
            <Typography className={classes.account} >Don't have an account ?</Typography>
            <Button className={classes.accountButton} variant="contained" onClick={() => history.push("/register")}>Create account</Button>
          </Grid>


          <Grid container item className={classes.content} md={8} lg={8}>

            <Typography className={classes.title} component="h1" variant="h5">
              Welcome back!
            </Typography>

            <form onSubmit={handleLogin} className={classes.form}>
            
                <Box>
                  <FormControl className={classes.inputText} margin="normal" required>
                    <TextField 
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl className={classes.inputText} margin="normal" required>
                    <TextField
                      label="Password"
                      aria-label="password"
                      type="password"
                      name="password"
                    />
                  </FormControl>
                </Box>

                <Grid container justifyContent="center" alignItems="center">
                  <Button className={classes.button} type="submit" variant="contained" size="large">
                    Login
                  </Button>
                </Grid>
                
            </form>

          </Grid>

        </div>

      </Grid>

    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
