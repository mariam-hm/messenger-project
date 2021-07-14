import { makeStyles } from "@material-ui/core/styles";
import bgImage from '../images/bg-img.png';

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
      color: theme.palette.primary.contrastText,
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
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
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
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
          backgroundColor: theme.palette.primary.dark
      },
      color: theme.palette.primary.contrastText,
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  
}));

export { useStyles };
