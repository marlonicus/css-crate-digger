export const Bodies = {
  Table: {
    width: 70,
    depth: 50,
    color: "DarkKhaki"
  },

  Crate: {
    color: "darkolivegreen",
    width: 10,
    height: 5,
    depth: 7.5,
    thickness: 0.5
  },

  Label: {
    padding: 0.5,
    fontSize: 1
  },

  Record: {
    width: 9,
    height: 9
  },

  unit: "vw"
};

export const unit = val => `${val}${Bodies.unit}`;

export const getWindow = () => (typeof window === "undefined" ? {} : window); // eslint-disable-line no-undef
