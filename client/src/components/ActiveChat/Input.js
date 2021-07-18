import { 
  Box,
  FormControl, 
  TextField,
  Card,
  IconButton
} from "@material-ui/core";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'row',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    padding: 5
  },
  textField: {
    color: theme.palette.secondary.dark,
    margin: theme.spacing(1)
  },
  invisible: {
    display: 'none'
  },
  boxPreviewPictures: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'row',
    alignItems: 'center'
  }
}));

const Input = (props) => {

  const classes = useStyles()

  const [buttonRef, setButtonRef] = useState(null);
  const [state, setState] = useState({
    text: "",
    picturesURL: []
  });

  const handleChange = (event) => {
    setState({
      ...state,
      text: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    if (!((event.target.text.value === '' || /^\s+$/.test(event.target.text.value)) && state.picturesURL.length === 0)) {
      const reqBody = {
        ...state,
        text: event.target.text.value,
        recipientId: props.otherUser.id,
        conversationId: props.conversationId,
        sender: props.conversationId ? null : this.props.user,
      };
      await props.postMessage(reqBody);
      setState({
        text: "",
        picturesURL: []
      });
    }
  };

  
  const handleUploadPic = (e) => {
    
    for (const file of e.target.files) {

      let formData = new FormData();
      formData.append("upload_preset", process.env.REACT_APP_UNSIGNED_UPLOAD_PRESET)
      formData.append("file", file)

      fetch(process.env.REACT_APP_API_ENDPOINT_URL, 
        {
          method: 'POST',
          body: formData
        }).then((response) => response.json()).then((response) => {
          this.setState({
                  ...this.state,
                  picturesURL: [...this.state.picturesURL, response.secure_url]
                })
        })
    }

  }

  const handleDeletePic = (url) => {
    let newPicturesURL = state.picturesURL.filter((imageURL) => {
      return imageURL !== url
    })
    setState({
      ...state,
      picturesURL: newPicturesURL
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      buttonRef.click();
    }
  }


  const imagesPreview = (imagesURLs) => {
    return (
      imagesURLs.length ? (
        imagesURLs.map(url => {
            return <Card key={url} style={{height: '80px', width: '80px', margin: '2px', background: `url(${url})`, backgroundSize: 'cover'}} >
                    <IconButton onClick={() => handleDeletePic(url)} size="small" color="primary">
                      <CancelRoundedIcon fontSize="small" />
                    </IconButton>
                  </Card>
          })
        ) : (null)
    )
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}  >

      <Box container item className={classes.input} >
        <Box flexGrow={1}>

          <Box className={classes.boxPreviewPictures} >
            {imagesPreview(state.picturesURL)}
          </Box>

          <FormControl fullWidth hiddenLabel>
            <TextField
              border={0}
              placeholder="Type something..."
              value={state.text}
              name="text"
              multiline
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              
              InputProps={{
                disableUnderline: true,
                className: classes.textField
              }}
            />
          </FormControl>
        </Box>

        <Box>
          <input multiple accept="image/*" className={classes.invisible} id="icon-button-file" type="file" onChange={handleUploadPic}/>
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
        </Box>

        <button type="submit" ref={setButtonRef} className={classes.invisible} ></button>

      </Box>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
