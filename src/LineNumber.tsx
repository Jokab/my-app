import React, {Component, FunctionComponent} from 'react';

type LineNumberProps = {
    line: string;
}
type LineNumberState = {
    canvasRef: any;
}
export class LineNumber extends Component<LineNumberProps, LineNumberState> {


    canvasRef: any;
    constructor(props: LineNumberProps) {
        super(props);
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    createHiPPICanvas(cv: any, w: number, h: number) {
        let ratio = window.devicePixelRatio;
        cv.width = w * ratio;
        cv.height = h * ratio;
        cv.style.width = w + "px";
        cv.style.height = h + "px";
        cv.getContext("2d").scale(ratio, ratio);
        return cv;
    }

    componentDidMount() {
        if (this.canvasRef.current) {
            var canvas = this.canvasRef.current;
            canvas = this.createHiPPICanvas(canvas, 28, 28);
            
            const context = canvas.getContext("2d");
            if (context !== null) {
                this.drawNumber(context, this.props.line);
            }
        }
    }

    drawNumber(context: CanvasRenderingContext2D, line: string) {
        context.lineWidth = 4;
        context.strokeStyle = "#000000"
        var textColor = "";
        var backgroundColor = "";
        switch (line) {
            case "1":
                backgroundColor = "#FFFFFF";
                textColor = "black";
                break;
            case "7":
                backgroundColor = "#964B00";
                textColor = "white";
                break;
            case "8":
                backgroundColor = "#800080";
                textColor = "white";
                break;
        }
        context.fillStyle = backgroundColor;
        
        roundRect(context, 0, 0, 28, 28, 5, true, false);

        context.textBaseline = 'middle';
        context.textAlign = "center";
        context.font = '16px sans-serif';
        context.fillStyle = textColor;

        context.fillText(line, 14, 15, 16);
    }

    render() {
        return (
            <canvas 
                ref={this.canvasRef}
                width="28px"
                height="28px"
                style={{
                    margin: "auto",
                    display: "block"
                }}
            ></canvas>
        );
    }
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
 function roundRect(ctx: CanvasRenderingContext2D, x: any, y: any, width: any, height: any, radius: any, fill: any, stroke: any) {
    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius: any = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  
  }
  