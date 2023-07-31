import { useEffect, useMemo, useState } from 'react';
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IUsersList, UsersService } from '../../shared/services/api/users/UsersService';
import { ReportsService } from '../../shared/services/api/reports/ReportsService';
import { ListsComponent } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';

export const UsersList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IUsersList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      UsersService.getAll(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setCount(result.count);
          setRows(result.rows);
        }
      });
    });
  }, [search, page]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to proceed?')) {
      UsersService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => [...oldRows.filter((oldRow) => oldRow.id !== id)]);
          alert('User successfully deleted!');
        }
      });
    }
  };

  const formatPhoneNumber = (phoneNumberString: string | undefined) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  };

  return (
    <BaseLayout
      title="Users"
      toolbar={
        <ListsComponent
          searchPlaceholder={process.env.REACT_APP_SEARCH_PLACEHOLDER_BY_NAME}
          showSearchInput
          searchText={search}
          showDownloadButton={count !== 0}
          newButtonLabel="New"
          onNewButtonClick={() => navigate('/users/new')}
          onDownloadButtonClick={() => {
            window.location.href = ReportsService.downloadUsersReport(search);
          }}
          onSearchTextChange={(text) => setSearchParams({ search: text, page: '1' }, { replace: true })}
        />
      }>
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell width={100}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{formatPhoneNumber(row.phone)}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/users/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {count === 0 && !isLoading && <caption>{process.env.REACT_APP_EMPTY_LIST_MESSAGE}</caption>}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {count > 0 && count > process.env.REACT_APP_PAGE_SIZE && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(count / process.env.REACT_APP_PAGE_SIZE)}
                    onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
