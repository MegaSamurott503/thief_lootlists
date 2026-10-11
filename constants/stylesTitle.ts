export const stylesTitle = {
  bigTitle: (width) => ({
    fontFamily: 'Thief',
    textAlign: 'center',
    fontSize: (width > 849) ? 40 :
      (width > 449) ? width*0.047 : width*0.07, //0.058
    //fontSize: 30 / PixelRatio.getFontScale(),
  }),
}
