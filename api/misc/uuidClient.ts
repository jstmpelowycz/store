import {v4} from "uuid";

const generateUpc = () => v4().slice(0, 12);

export const uuidClient = {
  generateUpc,
};
