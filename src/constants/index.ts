import { Dimensions } from "react-native";

export const {width, height} = Dimensions.get('window');

export const ITEM_OFFSET_X = 90;
export const ITEM_WIDTH = width - 90;
export const MARGINS = 10 * 2;
export const DIFFERENCE_X = 90 - MARGINS;
export const ITEM_HEIGHT = 100;
export const SLIDER_VERTICAL_HEIGHT = ITEM_HEIGHT * 2 + 50;
export const MARKER_SIZE = 26;