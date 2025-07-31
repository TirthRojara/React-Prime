
export type PagginationType = {
    total: number,
    limit: number,
    offset: number,
    total_pages: number,
    current_page: number,
    next_url: string
}

export type ArtworkType = {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string | null;
    date_start: number;
    date_end: number;
};

type InfoType = {
    license_text: string;
    license_links: string[];
    version: string;
}

type ConfigType = {
    iiif_url: string;
    website_url: string
}


export interface FetchArtworksResponse {
    pagination: PagginationType;
    data: Array<ArtworkType & {
        [key: string]: any;
    }>
    info: InfoType;
    config: ConfigType;
}

export interface FetchArtworksParams {
    page: number
}

export interface ArtworkResponse {
    pagination: PagginationType;
    data: ArtworkType[];
}