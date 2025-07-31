import { useState } from "react";
import type { ArtworkType } from "../api/type";

export const useArtworkSelectionState = (artworks: ArtworkType[]) => {
    const [selectedArtworks, setSelectedArtworks] = useState<ArtworkType[]>([]);

    // merge and deduplicate utility
    const mergeUnique = (prev: ArtworkType[], next: ArtworkType[]) => {
        const merged = [...prev, ...next];
        return Array.from(new Map(merged.map(item => [item.id, item])).values());
    };

    const handleSelectionChange = (newSelection: ArtworkType[]) => {
        setSelectedArtworks((prev) => {
            const pageIds = new Set(artworks.map(a => a.id));
            const others = prev.filter(item => !pageIds.has(item.id));
            return mergeUnique(others, newSelection);
        });
    };

    return { selectedArtworks, setSelectedArtworks, handleSelectionChange, mergeUnique };
};
