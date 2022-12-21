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
      document.documentElement.style.setProperty("--colorFont", "#fff");
      document.documentElement.style.setProperty("--colorFont2", "#111");
      document.documentElement.style.setProperty("--colorHoverBoton", "#d55");
      break;

    case "dark":
      document.documentElement.style.setProperty("--colorPrimal", "#383838");
      document.documentElement.style.setProperty(
        "--colorDarkPrimal",
        "#181818"
      );
      document.documentElement.style.setProperty("--colorSecunda", "#282828");
      document.documentElement.style.setProperty("--colorStandar", "#585858");
      document.documentElement.style.setProperty("--colorFont", "#aaa");
      document.documentElement.style.setProperty("--colorFont2", "#aba");
      document.documentElement.style.setProperty(
        "--colorHoverBoton",
        "#555"
      );
      break;

    default:
      break;
  } //switch end
};
