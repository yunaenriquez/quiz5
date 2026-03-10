import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

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
  "tibok",
  "kapampangan",
  "pampanga"
];

const outsidePampangaKeywords = [
  "outside pampanga",
  "manila",
  "makati",
  "quezon city",
  "cebu",
  "davao",
  "baguio",
  "iloilo",
  "taguig",
  "pasig",
  "laguna",
  "bulacan",
  "pangasinan",
  "tarlac",
  "bataan",
  "zambales"
];

const looksLikeFoodRequest = (text = "") => {
  const lower = text.toLowerCase();
  return foodKeywords.some((keyword) => lower.includes(keyword));
};

const mentionsOutsidePampanga = (text = "") => {
  const lower = text.toLowerCase();
  return outsidePampangaKeywords.some((keyword) => lower.includes(keyword));
};

export const fetchRecommendations = createAsyncThunk(
  "guide/fetchRecommendations",
  async ({ craving, query }, thunkAPI) => {
    try {
      const combinedRequest = `${craving || ""} ${query || ""}`.trim();

      if (!combinedRequest) {
        return thunkAPI.rejectWithValue("Please enter a craving or question about Kapampangan food in Pampanga.");
      }

      if (!looksLikeFoodRequest(combinedRequest)) {
        return thunkAPI.rejectWithValue(
          "I can only help with food-related requests focused on Kapampangan dishes and Pampanga eateries."
        );
      }

      if (mentionsOutsidePampanga(combinedRequest)) {
        return thunkAPI.rejectWithValue(
          "I can only suggest Kapampangan dishes or local eateries within Pampanga."
        );
      }

      const prompt = [
        "Recommend specific Kapampangan dishes or local eateries in Pampanga only.",
        "Refuse non-food topics and any location outside Pampanga.",
        craving ? `Craving: ${craving}` : null,
        query ? `User request: ${query}` : null
      ]
        .filter(Boolean)
        .join("\n");

      const { data } = await api.post("/chat/", { message: prompt });

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return {
        recommendations: [
          {
            id: `${Date.now()}`,
            craving: craving || "general",
            dish: "Kapampangan Recommendation",
            place: "Pampanga",
            city: "Pampanga",
            province: "Pampanga",
            notes: data.reply || "No recommendation returned."
          }
        ],
        message: "Showing Pampanga-only recommendation."
      };
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
