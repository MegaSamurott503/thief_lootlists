//import { useTheme } from '@react-navigation/native';
import {
  Image, View
} from 'react-native';
import { memo, useEffect, useState } from 'react';

import { stylesImg } from '@/constants/stylesImg';

/* **************** */
/*   IMAGE SWITCH   */
/* **************** */
// Custom view component showing a slideshow of images.
// Wrap in a memo to avoid unnecessary re-renders.
export const ImageSwitch = memo(function ImageSwitch(props) {
  // ImageIndex: tracks the current index in the image array.
  const [getImageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    // Create an interval to iterate through the image array.
    const imageID = setInterval(() => {
      if (getImageIndex < props.img.length - 1) {
        setImageIndex(getImageIndex + 1);
      } else if (getImageIndex === props.img.length - 1) {
        setImageIndex(0);
      }
    // Delay how often the interval updates.
    // 2000 milliseconds = every 2 seconds.
    }, 2000);

    // Clear the interval when the component unmounts.
    return () => clearInterval(imageID);
  });

  return (
    <View>
      <Image
        source={props.img[getImageIndex]}
        style={stylesImg.imgStyle}
      />
    </View>
  );
});
