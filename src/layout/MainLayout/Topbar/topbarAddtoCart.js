import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../../components/uielements/popover';
import TopbarDropdownWrapper from './topbarDropdown.style';

class TopbarAddtoCart extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.cancelQuantity = this.cancelQuantity.bind(this);
  }
  hide() {
    this.props.changeViewTopbarCart(false);
  }
  handleVisibleChange() {
    this.props.changeViewTopbarCart(!this.props.viewTopbarCart);
  }
  componentDidMount() {
    
  }
  renderProducts() {
    
  }
  changeQuantity(objectID, quantity) {
    
  }
  cancelQuantity(objectID) {
    
  }

  render() {
    const {
      viewTopbarCart,
      customizedTheme,
    } = this.props;
    const content = (
      <TopbarDropdownWrapper className="topbarAddtoCart">
        
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={viewTopbarCart}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-android-cart"
            style={{ color: customizedTheme.textColor }}
          />
        </div>
      </Popover>
    );
  }
}
function mapStateToProps(state) {
  return {
    customizedTheme: 'themedefault',
  };
}
export default connect(mapStateToProps, {

})(TopbarAddtoCart);
