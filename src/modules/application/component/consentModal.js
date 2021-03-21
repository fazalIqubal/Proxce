import React, { Component } from 'react';
import { Modal, Button, Tabs } from 'antd';
import './applicationDetail.scss';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { TabPane } = Tabs

class ConsentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: {},
      formSubmit: false,
      customer: {
        tenantName: '',
        descraption:''
      },
      toolbar:{
        options:['history', 'inline', 'textAlign', 'list', 'blockType', 'fontSize'],
        inline: { inDropdown: false,
          options: ['bold', 'italic', 'underline'] },
      },
      editorStyle : {
        height: '200px',
      }
		}
  }

  handleCancel = e => {
    console.log(e);
    this.props.toggle()
  };
	
  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };


  render() {
    const { editorState, toolbar, editorStyle } = this.state;

    return (
      <div >
        <Modal
          className="delete-account consent-form"
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div className="footer-box" key="delete">
              <Button className="delete-btn ok-btn" key="back" onClick={this.handleOk}>
                OK
            </Button>
              <Button className="cancle-btn" key="submit" type="primary" onClick={this.handleCancel}>
                CANCEL
            </Button>
            </div>
          ]}
        >
				<div className="heading-text">Consent Form</div>
				<div className="tab-section">
          <Tabs defaultActiveKey="1">
            <TabPane tab="English" key="1">
              <Editor 
                editorStyle={editorStyle}
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={toolbar}/>
            </TabPane>
            <TabPane tab="Spanish" key="2">
              <Editor 
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={toolbar}/>
            </TabPane>
        	</Tabs>
        </div>
        </Modal>
      </div>
    );
  }
}

export default ConsentForm;
