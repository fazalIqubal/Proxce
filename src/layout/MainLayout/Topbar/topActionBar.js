import React, { Component } from 'react';
import { TopActionBar } from './topActionBar.style';
import { Popover, Button, Input } from 'antd';
import { connect } from 'react-redux';
import {
  setNote
} from "../../actions/sideFixedBarAction";

const { TextArea } = Input;


export class TopBarActions extends Component {
  constructor() {
    super();
    this.state = {
      noteVisible: false,
      descriptionVisible: false,
      checked: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }


  onEditNote(e) {
    this.setState({ note: e.target.value });
  }

  handleNoteVisibleChange = (noteVisible) => {
    this.setState({ noteVisible });
  }

  handleDescVisibleChange = (descriptionVisible) => {
    this.setState({ descriptionVisible });
  }

  saveNote = () => {
    this.setState({
      noteVisible: false,
    });

    this.props.setNote(this.state.note)
  }

  saveDescription = () => {
    this.setState({
      descriptionVisible: false,
    });
  }

  render() {
    return (
      <TopActionBar className="isoActionContainer">
        <div>
          <ul className="action-list">
            <li>
              <i className="notificationBg"></i>
              <p>Notifications</p>
            </li>
            <li>
              <Popover placement="bottom"
                title={
                  <span>Add Note</span>
                }
                content={
                  <div>
                    <TextArea onChange={(e) => { this.onEditNote(e) }} placeholder="Add note here" autosize />
                    <div className="popover-fotter">
                      <Button onClick={(e) => { this.saveNote() }}>SAVE</Button>
                    </div>
                  </div>
                }
                visible={this.state.noteVisible}
                trigger="click"
                className="popover-div"
                onVisibleChange={this.handleNoteVisibleChange}>

                <i className="documentBg"></i>
                <p>Notes</p>

              </Popover>
            </li>
            <li>

              <Popover placement="bottom"
                title={
                  <span>Add Description</span>
                }
                content={
                  <div>
                    <TextArea onChange={(e) => {console.log(e) }} placeholder="Add note here" autosize />
                    <div className="popover-fotter">
                      <Button onClick={(e) => { this.saveDescription() }}>SAVE</Button>
                    </div>
                  </div>
                }
                visible={this.state.descriptionVisible}
                trigger="click"
                className="popover-div"
                onVisibleChange={this.handleDescVisibleChange}>

                <i className="descriptionBg"></i>
                <p>Description</p>

              </Popover>


            </li>
          </ul>
        </div>
      </TopActionBar>
    );
  }
}


export default connect(
  state => ({
  }),
  { setNote }
)(TopBarActions);
