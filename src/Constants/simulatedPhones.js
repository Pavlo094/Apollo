import iPhoneXTop from 'AppImgs/iphoneX-top.png';
import iPhoneXBottom from 'AppImgs/iphoneX-bottom.png';
import iPhoneXMiddle from 'AppImgs/iphoneX-middle.png';

export const SIMULATED_PHONES = {
  'iPhoneX': {
    topImg: iPhoneXTop,
    middleImg: iPhoneXMiddle,
    bottomImg: iPhoneXBottom,
    screenRatio: 2.1666,
    imgMetaData: {
      screenFromLeft: 289,
      // screenFromTop is being calculated from bottom of center bar on the iphone asset
      // screenFromTop: 101,
      screenFromTop: 196,
      screenFromRight: 246,
      // screenFromBottom is being calculated at the point where bottom curve ends
      // screenFromBottom: 201,
      screenFromBottom: 338,
      naturalScreenWidth: 1174,
    }
  }
}
