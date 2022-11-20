import { Point } from "react-native-maps";

export const getModalPosition = 
    (
      markerPosition: Point,
      widthScreen: number,
      heightScreen: number,
      sliderHeight: number,
      sliderWidth: number,
      markerSize: number,
    ) => {
      const modalPosition: {x: number; y: number} = {x: 0, y: 0};
      // determination of half sizes
      const height_2 = heightScreen / 2;
      const width_2 = widthScreen / 2;
      const sliderHeight_2 = sliderHeight / 2;
      const markerSize_2 = markerSize / 2;

      // position of the modal relative to the screen

      if (markerPosition.x > width_2) {
        // right part of the screen
        if (markerPosition.x - sliderWidth - markerSize_2 > 0) {
          // next to the marker
          modalPosition.x = markerPosition.x - sliderWidth - markerSize_2;
          if (markerPosition.y < height_2) {
            // top part of the screen (for position on Y)
            modalPosition.y =
              markerPosition.y - sliderHeight_2 < 0
                ? markerPosition.y - markerSize
                : markerPosition.y - sliderHeight_2;
          } else {
            //bottom part of the screen (for position on Y)
            modalPosition.y =
              markerPosition.y + sliderHeight_2 > heightScreen
                ? markerPosition.y - sliderHeight
                : markerPosition.y - sliderHeight_2;
          }
        } else {
          //not next to the marker
          modalPosition.x = widthScreen - sliderWidth - markerSize_2;
          if (markerPosition.y < height_2) {
            // to bottom for Y
            modalPosition.y = markerPosition.y;
          } else {
            // to top for Y
            modalPosition.y = markerPosition.y - sliderHeight - markerSize;
          }
        }
      } else {
        //left part of the screen
        if (markerPosition.x + sliderWidth + markerSize_2 < widthScreen) {
          // next to the marker
          modalPosition.x = markerPosition.x + markerSize_2;
          if (markerPosition.y < height_2) {
            // top part of the screen (for position on Y)
            modalPosition.y =
              markerPosition.y - sliderHeight_2 < 0
                ? markerPosition.y - markerSize
                : markerPosition.y - sliderHeight_2;
          } else {
            //bottom part of the screen (for position on Y)
            modalPosition.y =
              markerPosition.y + sliderHeight_2 > heightScreen
                ? markerPosition.y - sliderHeight
                : markerPosition.y - sliderHeight_2;
          }
        } else {
          //not next to the marker
          modalPosition.x = markerSize_2;
          if (markerPosition.y < height_2) {
            // to bottom for Y
            modalPosition.y = markerPosition.y;
          } else {
            // to top for Y
            modalPosition.y = markerPosition.y - sliderHeight - markerSize;
          }
        }
      }
      return modalPosition;
    }