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
import axios from "axios";

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
    this.state = {
      text: "",
      picturesURL: []
    };
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    if (event.target.text.value !== '' && !(/^\s+$/.test(event.target.text.value))) {
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

  handleDeletePic = (url) => {
    let newPicturesURL = this.state.picturesURL.filter((imageURL) => {
      return imageURL !== url
    })
    this.setState({
      ...this.state,
      picturesURL: newPicturesURL
    })
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
      <form className={classes.root} onSubmit={this.handleSubmit}>

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
                onChange={this.handleChange}
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
