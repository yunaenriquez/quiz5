import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

const useDummyData = process.env.REACT_APP_USE_DUMMY_DATA !== "false";

const dummyRecommendations = [
  {
    id: "r1",
    craving: "savory",
    dish: "Sisig",
    place: "Aling Lucing Sisig",
    city: "Angeles",
    province: "Pampanga",
    notes: "Iconic sizzling chopped pork with calamansi and onions."
  },
  {
    id: "r2",
    craving: "soup",
    dish: "Bulanglang Kapampangan",
    place: "Bale Capampangan",
    city: "San Fernando",
    province: "Pampanga",
    notes: "Comforting sour soup with vegetables and guava notes."
  },
  {
    id: "r3",
    craving: "hearty",
    dish: "Bringhe",
    place: "Everybody's Cafe",
    city: "San Fernando",
    province: "Pampanga",
    notes: "Kapampangan rice dish with coconut milk and turmeric."
  },
  {
    id: "r4",
    craving: "sweet",
    dish: "Tibok-Tibok",
    place: "Susie's Cuisine",
    city: "San Fernando",
    province: "Pampanga",
    notes: "Rich milk pudding topped with latik."
  }
];

const foodKeywords = [
  "dish",
  "food",
  "eat",
  "restaurant",
  "kainan",
  "ulam",
  "dessert",
  "snack",
  "craving",
  "sisig",
  "bringhe",
  "bulanglang",
  "tibok"
];

const looksLikeFoodRequest = (text = "") => {
  const lower = text.toLowerCase();
  return foodKeywords.some((keyword) => lower.includes(keyword));
};

export const fetchRecommendations = createAsyncThunk(
  "guide/fetchRecommendations",
  async ({ craving, query }, thunkAPI) => {
    try {
      if (useDummyData) {
        if (query && !looksLikeFoodRequest(query)) {
          return thunkAPI.rejectWithValue("I can only help with food-related requests in Pampanga.");
        }

        const normalizedCraving = (craving || "").trim().toLowerCase();
        const recommendations = normalizedCraving
          ? dummyRecommendations.filter((item) => item.craving.includes(normalizedCraving))
          : dummyRecommendations;

        return {
          recommendations,
          message: recommendations.length ? "Showing Pampanga-only results." : "No direct match found."
        };
      }

      const params = {
        province: "Pampanga"
      };

      if (craving) {
        params.craving = craving;
      }

      if (query) {
        params.query = query;
      }

      const { data } = await api.get("/guide/recommendations", { params });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Could not fetch recommendations.");
    }
  }
);

const guideSlice = createSlice({
  name: "guide",
  initialState: {
    items: [],
    loading: false,
    error: null,
    message: ""
  },
  reducers: {
    clearGuideState: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.recommendations || [];
        state.message = action.payload.message || "";
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      });
  }
});

export const { clearGuideState } = guideSlice.actions;
export default guideSlice.reducer;
