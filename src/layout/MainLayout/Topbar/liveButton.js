import React, { Component } from 'react';
import { connect } from 'react-redux';
import LiveButtonModal from './liveButton.style';

const borderRadiusStyle = { borderRadius: 2 }

class LiveButton extends Component {

  constructor() {
    super();
    this.state = { checked: true, liveChecked: true, draftChecked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(e, checked) {
    let value = e.target.value
    if(value == 'draft'){
      this.setState((prevState) => {
        return { liveChecked: false, draftChecked: true }
      });
    }else{
      this.setState((prevState) => {
        return { liveChecked: true, draftChecked: false }
      });
    }
  }
  render() {
    const liveInputClass = "switch-input" + (this.state.liveChecked ? " checked" : "");
    const draftInputClass = "switch-input" + (this.state.draftChecked ? " checked" : "");
    const liveClassName = "switch-label" + (this.state.liveChecked ? " switch-label-on" : " switch-label-off");
    const draftClassName = "switch-label" + (this.state.draftChecked ? " switch-label-on" : " switch-label-off");
    return (
      <LiveButtonModal className="isoButtonContainer">
        <div>
            <div className="switch-container">
              <div className="switch live-button">
                  <input type="radio" className={liveInputClass} 
                    checked={this.state.liveChecked ? 'checked' : '' }
                    onChange = {this.handleChange} 
                    name="live_draft" 
                    value="live" 
                    id="live"/>
                  <label htmlFor="live" className={liveClassName}>Live</label>
                  <input type="radio" className={draftInputClass}  
                    checked={this.state.draftChecked ? 'checked' : '' } 
                    onChange = {this.handleChange} 
                    name="live_draft" 
                    value="draft" 
                    id="draft"/>
                  <label htmlFor="draft" className={draftClassName}>Draft</label>
              </div>
            </div>
        </div>
      </LiveButtonModal>
    );
  }
}

export default connect(state => ({
  ...state.APP.App.toJS(),
  customizedTheme: 'themedefault'
}))(LiveButton);
