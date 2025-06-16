import { checkLogin } from "./check-login";
import { getComponents } from "./cms/get-components";
import { createUser } from "./create-user";
import { editProfile } from "./edit-profile";
import { getPlans } from "./get-plans";
import { getProfile } from "./get-profile";
import { login } from "./login";
import { getMetrics } from "./metrics";
import { startMembership } from "./start-membership";

export const Api = {
  checkLogin,
  createUser,
  startMembership,
  getPlans,
  getMetrics,
  getComponents,
  login,
  getProfile,
  editProfile
};
