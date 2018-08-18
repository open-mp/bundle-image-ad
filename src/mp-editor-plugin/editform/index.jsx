import React, {PureComponent} from 'react';
import {Radio, ColorPicker} from 'zent';

import ControlGroup from './ControlGroup';

const RadioGroup = Radio.Group;
const DEFAULT_COLOR = '#e5e5e5';
const prefix = 'mp';

export default class LineEditor extends PureComponent {
    render() {
        const {instance: value, showError, validation} = this.props;

        return (
            <div className={`${prefix}-design-component-line-editor`}>
                <ControlGroup
                    label="颜色:"
                    showError={showError}
                    error={validation.content}
                >
                    <ColorPicker
                        className={`${prefix}-design-component-line-editor_color-select`}
                        color={value.color}
                        onChange={this.onColorChange}
                    />
                    <span
                        className={`${prefix}-design-component-line-editor_color-reset`}
                        onClick={this.onColorReset}
                    >
                        重置
                    </span>
                </ControlGroup>
                <ControlGroup
                    label="边距:"
                    showError={showError}
                    error={validation.content}
                >
                    <RadioGroup value={value.hasPadding} onChange={this.onInputChange}>
                        <Radio name="hasPadding" value={false}>
                            无边距
                        </Radio>
                        <Radio name="hasPadding" value>
                            左右留边
                        </Radio>
                    </RadioGroup>
                </ControlGroup>
                <ControlGroup
                    label="样式:"
                    showError={showError}
                    error={validation.content}
                >
                    <RadioGroup value={value.lineType} onChange={this.onInputChange}>
                        <Radio name="lineType" value="solid">
                            实线
                        </Radio>
                        <Radio name="lineType" value="dashed">
                            虚线
                        </Radio>
                        <Radio name="lineType" value="dotted">
                            点线
                        </Radio>
                    </RadioGroup>
                </ControlGroup>
            </div>
        );
    }


    onColorChange = (value) => {
        const {design, instance} = this.props;
        design.modifyInstance(instance, {color: value});
    }

    onColorReset = () => {
        this.onColorChange(DEFAULT_COLOR);
    };

    onInputChange = evt => {
        const {target} = evt;
        let {name, type, value} = target;

        if (type === 'checkbox') {
            value = target.checked;
        }
        const {design, instance} = this.props;
        design.modifyInstance(instance, {[name]: value});
    };
}
