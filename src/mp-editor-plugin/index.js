import EditorForm from './editform/index'
import Preview from './preview/index'
import { IMAGE_SIZE, IMAGE_AD_ENTRY_UUID_KEY } from './constants';

export default {
    // 所属bundle
    bundleId: {
        groupId: '',
        artifactId: '',
        version: '',
        classifier: '',
    },
    name: '',
    description: '',
    preview: Preview, // 预览组件
    previewType: 'react',
    editForm: EditorForm, // 数据编辑表单
    editFormType: 'react',
    editable: true, // 组件数据是否可编辑
    canDelete: true, // 组件数据是否可删除
    dragable: true, // 是否可以拖拽
    highlightWhenSelect: true, // 选择后是否高亮
    // 获取初始值
    getInitialValue() {
        return {
            size: IMAGE_SIZE.LARGE,
            images: [],
          };;
    },
    // 验证示例数据
    validate(instance) {
        // return new Promise(resolve => {
        //     const errors = {};
      
        //     errors.images = value.images.reduce((imageErrors, img) => {
        //       if (!img.imageUrl) {
        //         imageErrors[img[IMAGE_AD_ENTRY_UUID_KEY]] = '请选择广告图片';
        //       }
        //       return imageErrors;
        //     }, {});
      
        //     // 如果没有错误就删除这个 key
        //     if (isEmpty(errors.images)) {
        //       delete errors.images;
        //     }
      
        //     resolve(errors);
        //   });
        // }
    }
}
