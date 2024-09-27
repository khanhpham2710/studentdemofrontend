import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchStudents } from '../../global/studentSlice';
import {  Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import { useParams } from 'react-router-dom';
import StudentTable from '../../components/StudentTable/StudentTable';

function SearchPage() {
    const dispatch = useDispatch();
    const { totalPages } = useSelector((state) => state.students);
    const { name } = useParams();

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(searchStudents({
            name: name,
            orderBy: null,
            page: page - 1
        }));
    }, [page]);


    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    }


    return (
        <div>
            <h1>Danh sách sinh viên</h1>
            <StudentTable />
            <Pagination>
                <PaginationItem disabled={page === 1}>
                    <PaginationLink first onClick={() => handlePageChange(1)} aria-label="First" />
                </PaginationItem>
                <PaginationItem disabled={page === 1}>
                    <PaginationLink previous onClick={() => handlePageChange(page - 1)} aria-label="Previous" />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i} active={i + 1 === page}>
                        <PaginationLink onClick={() => handlePageChange(i + 1)} aria-label={`Page ${i + 1}`}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem disabled={page === totalPages}>
                    <PaginationLink next onClick={() => handlePageChange(page + 1)} aria-label="Next" />
                </PaginationItem>
                <PaginationItem disabled={page === totalPages}>
                    <PaginationLink last onClick={() => handlePageChange(totalPages)} aria-label="Last" />
                </PaginationItem>
            </Pagination>
        </div>
    );
}

export default SearchPage;
