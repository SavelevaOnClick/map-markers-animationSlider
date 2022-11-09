import { Dimensions } from "react-native";

export const {width, height} = Dimensions.get('window');

export const ITEM_OFFSET_X = 70;
export const ITEM_WIDTH = width - 70;
export const MARGINS = 10 * 2;
export const DIFFERENCE_X = 70 - MARGINS;