import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../../global/studentSlice';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import StudentTable from '../../components/StudentTable/StudentTable';

function StudentPage() {
    const dispatch = useDispatch();
    const { totalPages } = useSelector((state) => state.students);

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchStudents(page-1));
    }, [dispatch, page]);

    function handlePageChange(newPage){
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    
    return (
        <div>
            <h1>Danh sách sinh viên</h1>
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

export default StudentPage;
