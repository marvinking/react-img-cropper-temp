import * as React from 'react';
import Cropper from 'cropperjs';

// 上面的import主要是用来引入类型，这个require用来实际引入组件
// 防止tsc后编译出来的代码去使用cropperjs库的default
const CropperJs = require('cropperjs');

export interface ICropperProps extends Cropper.Options {
  className?: string;
  style?: React.CSSProperties;
  src?: string;
  alt?: string;
  crossOrigin?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>['crossOrigin'];
  getCropperInst?: (inst: Cropper | null) => void;
}

export class ReactCropper extends React.Component<ICropperProps> {
  static defaultProps = {
    alt: 'image'
  };

  private cropper: Cropper | null = null;
  private imgRef: HTMLImageElement;

  componentDidMount(): void {
    const { className, style, src, alt, getCropperInst, crossOrigin, ...restProps } = this.props;

    this.cropper = new CropperJs(this.imgRef!, restProps);

    getCropperInst && getCropperInst(this.cropper);
  }

  componentWillUnmount(): void {
    this.cropper!.destroy();
    this.cropper = null;
  }

  getImgRef = ref => this.imgRef = ref;

  render() {
    const { className, style, src, alt, crossOrigin } = this.props;

    return (
      <div className={className} style={style}>
        <img ref={this.getImgRef} crossOrigin={crossOrigin} src={src} alt={alt} />
      </div>
    );
  }
}
