export const Bodies = {
  Wall: {
    color2: "#333",
    color1: "#444"
  },

  Table: {
    width: 70,
    depth: 50,
    thickness: 2,
    color2: "#3E6358",
    color1: "#466f63"
  },

  Crate: {
    color1: "#333",
    color2: "#555",
    width: 10,
    height: 6,
    depth: 10.5,
    thickness: 0.5
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
