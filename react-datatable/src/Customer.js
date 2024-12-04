import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Paper, Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import CustomerCreate from './customercreate';


function KeeperPage() {
	const [data, setData] = useState([]);
	const [totalRows, setTotalRows] = useState(0);
	const [page, setPage] = useState(0);
	const [perPage, setPerPage] = useState(5);
	const [sortColumn, setSortColumn] = useState('');
	const [sortColumnDir, setSortColumnDir] = useState('');
	const [search, setSearch] = useState('');
	const [newData, setNewData] = useState({
		customer_id: '',
		fname: '',
		lname: '',
		phonenumber: '',
		email: '',
		room_id: '',
	});
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			let url = `http://localhost:3000/api/customers?page=${page + 1}&per_page=${perPage}`;
			if (search) {
				url += `&search=${search}`;
			}
			if (sortColumn) {
				url += `&sort_column=${sortColumn}&sort_direction=${sortColumnDir}`;
			}
			const response = await axios.get(url);
			setData(response.data.data);
			setTotalRows(response.data.total);
		} catch (error) {
			console.error('Error fetching data:', error);
			setError('Failed to fetch data. Please try again later.');
		}
	};

	const handlePerRowsChange = (event) => {
		const value = event.target.value === 'all' ? totalRows : parseInt(event.target.value, 10);
		setPerPage(value);
		setPage(0);
	};

	const handleSort = (column) => {
		const isAsc = sortColumn === column && sortColumnDir === 'asc';
		setSortColumn(column);
		setSortColumnDir(isAsc ? 'desc' : 'asc');
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		fetchData();
	};


	useEffect(() => {
		document.title = 'Customer management';
		fetchData();
	}, [page, perPage, sortColumn, sortColumnDir]);

	return (
		<React.Fragment>
			<Container maxWidth="xxlg" align="right" sx={{ p: 2 }}>
				<CustomerCreate />	
				<CssBaseline />
				<Paper sx={{ p: 4 }}>
					{error && (
						<Box mb={2}>
							<Typography color="error">{error}</Typography>
						</Box>
					)}
					<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
						<Typography variant="h6">Customer</Typography>
						<form onSubmit={handleSearchSubmit}>
							<TextField
								label="Search"
								variant="outlined"
								size="small"
								value={search}
								onChange={handleSearchChange}
							/>
							<Button type="submit" variant="contained" color="primary" sx={{ ml: 1 }}>
								ID Search
							</Button>
						</form>
					</Box>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell onClick={() => handleSort('keeper_id')}>Keeper ID</TableCell>
									<TableCell align="center" onClick={() => handleSort('fname')}>First Name</TableCell>
									<TableCell align="center" onClick={() => handleSort('lname')}>Last Name</TableCell>
									<TableCell align="center" onClick={() => handleSort('phonenumber')}>Phone Number</TableCell>
									<TableCell align="center" onClick={() => handleSort('email')}>Email</TableCell>
									<TableCell align="center" onClick={() => handleSort('room_id')}>Room ID</TableCell>
									<TableCell align="center">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((row) => (
									<TableRow key={row.customer_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component="th" scope="row">{row.customer_id}</TableCell>
										<TableCell align="center">{row.fname}</TableCell>
										<TableCell align="center">{row.lname}</TableCell>
										<TableCell align="center">{row.phonenumber}</TableCell>
										<TableCell align="center">{row.email}</TableCell>
										<TableCell align="center">{row.room_id}</TableCell>
										<TableCell align="center">
											<Button
												variant="contained"
												color="secondary"
												size="small"
												onClick={async () => {
													try {
														await axios.delete(`http://localhost:3000/api/customers/${row.customer_id}`);
														fetchData();
													} catch (error) {
														console.error('Error deleting data:', error);
													}
												}}
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TextField
						select
						aria-label="Rows per page"
						value={perPage}
						sx={{ p: 2 }}
						onChange={handlePerRowsChange}
						align="right"
						SelectProps={{ native: true }}
						variant="outlined"
						size="small"
					>
						{[5, 10, 'all'].map((option) => (
							<option key={option} value={option}>
								{option === 'all' ? 'All' : option}
							</option>
						))}
					</TextField>
				</Paper>
			</Container>
		</React.Fragment>
	);
}

export default KeeperPage;
