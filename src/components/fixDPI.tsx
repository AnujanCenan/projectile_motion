export function fix_dpi(canvas: HTMLCanvasElement) {
    let dpi = window.devicePixelRatio;
    if (canvas) {
      let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
      let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
      canvas.setAttribute('height', (style_height * dpi).toString());
      canvas.setAttribute('width', (style_width * dpi).toString());
    }
  }