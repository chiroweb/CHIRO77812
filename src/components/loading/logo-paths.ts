export const chiroPaths = {
  // Placeholder paths - approximate shapes
  // TODO: Replace these with the actual SVG paths exported from Figma (Method A) or generated via opentype.js (Method C)
  C: "M80,150 A50,50 0 1,1 80,50", 
  H: "M130,50 V150 M200,50 V150 M130,100 H200",
  I: "M250,50 V150",
  R: "M300,150 V50 H350 A25,25 0 0,1 350,100 H300 M350,100 L400,150",
  O: "M450,100 A50,50 0 1,0 450,100.01", // Almost full circle
};

export const webdesignPaths = {
  // Placeholder paths for "WEB DESIGN"
  // TODO: Replace with actual paths
  W: "M50,250 L70,300 L90,250 L110,300 L130,250",
  E: "M150,250 V300 H190 M150,275 H180 M150,250 H190",
  B: "M210,250 V300 H240 A12.5,12.5 0 0,0 240,275 H210 M210,275 H245 A12.5,12.5 0 0,0 245,300 H210",
  // Spacing
  D: "M300,250 V300 H330 A25,25 0 0,0 330,250 Z",
  E2: "M370,250 V300 H410 M370,275 H400 M370,250 H410",
  S: "M430,300 H460 V275 H430 V250 H460",
  I: "M480,250 V300",
  G: "M530,260 A20,20 0 1,0 530,300 H550 V280 H530",
  N: "M570,300 V250 L610,300 V250",
};

// If you prefer using a single path for the entire word:
export const chiroFullPath = Object.values(chiroPaths).join(" ");
export const webdesignFullPath = Object.values(webdesignPaths).join(" ");
