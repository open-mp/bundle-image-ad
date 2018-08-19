import React, {PureComponent} from 'react';
import ControlGroup from './ControlGroup';

import {Radio,Icon} from 'zent';
import { Droppable } from 'react-beautiful-dnd';
import createObjectURL from 'zent/lib/utils/createObjectURL';
import {findIndex} from 'lodash';
import { ImageEntry, createEmptyImageEntry } from './ImageEntry';
import reorder from 'zent/lib/utils/reorder'
import './editor.pcss'
const RadioGroup = Radio.Group;

import {
  IMAGE_SIZE,
  IMAGE_AD_LIMIT,
  IMAGE_AD_ENTRY_UUID_KEY,
  IMAGE_AD_DND_TYPE,
} from '../constants';

let prefix = 'bundle-image-ad';
export default class ImageAdEditor extends PureComponent {
  constructor(props) {
    super(props);


    this.state = {
      ...this.state,
      localImage: '',
    };
  }

  render() {
    const {showError, validation, instance } = this.props;
    const { localImage } = this.state;
    const imageErrors = validation.images;
    const allowAddImage = this.isAddImageEntryAllowed();
    return (
      <div className={`${prefix}-design-component-image-ad-editor`}>
        <ControlGroup
          label="显示大小:"
          showError={showError}
          error={validation.size}
        >
          <RadioGroup value={instance.size} onChange={this.onInputChange}>
            <Radio name="size" value={IMAGE_SIZE.LARGE}>
              大图
            </Radio>
            <Radio name="size" value={IMAGE_SIZE.SMALL}>
              小图
            </Radio>
          </RadioGroup>
        </ControlGroup>
        <Droppable
          droppableId={`${prefix}-design-component-image-ad-editor__entry-list`}
          type={IMAGE_AD_DND_TYPE}
          direction="vertical"
        >
          {(provided, snapshot) => {
            return (
              <ul
                ref={provided.innerRef}
                className={`${prefix}-design-component-image-ad-editor__entry-list`}
              >
                {instance.images.map((img, index) => {
                  const imageId = img[IMAGE_AD_ENTRY_UUID_KEY];
                  return (
                    <li
                      key={imageId}
                      className={`${prefix}-design-component-image-ad-editor__entry`}
                    >
                      <ImageEntry
                        index={index}
                        imageId={imageId}
                        imageUrl={img.imageUrl}
                        linkTitle={img.linkTitle}
                        linkUrl={img.linkUrl}
                        modifyImageEntry={this.modifyImageEntry(imageId)}
                        error={
                          showError && imageErrors ? imageErrors[imageId] : ''
                        }
                      />
                      {!snapshot.isDraggingOver && (
                        <Icon
                          type="close-circle"
                          className={`${prefix}-design-component-image-ad-editor__entry-close-btn`}
                          onClick={this.removeImageEntry(imageId)}
                        />
                      )}
                      {!snapshot.isDraggingOver &&
                        allowAddImage && (
                          <Icon
                            type="plus"
                            className={`${prefix}-design-component-image-ad-editor__entry-prepend-btn`}
                            onClick={this.prependImageEntry(imageId)}
                          />
                        )}
                      {!snapshot.isDraggingOver &&
                        allowAddImage && (
                          <Icon
                            type="plus"
                            className={`${prefix}-design-component-image-ad-editor__entry-append-btn`}
                            onClick={this.appendImageEntry(imageId)}
                          />
                        )}
                    </li>
                  );
                })}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
        {allowAddImage && (
          <a
            className={`${prefix}-design-component-image-ad-editor__add-entry-btn`}
          >
            <b>+</b>添加一个广告
            <input
              type="file"
              accept="image/gif, image/jpeg, image/png"
              title=""
              value={localImage}
              onChange={this.onAddImageEntry}
            />
          </a>
        )}
        <div className={`${prefix}-design-component-image-ad-editor__hint`}>
          最多添加 {IMAGE_AD_LIMIT} 个广告，拖动选中的图片广告可对其排序
        </div>
      </div>
    );
  }

  onInputChange = evt => {
    const {target} = evt;
    let {name, type, value} = target;

    if (type === 'checkbox') {
        value = target.checked;
    }
    const {design, instance} = this.props;
    design.modifyInstance(instance, {[name]: value});
  }

  onAddImageEntry = evt => {
    const {
      target: { files },
    } = evt;
    const imageUrl = createObjectURL(files[0]);
    const { design, instance } = this.props;
    design.modifyInstance(instance, {
        images: instance.images.concat(createEmptyImageEntry({ imageUrl })),
    });
  };

  removeImageEntry = id => () => {
    const {  design, instance } = this.props;
    design.modifyInstance(instance, {
        images: instance.images.filter(img => img[IMAGE_AD_ENTRY_UUID_KEY] !== id),
    });
  };

  prependImageEntry = id => () => {
    const {
        design,
        instance,
        instance: { images },
    } = this.props;
    const index = findIndex(images, img => img[IMAGE_AD_ENTRY_UUID_KEY] === id);
    if (index !== -1) {
      const newImages = images.slice();
      newImages.splice(index, 0, createEmptyImageEntry());

      design.modifyInstance(instance,{
        images: newImages,
      });
    }
  };

  appendImageEntry = id => () => {
    const {
        design,
        instance,
        instance: { images },
    } = this.props;
    const index = findIndex(images, img => img[IMAGE_AD_ENTRY_UUID_KEY] === id);
    if (index !== -1) {
      const newImages = images.slice();
      newImages.splice(index + 1, 0, createEmptyImageEntry());

      design.modifyInstance(instance,{
        images: newImages,
      });
    }
  };

  modifyImageEntry = id => delta => {
    const {
        design,
        instance,
      instance: { images },
    } = this.props;

    design.modifyInstance(instance,{
      images: images.map(img => {
        if (img[IMAGE_AD_ENTRY_UUID_KEY] !== id) {
          return img;
        }

        return {
          ...img,
          ...delta,
        };
      }),
    });
  };

  isAddImageEntryAllowed() {
    const {
      instance: { images },
    } = this.props;

    return images.length < IMAGE_AD_LIMIT;
  }

  onDragEnd(result) {
    const {type, source, destination } = result;
    if (type !== IMAGE_AD_DND_TYPE) {// 不可能出现的错误
        return
    }
    // dropped outside
    if (!destination) {
      return;
    }
    const { instance, design } = this.props;
    design.modifyInstance(instance,{
        images: reorder(instance.images, source.index, destination.index),
    });
  }
}
