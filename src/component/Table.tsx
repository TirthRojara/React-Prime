import React, { useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import type { ArtworkType, PagginationType } from '../api/type';
import { useGetPageParams } from '../hooks/useGetPagePaarams';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Column } from 'primereact/column';
import OverlayComponent from './OverlayComponent';
import { useFetchArtworksWithPagination } from '../api/query';

interface TableProps {
    artworks: ArtworkType[];
    pagination: PagginationType;
    selectedArtworks: ArtworkType[];
    setSelectedArtworks: React.Dispatch<React.SetStateAction<ArtworkType[]>>;
    mergeUnique: (prev: ArtworkType[], next: ArtworkType[]) => ArtworkType[];
    handleSelectionChange: (newSelection: ArtworkType[], currentPageArtworks: ArtworkType[]) => void;
}

const NUMBER_OF_ROWS_PER_PAGE = 12;

const Table: React.FC<TableProps> = ({ artworks, pagination, mergeUnique, handleSelectionChange, selectedArtworks, setSelectedArtworks }) => {
    const { page, setPage } = useGetPageParams();
    const overlayRef = useRef<OverlayPanel>(null);
    
    const { fetchExtraRows } = useFetchArtworksWithPagination();
        
    const firstRowIndex = (page - 1) * NUMBER_OF_ROWS_PER_PAGE;
        
    const handleSubmit = async (rowNumber: number) => {
        const currentPageRows = artworks.slice(0, Math.min(rowNumber, NUMBER_OF_ROWS_PER_PAGE));
        
        if (rowNumber <= NUMBER_OF_ROWS_PER_PAGE) {
            setSelectedArtworks((prev) => mergeUnique(prev, currentPageRows));
            return;
        }
        
        const extraNeeded = rowNumber - NUMBER_OF_ROWS_PER_PAGE;
        const extraRows = await fetchExtraRows(page, extraNeeded, NUMBER_OF_ROWS_PER_PAGE, pagination.total_pages);
        
        setSelectedArtworks((prev) => mergeUnique(prev, [...currentPageRows, ...extraRows]));
    };
        
    console.log("Selected Artworks:", selectedArtworks);

    return (
        <>
            <OverlayComponent
                ref={overlayRef}
                onSubmit={handleSubmit}
            />
        
            <DataTable
                value={artworks}
                paginator
                lazy
                rows={NUMBER_OF_ROWS_PER_PAGE}
                totalRecords={pagination.total}
                first={firstRowIndex}
                onPage={(e) => {
                    if(e && e.page !== undefined) {
                        setPage(e.page + 1);
                    }
                }}
                selectionMode="multiple"
                selection={selectedArtworks}
                onSelectionChange={(e) => handleSelectionChange(e.value, artworks)}
                dataKey="id"
                tableStyle={{ minWidth: '50rem' }}
                scrollable
                scrollHeight="755px"
            >
               <Column 
                    selectionMode="multiple" 
                    headerStyle={{ width: '3rem' }} 
                />
                <Column
                    header={
                        <i 
                            className="pi pi-chevron-down cursor-pointer" 
                            onClick={(e) => overlayRef.current?.toggle(e)} 
                        />
                    }
                    className='w-8 text-center'
                />
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Place of Origin"></Column>
                <Column field="artist_display" header="Artist"></Column>
                <Column field="inscriptions" header="Inscriptions"></Column>
                <Column field="date_start" header="Date Start"></Column>
                <Column field="date_end" header="Date End"></Column>
            </DataTable>
        </>
    )
}

export default Table
