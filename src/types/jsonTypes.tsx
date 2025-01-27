interface CannonInfo {
  name: string;
  pixel_width: number;
  pixel_height: number;
  pivot_x: number;
  pivot_y: number;
}

interface HolsterInfo {
  pixel_width: number;
  pixel_height: number;
  pivot_x: number;
  pivot_y: number;  
}

interface VelocitySliderInfo {
  pixel_width: number;
  pixel_height: number;
  slider_pixel_width: number;
  slider_pixel_height: number;  
}

interface HeightBarInfo {
  pixel_width: number,
  pixel_height: number,
  y_offset_scale_start: number,
  x_coord_arrow_tip_touch: number, 
  arrow_pixel_width: number,
  arrow_pixel_height: number,
  functional_pixel_height: number
}

interface TargetInfo {
  name: string;
  pixel_width: 505,
  pixel_height: 701,
  target_x: 152,
  target_y: 356
}

interface ForegroundInfo {
  name: string,
  width: number,
  height: number
}