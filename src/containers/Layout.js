import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import DesktopContainer from "./layouts/DesktopContainer";
import MobileContainer from "./layouts/MobileContainer";

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node
};

class CustomLayout extends React.Component {
    render() {
        return <ResponsiveContainer>{this.props.children}</ResponsiveContainer>;
    }
}

export default withRouter(CustomLayout);