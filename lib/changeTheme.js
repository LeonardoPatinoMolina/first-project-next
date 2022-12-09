export const changeTheme = (them) => {
  switch (them) {
    case "light":
      document.documentElement.style.setProperty("--colorPrimal", "#900");
      document.documentElement.style.setProperty("--colorSecunda", "#700");
      document.documentElement.style.setProperty(
        "--colorDarkPrimal",
        "#350101"
      );
      document.documentElement.style.setProperty("--colorStandar", "#ffbebe");
      document.documentElement.style.setProperty("--colorBase", "#fff");
      document.documentElement.style.setProperty("--colorBase2", "#f1f2f3");
      document.documentElement.style.setProperty("--colorBase3", "#aaa");
      document.documentElement.style.setProperty("--colorBase4", "#ddd");
      document.documentElement.style.setProperty("--colorFont", "#fff");
      document.documentElement.style.setProperty("--colorFont2", "#111");
      document.documentElement.style.setProperty("--colorHoverBoton", "#d55");
      break;

    case "dark":
      document.documentElement.style.setProperty("--colorPrimal", "#292424");
      document.documentElement.style.setProperty(
        "--colorDarkPrimal",
        "#534b4b"
      );
      document.documentElement.style.setProperty("--colorSecunda", "#363232");
      document.documentElement.style.setProperty("--colorStandar", "#020000");
      document.documentElement.style.setProperty("--colorBase", "#242424");
      document.documentElement.style.setProperty("--colorBase2", "#171718");
      document.documentElement.style.setProperty("--colorBase3", "#352e2e");
      document.documentElement.style.setProperty("--colorBase4", "#201b1b");
      document.documentElement.style.setProperty("--colorFont", "#aaa");
      document.documentElement.style.setProperty("--colorFont2", "#aba");
      document.documentElement.style.setProperty(
        "--colorHoverBoton",
        "#aaa2a2"
      );
      break;

    default:
      break;
  } //switch end
};
