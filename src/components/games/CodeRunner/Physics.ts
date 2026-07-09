// All units are percentages of the game stage (0-100), so the game
// scales responsively without any manual pixel/DPI recalculation.

export const GRAVITY = 260; // %/s^2
export const JUMP_VELOCITY = -98; // %/s
export const MOVE_SPEED = 46; // %/s
export const MAX_FALL_SPEED = 170; // %/s
export const PLAYER_WIDTH = 5.5;
export const PLAYER_HEIGHT = 11;
export const STAGE_BOTTOM = 100;

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function intersects(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

export function horizontallyOverlaps(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
