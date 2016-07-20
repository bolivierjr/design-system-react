/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ButtonIcon from '../icon/button-icon';
import TooltipTrigger from '../popover-tooltip/trigger';
import omit from 'lodash.omit';

import { BUTTON } from '../../utilities/constants';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

const displayName = BUTTON;
const propTypes = {
	/**
	 * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
	 * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
	 */
	assistiveText: PropTypes.string,
	/**
	 * CSS classes to be added to button.
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Disables the button and adds disabled styling.
	 */
	disabled: PropTypes.bool,
	/**
	 * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
	 */
	hint: PropTypes.bool,
	/**
	 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
	 */
	iconCategory: PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
	/**
	 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	/**
	 * If omitted, icon position is centered.
	 */
	iconPosition: PropTypes.oneOf(['left', 'right']),
	/**
	 * Determines the size of the icon.
	 */
	iconSize: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
	 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
	 */
	iconVariant: PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'small', 'more']),
	/**
	 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
	 */
	id: PropTypes.string,
	/**
	 * Visible label on the button. If the button is an icon button with no label, you must use the <code>assistiveText</code> prop.
	 */
	label: PropTypes.string,
	/**
	 * Triggered when the button is clicked.
	 */
	onClick: PropTypes.func,
	/**
	 * If true, button scales to 100% width on small form factors.
	 */
	responsive: PropTypes.bool,
	/**
	 * Write <code>"-1"</code> if you don't want the user to tab to the button.
	 */
	tabIndex: PropTypes.string,
	/**
	 * It creates a tooltip with the content of the `node` provided.
	 */
	tooltip: PropTypes.node,
	/**
	 * HTML title attribute
	 */
	title: PropTypes.string,
	/**
	 * Use <code>icon-inverse</code> for white icons.
	 */
	variant: React.PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon', 'inverse', 'icon-inverse'])
};
const defaultProps = {
	id: shortid.generate(),
	disabled: false,
	hint: false,
	iconSize: 'medium',
	iconCategory: 'utility',
	responsive: false,
	variant: 'neutral'
};

/**
 * The Button component is the Lightning Design System Button component. The Button should be used for label buttons, icon buttons, or buttons that have both labels and icons.
 * Either a <code>label</code> or <code>assistiveText</code> is required; see the Prop Details table below.
 * For buttons that maintain selected/unselected states, use the <a href="#/button-stateful">ButtonStateful</a> component.
 */
class Button extends TooltipTrigger {

	constructor (props) {
		super(props);
		this.state = { active: false };
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount () {
		super.componentDidMount();
	}

	componentWillUnmount () {
		super.componentWillUnmount();
	}

	handleClick (event) {
		// Note that you can't read properties directly from the Synthetic event but you can read them by calling the specific property (ie. event.target, event.type, etc).
		// http://stackoverflow.com/questions/22123055/react-keyboard-event-handlers-all-null
		if (this.props.onClick) this.props.onClick(event);
		this.setState({ active: !this.state.active });
	}

	getClassName () {
		const iconOnly = this.props.variant === 'icon';
		const base = this.props.variant === 'base';

		return classNames(this.props.className, 'slds-button', {
			[`slds-button--${this.props.variant}`]: !base && !iconOnly,
			[`slds-button--icon-${this.props.iconVariant}`]: this.props.iconVariant,
			'slds-max-small-button--stretch': this.props.responsive
		});
	}

	renderIcon (name) {
		let buttonIcon = null;
		if (this.props.iconName) {
			let iconSize = this.props.iconSize === '' ? null : this.props.iconSize;
			buttonIcon = (<ButtonIcon
				hint={this.props.hint}
				name={name}
				category={this.props.iconCategory}
				position={this.props.iconPosition}
				size={iconSize}
			/>);
		}
		return buttonIcon;
	}

	renderIconMore () {
		let buttonIcon = null;
		if (this.props.iconVariant === 'more') {
			buttonIcon = (<ButtonIcon
				name="down"
				size="x-small"
			/>);
		}
		return buttonIcon;
	}

	renderLabel () {
		const iconOnly = this.props.variant === 'icon' || this.props.variant === 'icon-inverse';

		return iconOnly && this.props.assistiveText
      ? <span className="slds-assistive-text">{this.props.assistiveText}</span>
      : <span>{this.props.label}</span>;
	}

	render () {
		const props = omit(this.props, ['className', 'label', 'onClick']);

		return (
			<button
				className={this.getClassName()}
				{...props}
				onClick={this.handleClick}
			>
				{this.props.iconPosition === 'right' ? this.renderLabel() : null}

				{this.renderIcon(this.props.iconName)}
				{this.renderIconMore()}

				{(this.props.iconPosition !== 'right') ? this.renderLabel() : null}
				{this.props.children}
				{this.getTooltip()}
			</button>
		);
	}
}

Button.displayName = displayName;
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

module.exports = Button;
