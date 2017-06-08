import React, {Component} from 'react';

/**
 * @function getCurrentPath
 * @description get current route
 * @returns {string}
 */
const getCurrentPath = () => {
    const path = document.location.pathname;
    return path.substring(path.lastIndexOf('/'));
};

/**
 * @class Router
 * @return {string} - HTML markup for the component
 */
export class Router extends Component {
    constructor() {
        super();
        this.state = {
            route: '/'
        };

        history.pushState(null, '', this.state.route);
    }

    state = {
      route: getCurrentPath()
    };

    /**
     * @function handleLinkClick
     * @description set route state to current route
     * @param route {string}
     */
    handleLinkClick = (route) => {
        this.setState({route});
        history.pushState(null, '', route);
    };

    /**
     *
     * @type {{route, linkHandler: (*)}}
     */
    static childContextTypes = {
        route: React.PropTypes.string,
        linkHandler: React.PropTypes.func
    };

    /**
     *
     * @returns {{route: (string|*), linkHandler: (function(*=))}}
     */
    getChildContext() {
        return {
            route: this.state.route,
            linkHandler: this.handleLinkClick
        }
    }

    /**
     * @function componentDidMount
     * @description React lifecycle method - is invoked immediately after a component is mounted
     */
    componentDidMount() {
        window.onpopstate = () => {
            this.setState({route: getCurrentPath()});
        }
    }

    /**
     * Renders the component.
     *
     * @return {string} - HTML markup for the component
     */
    render() {
        return <div>{this.props.children}</div>
    }
}