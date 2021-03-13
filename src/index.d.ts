/**
 * Custom callback to render each enabled position within the SVG that must output a string with a valid SVG path
 * @callback RenderFunction
 * @param {number} resolution - Relation between `size` and `complexity` or the size of each cell to be draw
 * @param {number} indexX - Selected cell X coordinate to be draw
 * @param {number} indexY - Selected cell Y coordinate to be draw
 * @return {string} A valid SVG path
 * @example
 * ```
 * (resolution, indexX, indexY) => `M${(indexX * resolution) + (resolution / 2)},${indexY * resolution} l${resolution / 2} ${resolution} l-${resolution} 0z`
 * ```
 */
type RenderFunction = (resolution: number, indexX: number, indexY: number) => string;

/**
 * Returns a randomly generated string representation code of an avatar for a given `complexity`
 * @param {number} [complexity] - A positive integer that represents the number of rows and columns to be drawn
 * @param {string} [avatarDataSeparator] - A character to be used as data separator
 * @return {string} Output example: 0-6-6te25-9d9p0-xd5g
 */
export function generateRandomAvatarData(complexity?: number, avatarDataSeparator?: string): string;

/**
 * Returns a string with a valid SVG markup for a given `avatarData`
 * @param {string} avatarData - A valid string representation of an avatar data
 * @param {(string|RenderFunction)} [renderMethod] - A valid option between [square, circle] or a callback defined as RenderFuntion
 * @param {number} [size] - A positive integer to be used to compute the internal values
 * @param {number} [avatarDataSeparator] - A character to be used as data separator
 * @return {string}
 */
export function getAvatarFromData(avatarData: string, renderMethod?: string | RenderFunction, size?: number, avatarDataSeparator?: string): string;

/**
 * A simpler helper that returns a random SVG markup for a give `complexity`
 * @param {nember} [complexity] - A positive integer that represents the number of rows and columns to be drawn
 * @param {(string|RenderFunction)} [renderMethod] - A valid option between [square, circle] or a callback defined as RenderFuntion
 * @param {number} [size] - A positive integer to be used to compute the internal values
 * @return {string}
 */
export function getRandomAvatar(complexity?: number, renderMethod?: string | RenderFunction, size?: number): string;
