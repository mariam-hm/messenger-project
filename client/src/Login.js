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
import bgImage from './images/bg-img.png'
import bubble from './images/bubble.svg'
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },

  // ---------- side image -----------
  image: {
    background: `url(${bgImage})`, 
    //'linear-gradient(to bottom,rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)'
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  sideContent: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(8), 
    marginRight: theme.spacing(8),
    textAlign:'center'
  },
  tagline: {
    color: 'white',
    textAlign: 'center',
    marginTop: theme.spacing(4)
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  // ---------- have an account -----------
  account: {
    color: '#949494'
  },
  accountButton: {
    marginLeft: theme.spacing(4),
    backgroundColor: '#FFFFFF',
    color: '#3A8DFF',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  // ---------- login form -----------
  content: {
    marginTop: theme.spacing(12)
  },
  title: {
    fontWeight: 'bolder'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  inputText: {
    width: '100%',
    marginTop: theme.spacing(4)
  },
  button: {
    marginTop: theme.spacing(8),
    backgroundColor: '#3A8DFF',
    color: 'white',
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }

}));

const Login = (props) => {

  const classes = useStyles();
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
