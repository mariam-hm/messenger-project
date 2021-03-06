import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  CssBaseline,
  Paper
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { useStyles } from './themes/loginTheme';
import bubble from './images/bubble.svg';

const Login = (props) => {

  const classes = useStyles(props);
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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

        {/* ------------------------------- SIGN UP PART ------------------------------- */}
        <Grid item xs={12} sm={8} md={7} component={Paper} square>

          <div className={classes.paper}>

            <Grid container item justifyContent="flex-end" alignItems="center">
              <Typography className={classes.account} >Already have an account?</Typography>
              <Button className={classes.accountButton} variant="contained" onClick={() => history.push("/login")}>Login</Button>
            </Grid>

            <Grid container item className={classes.content} md={8} lg={8}>

              <Typography className={classes.title} component="h1" variant="h5">
                Create an account.
              </Typography>


              <form onSubmit={handleRegister} className={classes.form}>
                <Grid>
                  <Box>
                    <FormControl className={classes.inputText}>
                      <TextField
                        aria-label="username"
                        label="Username"
                        name="username"
                        type="text"
                        required
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl className={classes.inputText}>
                      <TextField
                        label="E-mail address"
                        aria-label="e-mail address"
                        type="email"
                        name="email"
                        required
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl className={classes.inputText} error={!!formErrorMessage.confirmPassword}>
                      <TextField
                        aria-label="password"
                        label="Password"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="password"
                        required
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                  
                  {/* <Box>
                    <FormControl className={classes.inputText} error={!!formErrorMessage.confirmPassword}>
                      <TextField
                        label="Confirm Password"
                        aria-label="confirm password"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="confirmPassword"
                        required
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                  </Box> */}
                  
                  <Grid container justifyContent="center" alignItems="center">
                    <Button className={classes.button} type="submit" variant="contained" size="large">
                      Create
                    </Button>
                  </Grid>

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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
