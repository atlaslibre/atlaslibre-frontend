import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface PhotoThumbnail {
  src: string;
  size: {
    width: number;
    height: number;
  };
}

export interface PhotoQueryResponse {
  photos: {
    id: string;
    thumbnail: PhotoThumbnail;
    thumbnail_large: PhotoThumbnail;
    link: string;
    photographer: string;
  }[];
}

export const planespotterSlice = createApi({
  reducerPath: "planespotter",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.planespotters.net/",
  }),
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getPhotosByHex: builder.query<PhotoQueryResponse, string>({
      query: (hex) => `/pub/photos/hex/${hex.toUpperCase()}`,
    }),
  }),
});

export const { useGetPhotosByHexQuery } = planespotterSlice;
