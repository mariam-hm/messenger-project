import React, { Component } from "react";
import { 
  Box,
  FormControl, 
  TextField,
  Card,
  IconButton
} from "@material-ui/core";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'row',
    alignItems: 'center',
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    padding: 5
  },
  textField: {
    color: "#91A3C0",
    margin: '5px'
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
};

class Input extends Component {

  constructor(props) {
    super(props);

    this.buttonRef = null;
    this.setButtonRef = element => {
      this.buttonRef = element;
    }

    this.state = {
      text: "",
      picturesURL: []
    };
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      text: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    if (!((event.target.text.value === '' || /^\s+$/.test(event.target.text.value)) && this.state.picturesURL.length === 0)) {
      const reqBody = {
        ...this.state,
        text: event.target.text.value,
        recipientId: this.props.otherUser.id,
        conversationId: this.props.conversationId,
        sender: this.props.conversationId ? null : this.props.user,
      };
      await this.props.postMessage(reqBody);
      this.setState({
        text: "",
        picturesURL: []
      });
    }
  };

  handleUploadPic = (e) => {

    // Is there a better place to store those values ?
    const CLOUD_NAME = 'dlqq70r7u';
    const API_ENDPOINT_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    const UNSIGNED_UPLOAD_PRESET = 'f70isleq';

    for (const file of e.target.files) {

      const xhr = new XMLHttpRequest();
      var formData = new FormData();

      xhr.open('POST', API_ENDPOINT_URL, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);

          this.setState({
            ...this.state,
            picturesURL: [...this.state.picturesURL, response.secure_url]
          })
        }
      }

      formData.append("upload_preset", UNSIGNED_UPLOAD_PRESET)
      formData.append("file", file)

      xhr.send(formData);
    }

    
  }

  handleDeletePic = (url) => {
    let newPicturesURL = this.state.picturesURL.filter((imageURL) => {
      return imageURL !== url
    })
    this.setState({
      ...this.state,
      picturesURL: newPicturesURL
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.buttonRef.click();
    }
  }


  render() {
    const { classes } = this.props;

    const imagesPreview = (imagesURLs) => {
      return (
        imagesURLs.length ? (
          imagesURLs.map(url => {
              return <Card key={url} style={{height: '80px', width: '80px', margin: '2px', background: `url(${url})`, backgroundSize: 'cover'}} >
                      <IconButton onClick={() => this.handleDeletePic(url)} size="small" color="primary">
                        <CancelRoundedIcon fontSize="small" />
                      </IconButton>
                    </Card>
            })
          ) : (null)
      )
    }

    return (
      <form className={classes.root} onSubmit={this.handleSubmit}  >

        <Box container item className={classes.input} >
          <Box flexGrow={1}>

            <Box className={classes.boxPreviewPictures} >
              {imagesPreview(this.state.picturesURL)}
            </Box>

            <FormControl fullWidth hiddenLabel>
              <TextField
                border={0}
                placeholder="Type something..."
                value={this.state.text}
                name="text"
                multiline
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                
                InputProps={{
                  disableUnderline: true,
                  className: classes.textField
                }}
              />
            </FormControl>
          </Box>

          <Box>
            <input multiple accept="image/*" className={classes.invisible} id="icon-button-file" type="file" onChange={this.handleUploadPic}/>
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
          </Box>

          <button type="submit" ref={this.setButtonRef} className={classes.invisible} ></button>

        </Box>
      </form>
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
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
