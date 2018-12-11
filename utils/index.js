import queryString from "query-string";
import { propOr, pathOr, pipe, addIndex, map, curry } from "ramda";

export const Bodies = {
  Wall: {
    color1: "#030303",
    color2: "#050505"
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
    width: 12,
    height: 6,
    depth: 10.5,
    thickness: 0.5
  },

  Label: {
    padding: 0.5,
    fontSize: 1
  },

  Record: {
    width: 10.7,
    height: 10.7
  },

  Disc: {
    diameter: 8.5
  },

  unit: "vw"
};

export const unit = val => `${val}${Bodies.unit}`;

export const getWindow = () => (typeof window === "undefined" ? {} : window); // eslint-disable-line no-undef

export const takeRandX = curry((count, arr) => {
  const arr2 = [...arr];
  const chosen = [];

  for (let i = 0; i < count; i += 1) {
    chosen.push(arr2.splice(Math.floor(Math.random() * arr2.length), 1));
  }

  return chosen;
});

export const mapIndexed = addIndex(map);

const getLocationHash = pathOr("", ["location", "hash"]);
const getAccessToken = propOr(false, "access_token");

export const checkUserIsLoggedIn = pipe(
  getLocationHash,
  queryString.parse,
  getAccessToken
);
