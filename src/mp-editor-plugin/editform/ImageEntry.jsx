import React, { Component } from 'react';
import {Input} from 'zent';
import uuid from 'zent/lib/utils/uuid';
import { Draggable } from 'react-beautiful-dnd';
import createObjectURL from 'zent/lib/utils/createObjectURL';
import cx from 'classnames';

import { IMAGE_AD_ENTRY_UUID_KEY, IMAGE_AD_DND_TYPE } from '../constants';

const prefix = "bundle-image-ad";
export class ImageEntry extends Component {
  state = {
    localImage: '',
  };

  render() {
    const { index, imageId, imageUrl, linkTitle, linkUrl, error } = this.props;
    const { localImage } = this.state;
    return (
      <Draggable draggableId={imageId} type={IMAGE_AD_DND_TYPE} index={index}>
        {provided => (
          <div>
            <div
              className={`${prefix}-design-component-image-ad-editor__image-entry`}
              ref={provided.innerRef}
              style={provided.draggableStyle}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <div
                className={`${prefix}-design-component-image-ad-editor__image-entry-image-container`}
              >
                <img src={imageUrl} alt={linkTitle} />
                <div
                  className={cx(
                    `${prefix}-design-component-image-ad-editor__image-entry-image-upload`,
                    {
                      [`${prefix}-design-component-image-ad-editor__image-entry-image-upload--has-image`]: imageUrl,
                      [`${prefix}-design-component-image-ad-editor__image-entry-image-upload--no-image`]: !imageUrl,
                    }
                  )}
                >
                  {imageUrl ? (
                    <span>重新上传</span>
                  ) : (
                    <a>
                      <b>+</b>添加图片
                    </a>
                  )}
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    title=""
                    value={localImage}
                    onChange={this.onImageChange}
                  />
                </div>
              </div>
              <div
                className={`${prefix}-design-component-image-ad-editor__image-entry-controls`}
              >
                <div
                  className={`${prefix}-design-component-image-ad-editor__image-entry-image-control`}
                >
                  <label>标题:</label>
                  <Input value={linkTitle} onChange={this.onTitleChange} />
                </div>
                <div
                  className={`${prefix}-design-component-image-ad-editor__image-entry-image-control`}
                >
                  <label>链接:</label>
                  <Input value={linkUrl} onChange={this.onUrlChange} />
                </div>
              </div>
              {error && (
                <div
                  className={`${prefix}-design-component-image-ad-editor__image-entry-error`}
                >
                  {error}
                </div>
              )}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }

  onTitleChange = evt => {
    const {
      target: { value },
    } = evt;
    this.props.modifyImageEntry({ linkTitle: value });
  };

  onUrlChange = evt => {
    const {
      target: { value },
    } = evt;
    this.props.modifyImageEntry({ linkUrl: value });
  };

  onImageChange = evt => {
    const {
      target: { files },
    } = evt;
    const imageUrl = createObjectURL(files[0]);
    this.props.modifyImageEntry({ imageUrl });
  };
}

export function createEmptyImageEntry(override) {
  return {
    imageUrl: '',
    linkTitle: '',
    linkUrl: '',
    [IMAGE_AD_ENTRY_UUID_KEY]: uuid(),
    ...override,
  };
}
