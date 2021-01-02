import { scaleFont } from './mixins';
import { scaleSize } from './mixins';

// FONT FAMILY
export const FONT_FAMILY_ROBOTO = 'roboto-400';
export const FONT_FAMILY_POPPINS = 'poppins-400';
export const FONT_FAMILY_POPPINS_MEDIUM = 'poppins-600';
export const FONT_FAMILY_SANS = 'open-sans';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_TITLE_LOGIN = scaleFont(24);
export const FONT_SIZE_TITLE_SCHOOL = scaleFont(20);

export const FONT_SIZE_INPUT = scaleFont(17);
export const FONT_SIZE_LABEL = scaleFont(17);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_9 = scaleFont(9);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_POPPINS,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_POPPINS_MEDIUM,
  fontWeight: FONT_WEIGHT_BOLD,
};
