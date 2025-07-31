import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useGetPageParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    let page = Number(searchParams.get("page")) || 1;
    if (page < 1 || isNaN(page)) page = 1;

    useEffect(() => {
        if (!searchParams.get("page") || page < 1) {
            setSearchParams({ page: "1" }, { replace: true });
        }
    }, [searchParams, setSearchParams, page]);

    return { 
        page,
        setPage: (newPage: number) => setSearchParams({ page: String(newPage) }, { replace: true })
    };
};