
import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DataTableDemo() {
    const items: number[] = Array.from({ length: 15 }, (v, i) => i);

    return (
        <div className="card">
            <DataTable value={items} className="p-datatable-striped">
                <Column field="code" header="Title" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="place_of_origin" header="Place of Origin" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="artist_display" header="Artist" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="inscriptions" header="Inscriptions" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="date_start" header="Date Start" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="date_end" header="Date End" style={{ width: '25%' }} body={<Skeleton />}></Column>
            </DataTable>
        </div>
    );
}
        