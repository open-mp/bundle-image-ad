import React, {PureComponent, Component} from 'react';
import cx from 'classnames';

/**
 * 行布局
 */
export default class ControlGroup extends PureComponent {

    static defaultProps = {
        required: false,
        showError: false,
        showLabel: true,
        focusOnLabelClick: true,
        error: ''
    };

    render() {
        const {
            className,
            showError,
            error,
            label,
            helpDesc,
            required,
            children,
            focusOnLabelClick,
        } = this.props;

        const errorVisible = showError && error;

        return (
            <div
                className={cx(`mp-design-editor__control-group`, className, {
                    'has-error': errorVisible,
                })}
            >
                {React.createElement(
                    focusOnLabelClick ? 'label' : 'div',
                    {
                        className: 'mp-design-editor__control-group-container',
                    },
                    <div
                        className='mp-design-editor__control-group-label'>
                        {required && (<span className='mp-design-editor__control-group-required-star'> * </span>)}
                        {label}
                    </div>,
                    <div className='mp-design-editor__control-group-control'>
                        {children}
                        {helpDesc && (
                            <div
                                className='mp-design-editor__control-group-help-desc'
                            >
                                {helpDesc}
                            </div>
                        )}
                    </div>
                )}
                {errorVisible && (
                    <div className='mp-design-editor__control-group-error'>
                        {error}
                    </div>
                )}
            </div>
        );
    }
}

function isEventLikeObject(evt) {
    return (
        evt &&
        evt.target &&
        evt.target.name &&
        evt.preventDefault &&
        evt.stopPropagation
    );
}
