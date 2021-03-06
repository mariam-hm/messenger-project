import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";

const useStyles = makeStyles(() => ({
  root: {
    height: "97vh",
  }
}));


const Home = (props) => {

  const classes = useStyles();

  const [state, setState] = useState({
    isLoggedIn: false
  });


  useEffect(() => {
    props.fetchConversations();
  }, [props]);

  
  useEffect(() => {
    setState({
      isLoggedIn: true,
    });
  }, [props.user.id])

  
  const handleLogout = async () => {
    await props.logout(props.user.id);
  };


  if (!props.user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (state.isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  } else {
    return (
      <>
        {/* logout button will eventually be in a dropdown next to username */}
        <Button className={classes.logout} onClick={handleLogout}>
          Logout
        </Button>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <SidebarContainer />
          <ActiveChat />
        </Grid>
      </>
    );
  }


}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
