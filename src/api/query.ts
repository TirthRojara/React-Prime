import axios from "axios"
import type { ArtworkType, FetchArtworksParams, FetchArtworksResponse } from "./type"
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";



const fetchArtworks = async (params: FetchArtworksParams) => {
    try {
        const data = await axios.get("https://api.artic.edu/api/v1/artworks", { params })
        const response = data.data as FetchArtworksResponse;

        const transformedData: ArtworkType[] = response.data.map(artwork => {
            return {
                id: artwork.id,
                title: artwork.title,
                place_of_origin: artwork.place_of_origin,
                artist_display: artwork.artist_display,
                inscriptions: artwork.inscriptions || "",
                date_start: artwork.date_start,
                date_end: artwork.date_end
            };
        })

        return { ...response, data: transformedData }
    }
    catch(error){
        throw error;
    }
}


const artworkQueryOptions = (params: FetchArtworksParams) => ({
    queryKey: ["artworks", params.page],
    queryFn: () => fetchArtworks(params),
    enabled: !!params.page,
    retry: false,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
})


export const useFetchArtworks = (params: FetchArtworksParams) => {
    return useQuery<FetchArtworksResponse>(artworkQueryOptions(params));
}


export const useFetchArtworksWithPagination = () => {
    const [ isLoading, setIsLoading] = React.useState<boolean>(false);
    const queryClient = useQueryClient();
    
    const fetchExtraRows = async (startPage: number, extraCount: number, pageSize: number, totalPages: number) => {
        setIsLoading(() => true);
        const pagesNeeded = Math.ceil(extraCount / pageSize);
        let all: ArtworkType[] = [];

        for (let i = 1; i <= pagesNeeded; i++) {
            const pageToFetch = startPage + i;
            if (pageToFetch > totalPages) break;

            try {
                const data = await queryClient.fetchQuery(
                    artworkQueryOptions({ page: pageToFetch })
                );
                all.push(...(data?.data ?? []));
            } catch {
                // if error, skip that page
            }
        }

        setIsLoading(() => false);
        return all.slice(0, extraCount); 
    };

    return { fetchExtraRows, isLoading };
};