import basicInfo from "./basicInfo";
import userPaths from "./users";

export default {
  ...basicInfo,
  paths: {
    ...userPaths,
  },
};
