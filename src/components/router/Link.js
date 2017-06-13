import React, {Component} from 'react';
/**
 * @class Link
 * @return {string} - HTML markup for the component
 */
export class Link extends Component {
    static contextTypes = {
        route: React.PropTypes.string,
        linkHandler: React.PropTypes.func
    };

    /**
     * @function handleClick
     * @description
     * @param evt
     */
    handleClick = (evt) => {
      evt.preventDefault();
      this.context.linkHandler(this.props.to);
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        const activeClass = this.context.route === this.props.to ? 'dropdown__link active' : 'dropdown__link';
        return <a href="#"
                  className={activeClass}
                  onClick={this.handleClick}>{this.props.children}</a>
    }
}

/**
 *
 * @type {{to: (*)}}
 */
Link.propTypes = {
    to: React.PropTypes.string.isRequired
};