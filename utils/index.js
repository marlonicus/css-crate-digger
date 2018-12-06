export const Bodies = {
  Wall: {
    color1: "#d599fc",
    color2: "#c066fb"
  },

  Table: {
    width: 70,
    depth: 50,
    thickness: 2,
    color: "#ffac2d",
    color2: "#ffb647"
  },

  Crate: {
    color1: "#00c778",
    color2: "#00ae69",
    width: 10,
    height: 6,
    depth: 10.5,
    thickness: 0.6
  },

  Label: {
    padding: 0.5,
    fontSize: 1
  },

  Record: {
    width: 8.7,
    height: 8.7
  },

  unit: "vw"
};

export const unit = val => `${val}${Bodies.unit}`;

export const getWindow = () => (typeof window === "undefined" ? {} : window); // eslint-disable-line no-undef
