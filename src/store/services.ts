import { NewUserFormData } from "@/pages/Register";
import { Api } from "@/services/api";
import { IGetComponentsMetricsInterface } from "@/services/api/cms/get-components";
import { UserProfileUpdatePayload } from "@/services/api/edit-profile/types";
import { LoginPayload } from "@/services/api/login/types";
import { IGetMetricsInterface } from "@/services/api/metrics";
import { StartMembershipPayload } from "@/services/api/start-membership/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkLogin = createAsyncThunk(
  "user/checkLogin",
  async () => {
    try {
        const response = await Api.checkLogin()
        return response;
      } catch (error) {
        throw new Error("Erro ao checar login.");
      }
    }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload: NewUserFormData, { rejectWithValue }) => {
    try {
        const response = await Api.createUser(payload)
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const login = createAsyncThunk(
  "user/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await Api.login(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const startMembership = createAsyncThunk(
  "user/startMembership",
  async (payload: StartMembershipPayload, { rejectWithValue }) => {
    try {
        const response = await Api.startMembership(payload)
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const getPlans = createAsyncThunk(
  "user/getPlans",
  async (_, { rejectWithValue }) => {
    try {
        const response = await Api.getPlans();
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const getMetrics = createAsyncThunk(
  "user/getMetrics",
  async ({ type, product }: IGetMetricsInterface, { rejectWithValue }) => {
    try {
      const response = await Api.getMetrics({ type, product });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getComponentsMetrics = createAsyncThunk(
  "user/getComponentsMetrics",
  async ({ type, body }: IGetComponentsMetricsInterface, { rejectWithValue }) => {
    try {
      const response = await Api.getComponents({ type, body });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
        const response = await Api.getProfile();
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (payload: UserProfileUpdatePayload, { rejectWithValue }) => {
    try {
        const response = await Api.editProfile(payload);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

