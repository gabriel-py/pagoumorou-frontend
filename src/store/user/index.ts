import { createSlice } from "@reduxjs/toolkit";
import { UserStateProps } from "./types";
import { checkLogin, createUser, getComponentsMetrics, getMetrics, getPlans, getProfile, login, startMembership } from "../services";
import { SESSION_KEY } from "@/services/api/fetch";
import { DAY } from "@/utils/time";
import { setItem } from "@/utils/storage";

export const initialState: UserStateProps = {
  isLoadingLogin: false,
  isLoading: false,
  isLoadingMetrics: false,
  isLoadingCheckLogin: false,
  isLoadingProfile: false
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    {/* post login api */}
    builder.addCase(login.pending, (state) => {
      state.isLoadingLogin = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoadingLogin = false;
      state.isLoggedIn = false;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoadingLogin = false;

      if(payload?.user){
        state.user = payload.user;
        state.isLoggedIn = true;
        setItem(SESSION_KEY, { session: payload.session }, DAY);
      } else {
        state.isLoggedIn = false;
      }
    });

    {/* check login api */}
    builder.addCase(checkLogin.pending, (state) => {
      state.isLoadingCheckLogin = true;
    });
    builder.addCase(checkLogin.rejected, (state) => {
      state.isLoadingCheckLogin = false;
      state.isLoggedIn = false;
    });
    builder.addCase(checkLogin.fulfilled, (state, { payload }) => {
      state.isLoadingCheckLogin = false;

      if(payload?.user){
        state.user = payload.user;
        state.isLoggedIn = true;
        setItem(SESSION_KEY, { session: payload.session }, DAY);
      } else {
        state.isLoggedIn = false;
      }
    });

    {/* createUser api */}
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.userCreated = payload?.user;
    });

    {/* startMembership api */}
    builder.addCase(startMembership.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(startMembership.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(startMembership.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    });

    {/* getPlans api */}
    builder.addCase(getPlans.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPlans.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getPlans.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.plans = payload;
    });

    {/* getMetrics api */}
    builder.addCase(getMetrics.pending, (state) => {
      state.isLoadingMetrics = true;
    });
    builder.addCase(getMetrics.rejected, (state) => {
      state.isLoadingMetrics = false;
    });
    builder.addCase(getMetrics.fulfilled, (state, { payload }) => {
      state.isLoadingMetrics = false;
      state.metrics = payload;
    });

    {/* getComponentsMetrics api */}
    builder.addCase(getComponentsMetrics.pending, (state) => {
      state.isLoadingMetrics = true;
    });
    builder.addCase(getComponentsMetrics.rejected, (state) => {
      state.isLoadingMetrics = false;
    });
    builder.addCase(getComponentsMetrics.fulfilled, (state, { payload }) => {
      state.isLoadingMetrics = false;
      state.componentsMetrics = payload;
    });

    {/* getProfile api */}
    builder.addCase(getProfile.pending, (state) => {
      state.isLoadingProfile = true;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoadingProfile = false;
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.isLoadingProfile = false;
      state.profile = payload;
    });
  },
});

export const UserActions = UserSlice.actions;

export const userReducer = UserSlice.reducer;
