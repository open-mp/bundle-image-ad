
import React, { Component } from 'react';
import cx from 'classnames';
import {isEmpty} from 'lodash';
import './preview.pcss'

import { IMAGE_SIZE, IMAGE_AD_ENTRY_UUID_KEY } from '../constants';
const prefix = 'bundle-image-ad-preview';

export default class ImageAdPreview extends Component {
  render() {

    const { instance: value } = this.props;
    const { size, images } = value;

    if (isEmpty(images)) {
      return (
        <div
          className={cx(
            `${prefix}-design-component-image-ad-preview`,
            `${prefix}-design-component-image-ad-preview--no-data`
          )}
        >
          点击编辑图片广告
        </div>
      );
    }
    return (
      <div
        className={cx(`${prefix}-design-component-image-ad-preview`, {
          [`${prefix}-design-component-image-ad-preview--large`]:
            size === IMAGE_SIZE.LARGE,
          [`${prefix}-design-component-image-ad-preview--small`]:
            size === IMAGE_SIZE.SMALL,
        })}
      >
        {images.map(img => {
          const id = img[IMAGE_AD_ENTRY_UUID_KEY];
          // eslint-disable-next-line
          const url = img.linkUrl || 'javascript:void(0);';
          const title = img.linkTitle;
          return (
            <a
              key={id}
              className={`${prefix}-design-component-image-ad-preview__image-container`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
           
            <img className={`${prefix}-design-component-image-ad-preview__image-img`} src={img.imageUrl} alt={title} />
                
            {title && (
                <div className={`${prefix}-design-component-image-ad-preview__image-title`}>
                {title}
                </div>
            )}
            </a>
          );
        })}
      </div>
    );
  }
}
