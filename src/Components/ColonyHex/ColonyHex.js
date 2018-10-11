import React, { Component } from 'react';

export class ColonyHex extends Component {
  constructor(props, context) {
    super(props, context);

    this.shouldDraw = true;
    this.xOffset = 0;
  }

  componentDidMount() {
    this.handleDrawHex();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.shouldDraw = true;
    }
  }

  componentDidUpdate() {
    this.handleDrawHex();
  }

  handleDrawHex = () => {
    if (this.shouldDraw) {
      this.shouldDraw = false;
      const ctx = this.canvas.getContext('2d');
      if (this.props.src) {
        this.drawHexImageOnLoad(ctx);
        return;
      }
      this.drawHex(ctx);
      if (this.props.gradient) {
        let gradient = ctx.createLinearGradient(0,0,this.props.width,0);
        gradient.addColorStop(0, this.props.color1);
        gradient.addColorStop(1, this.props.color2);
        ctx.fillStyle = gradient;
        ctx.shadowColor = '#999';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fill();
        return
      }
      if (this.props.backgroundColor) {
        ctx.fillStyle = this.props.backgroundColor;
        ctx.fill();
        return;
      }
      ctx.stroke();
    }
  }

  drawHexImageOnLoad = (ctx) => {
    this.hexImg = new Image();
    this.hexImg.onload = () => {
      this.drawHexImage(ctx);
    }
    this.hexImg.src = this.props.src;
  }

  drawHexImage = (ctx) => {
    this.drawHex(ctx);
    ctx.clip();
    ctx.drawImage(this.hexImg, this.xOffset, 0, this.props.width, (this.props.width * 2) / Math.sqrt(3));
  }

  drawHex = (ctx) => {
    const canvasWidth = this.props.width;
    const canvasHeight = (this.props.width * 2) / Math.sqrt(3);
    ctx.translate(this.xOffset, 0);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    let shapeXOffset;
    const cornerRadius = 8;
    const theta = 2 * Math.PI / 6;
    const offset = cornerRadius * Math.tan(theta / 2);
    const length = canvasHeight;
    const angle = Math.PI / 2;

    const center = {
      x: length / 2,
      y: length / 2,
    };

    const radius =  length / 2;


    let corner = {
      x: center.x + (radius - cornerRadius) * Math.cos(angle),
      y: center.y + (radius - cornerRadius) * Math.sin(angle),
    };

    let startPoint = {
      x: corner.x + cornerRadius * Math.cos(angle + theta),
      y: corner.y + cornerRadius * Math.sin(angle + theta),
    }

    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);

    let drawAngle = angle;

    for (let i = 1; i <= 6; i++) {
      drawAngle += theta;

      let drawnCorner = {
        x: center.x + (radius - cornerRadius) * Math.cos(drawAngle),
        y: center.y + (radius - cornerRadius) * Math.sin(drawAngle),
      }

      let tip = {
        x: center.x + radius * Math.cos(drawAngle),
        y: center.y + radius * Math.sin(drawAngle),
      }

      let start = {
        x: drawnCorner.x + cornerRadius * Math.cos(drawAngle - theta),
        y: drawnCorner.y + cornerRadius * Math.sin(drawAngle - theta),
      }

      let end = {
        x: drawnCorner.x + cornerRadius * Math.cos(drawAngle + theta),
        y: drawnCorner.y + cornerRadius * Math.sin(drawAngle + theta),
      }

      if (i === 1) {
        shapeXOffset = Math.round(end.x);
        ctx.translate(-shapeXOffset, 0);
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
      }
      ctx.lineTo(start.x, start.y);
      ctx.quadraticCurveTo(tip.x, tip.y, end.x, end.y);
    }
    this.xOffset = shapeXOffset;
  }

  render() {
    const { height, width, style, gradient } = this.props;
    let canvasHeight = width * 2 / Math.sqrt(3);
    let canvasWidth = width;
    if (gradient) {
      canvasHeight += 10;
      canvasWidth += 15;
    }
    const canvasStyle = style || { position: 'relative' }
    return (
      <canvas
        height={canvasHeight}
        width={canvasWidth}
        style={canvasStyle}
        ref={ref => this.canvas = ref }
      ></canvas>
    );
  }
}
