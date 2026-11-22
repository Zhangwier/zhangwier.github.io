/**
 * Preserve the original fluid solver rather than approximate it with a
 * procedural full-screen shader. Original code and attribution live in
 * ./original-fluid.js (Pavel Dobryakov, MIT).
 */
import { mountAuthenticFluid } from './original-fluid';

export function mountFluid(
  canvas: HTMLCanvasElement,
  hero: HTMLElement,
  touchEnabled: () => boolean,
): (() => void) | null {
  return mountAuthenticFluid(canvas, hero, touchEnabled);
}
