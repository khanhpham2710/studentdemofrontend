import StudentTable from "../../components/StudentTable/StudentTable"
import { useSelector } from "react-redux";
import { useState } from "react";
import { PaginationLink, Pagination, PaginationItem } from "reactstrap";
import SearchForm from "../../components/SearchForm/SearchForm";

function SearchThanThanh(){
    const { totalPages } = useSelector((state) => state.students);

    const [page, setPage] = useState(1);

    function handlePageChange(newPage){
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };


    return (
        <div>
            <h1>Danh sách sinh viên</h1>
            <SearchForm page={page}/>
            <StudentTable />
            <Pagination>
                <PaginationItem disabled={page === 1}>
                    <PaginationLink
                        first
                        onClick={() => handlePageChange(1)}
                    />
                </PaginationItem>
                <PaginationItem disabled={page === 1}>
                    <PaginationLink
                        previous
                        onClick={() => handlePageChange(page - 1)}
                    />
                </PaginationItem>
                {[...Array(totalPages)].map((item, i) => (
                    <PaginationItem key={i} active={i + 1 === page}>
                        <PaginationLink
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem disabled={page === totalPages}>
                    <PaginationLink
                        next
                        onClick={() => handlePageChange(page + 1)}
                    />
                </PaginationItem>
                <PaginationItem disabled={page === totalPages}>
                    <PaginationLink
                        last
                        onClick={() => handlePageChange(totalPages)}
                    />
                </PaginationItem>
            </Pagination>
        </div>
    );
}

export default SearchThanThanh