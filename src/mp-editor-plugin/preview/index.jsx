import React, {PureComponent} from 'react';
import './preview.pcss'

export default class LinePreview extends PureComponent {
    render() {
        const {instance} = this.props;

        return (
            <div className="line-design-component-preview">
                <div style={createStyle(instance)}/>
            </div>
        );
    }
}

function createStyle(instance) {
    const {color, hasPadding, lineType} = instance;

    return {
        height: 0,
        borderTopWidth: '1px',
        margin: hasPadding ? '0 10px' : 0,
        borderColor: color,
        borderStyle: lineType,
    };
}
