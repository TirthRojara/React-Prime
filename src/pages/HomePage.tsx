import React, { useEffect } from 'react'
import { useGetPageParams } from '../hooks/useGetPagePaarams';
import { useFetchArtworks } from '../api/query';
import Table from '../component/Table';
import Loading from '../component/Loading';
import { useArtworkSelectionState } from '../hooks/useSelectedArtwords';

const HomePage: React.FC = () => {
    const { page, setPage } = useGetPageParams();
    console.log("Current Page:", page);

    const { data, error, isFetching } = useFetchArtworks({ page });

    const { selectedArtworks, setSelectedArtworks, mergeUnique, handleSelectionChange } =
        useArtworkSelectionState();

    useEffect(() => {
        if (data?.pagination?.total_pages) {
            const totalPages = data.pagination.total_pages;

            if (page < 1) setPage(1);
            else if (page > totalPages) setPage(totalPages);
        }
    }, [data?.pagination, page, setPage]);


    if (isFetching) {
        console.log("Home loading");
        return <Loading />;
    }
    if (error) return <div>Error fetching artworks: {error.message}</div>;
    if (data && data.data.length === 0) return <div>No artworks found for page {page}.</div>;

    console.log("Fetched Artworks:", {
        data,
        error
    });

    return (
        <div>
            {data && (
                <Table 
                    artworks={data?.data}
                    pagination={data?.pagination}
                    selectedArtworks={selectedArtworks}
                    setSelectedArtworks={setSelectedArtworks}
                    mergeUnique={mergeUnique}
                    handleSelectionChange={handleSelectionChange}
                />
            )}
        </div>
    )
}

export default HomePage;
