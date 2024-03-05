figma.showUI(__html__);
figma.ui.resize(400, 600);

function clone(val) {
  return JSON.parse(JSON.stringify(val));
}

figma.ui.onmessage = (message) => {
  let i = 0;

  message.colors.map((color: RGB) => {
    const rect: RectangleNode = figma.createRectangle();
    rect.resize(100, 100);
    const fills = clone(rect.fills);
    if (fills[0].type === "SOLID") {
      fills[0] = figma.util.solidPaint(color, fills[0]);
      rect.fills = fills;
    }
    rect.x = rect.x + i;

    i = i + 100;

    figma.viewport.scrollAndZoomIntoView([rect]);
  });

  figma.closePlugin();
};
