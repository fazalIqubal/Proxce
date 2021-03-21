import {SideFixedBar} from "../../components/SideFixedBar/sideFixedBar";
import { connect } from "react-redux";

import {
    setSelectedMenu
} from "../action/sideFixedBarAction";

const mapStateToProps = (state, props) => ({
  Selectedmenu: {}
});

const mapDispatchToProps = (dispatch, props) => ({
    setSelectedMenu: () => dispatch(setSelectedMenu("ID", props.node.id))
});

const SideFixedBarContainer = connect(mapStateToProps, mapDispatchToProps)(
    SideFixedBar
);

export default SideFixedBarContainer;
