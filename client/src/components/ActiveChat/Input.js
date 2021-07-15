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
    backgroundColor: "grey",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    padding: 5
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
      });
    }
  };

  handleUploadPic = (e) => {
    const files = e.target.files
    const imagesArray = [];

    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        imagesArray.push(reader.result)
        this.setState({
          ...this.state,
          picturesURL: [...this.state.picturesURL, reader.result]
        })
      }
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
                placeholder="Type something..."
                value={this.state.text}
                name="text"
                onChange={this.handleChange}
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
