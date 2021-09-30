import {
  Images2,
  Images3,
  Images4,
  Images5,
  Images6,
  Images7,
  Images8,
} from "../assests/images";
//To set corresponding background with weather
export const setBackGround = (x) => {
  switch (true) {
    case x < 300:
      return Images2;
    case x < 400:
      return Images3;
    case x < 600:
      return Images4;
    case x < 700:
      return Images5;
    case x < 800:
      return Images6;
    case x === 800:
      return Images7;
    case x > 800:
      return Images8;
    default:
      return 0;
  }
};
