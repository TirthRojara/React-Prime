import { useState } from "react";
import type { ArtworkType } from "../api/type";

export const useArtworkSelectionState = () => {
    const [selectedArtworks, setSelectedArtworks] = useState<ArtworkType[]>([]);

    // merge and deduplicate utility
    const mergeUnique = (prev: ArtworkType[], next: ArtworkType[]) => {
        const merged = [...prev, ...next];
        return Array.from(new Map(merged.map(item => [item.id, item])).values());
    };

    const handleSelectionChange = (newSelection: ArtworkType[], currentPageArtworks: ArtworkType[]) => {
        const currentPageIds = new Set(currentPageArtworks.map(a => a.id))

        setSelectedArtworks((prev) => {
            const removedItems = prev.filter(item =>
                currentPageIds.has(item.id) && !newSelection.some(s => s.id === item.id)
            );

            if (removedItems.length > 0) {
                const removedIds = new Set(removedItems.map(item => item.id))
                return prev.filter(item => !removedIds.has(item.id))
            };

            return mergeUnique(prev, newSelection);
        });
    };

    return { selectedArtworks, setSelectedArtworks, handleSelectionChange, mergeUnique };
};
