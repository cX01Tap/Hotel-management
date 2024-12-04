import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const columns = [
	{
		name: 'ID',
		selector: row => row.id,
		sortable: true,
		width: '100px',
	  },
	  {
		name: 'First Name',
		selector: row => row.fname,
		width: '150px',
	  },
	  {
		name: 'Last Name',
		selector: row => row.lname,
		sortable: true,
		width: '150px',
	  },
	  {
		name: 'Email',
		selector: row => row.email,
		sortable: true,
		width: '250px',
	  },
	  {
		name: 'Phone Number',
		selector: row => row.phonenumber,
		sortable: true,
		width: '250px',
	  },
	  {
		name: 'Position',
		selector: row => row.position,
		sortable: true,
		width: '250px',
	  },
];


function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
  	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
  	const [sortColumn, setsortColumn] = useState('');
  	const [sortColumnDir, setsortColumnDir] = useState('');
  	const [search, setSearch] = useState('');
	const [newData, setNewData] = useState({
		fname: '',
		lname: '',
		email: '',
		phonenumber: '',
		position: ''
	});
	const [updateData, setUpdateData] = useState({
		id: '',
		position: ''
	});
	const [deleteData, setDeleteData] = useState({
		id: ''
	});

	const fetchData = async () => {
		setLoading(true);

		try {
			let url = `http://localhost:3000/api/users?page=${page}&per_page=${perPage}`;
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
			// Optionally, you can set an error state here to display an error message to the user
		} finally {
			setLoading(false);
		}
	};

	const handlePageChange = page => {
		setPage(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setPerPage(newPerPage);
	};

  const handleSort = (column, sortDirection) => {
    setsortColumn(column.name);
    setsortColumnDir(sortDirection);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData();
  }

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewData({ ...newData, [name]: value });
	};

	const handleCreateSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post('http://localhost:3000/api/users', newData);
			console.log('Data created successfully:', response.data);
			// Optionally, you can refresh the data or reset the form here
			fetchData();
			setNewData({
				fname: '',
				lname: '',
				email: '',
				phonenumber: '',
				position: ''
			});
		} catch (error) {
			console.error('Error creating data:', error);
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.error('Server responded with:', error.response.data);
			} else if (error.request) {
				// The request was made but no response was received
				console.error('No response received:', error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.error('Error setting up request:', error.message);
			}
		}
	};

	const handleUpdateInputChange = (event) => {
		const { name, value } = event.target;
		setUpdateData({ ...updateData, [name]: value });
	};

	const handleDeleteInputChange = (event) => {
		const { name, value } = event.target;
		setDeleteData({ ...deleteData, [name]: value });
	};

	const handleUpdateSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.put(`http://localhost:3000/api/users/${updateData.id}`, { position: updateData.position });
			console.log('Data updated successfully:', response.data);
			// Optionally, you can refresh the data or reset the form here
			fetchData();
			setUpdateData({
				id: '',
				position: ''
			});
		} catch (error) {
			console.error('Error updating data:', error);
			// Optionally, you can set an error state here to display an error message to the user
		}
	};

	const handleDeleteSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.delete(`http://localhost:3000/api/users/${deleteData.id}`);
			console.log('Data deleted successfully:', response.data);
			// Optionally, you can refresh the data or reset the form here
			fetchData();
			setDeleteData({
				id: ''
			});
		} catch (error) {
			console.error('Error deleting data:', error);
			// Optionally, you can set an error state here to display an error message to the user
		}
	};

	useEffect(() => {
		fetchData(); // fetch page 1 of users
		
	}, [page, perPage, sortColumn, sortColumnDir]);

	return (
		<div className="wrapper d-flex justify-content-center">
			<div id="content" className="w-75">
				<div>
					<form onSubmit={handleCreateSubmit} className="mb-3">
						<label>
							First Name : 
							<br/><input type="text" name="fname" value={newData.fname} onChange={handleInputChange} className="ml-2" />
						</label><br/><br/>
						<label className="ml-6">
							Last Name : 
							<br/><input type="text" name="lname" value={newData.lname} onChange={handleInputChange} className="ml-2" />
						</label><br/><br/>
						<label className="ml-6">
							Email : 
							<br/><input type="text" name="email" value={newData.email} onChange={handleInputChange} className="ml-2" />
						</label><br/><br/>
						<label className="ml-6">
							PhoneNumber : 
							<br/><input type="text" name="phonenumber" value={newData.phonenumber} onChange={handleInputChange} className="ml-2" />
						</label><br/><br/>
						<label className="ml-6">
							Position : 
							<br/><input type="text" name="position" value={newData.position} onChange={handleInputChange} className="ml-2" />
						</label><br/><br/>
						<input type="submit" value="Create" className="ml-2" />
					</form><br/><br/>
					<DataTable
						title="Users"
						columns={[
							...columns,
							{
								name: 'Actions',
								cell: row => (
									<div className="d-flex">
										<input
											className="form-control"
											style={{ width: "300px" }}
											type="text"
											placeholder="New Position..."
											onChange={(event) => {
												setUpdateData({ id: row.id, position: event.target.value });
											}}
										/>
										<button
											className="btn btn-warning btn-sm ml-2"
											onClick={() => {
												handleUpdateSubmit(new Event('submit'));
											}}
										>
											Update
										</button>
										<button
											className="btn btn-danger btn-sm ml-2"
											onClick={async () => {
												setDeleteData({ id: row.id });
												await handleDeleteSubmit(new Event('submit'));
											}}
										>
											Delete
										</button>
									</div>
								),
								ignoreRowClick: true,
								allowOverflow: true,
								button: true,
							},
						]}
						data={data}
						progressPending={loading}
						pagination
						paginationServer
						paginationTotalRows={totalRows}
						onChangeRowsPerPage={handlePerRowsChange}
						onChangePage={handlePageChange}
						onSort={handleSort}
						subHeader
						subHeaderComponent={
							<form onSubmit={handleSearchSubmit} className="d-flex w-100">
								<input
									type="text"
									placeholder="Search"
									onChange={handleSearchChange}
									className="form-control"
								/>
								<button type="submit" className="btn btn-primary ml-2">Search</button>
							</form>
						}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
