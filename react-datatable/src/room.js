import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import KeeperPage from "./keeper";
import CustomerPage from "./Customer";
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
import updateData from './keeper';
import Navbar from './Navbar';
import Con from './room';
import roomscreate from './roomcreate';


const columns = [
	{
		name: 'ID ',
		selector: row => row.room_id,
    sortable: true,
    width: '100px',
	},
  {
		name: 'Roomtype',
		selector: row => row.roomtype,
    width: '150px'
	},
  {
		name: 'Capacity',
		selector: row => row.capacity,
    sortable: true,
    width: '150px'
	},
  {
		name: 'Pricepernight',
		selector: row => row.pricepernight,
    sortable: true,
    width: '250px'
	},
  {
		name: 'Availability',
		selector: row => row.availability,
    sortable: true,
	width: '250px'
	},
  {
		name: 'Keeper_id',
		selector: row => row.keeper_id,
    sortable: true,
	width: '250px'
	},
];
function RoomPage() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
  	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
  	const [sortColumn, setsortColumn] = useState('');
  	const [sortColumnDir, setsortColumnDir] = useState('');
  	const [search, setSearch] = useState('');
	const [newData, setNewData] = useState({
		room_id: '',
		roomtype: '',
		capacity: '',
		pricepernight: '',
		availability: '',
		keeper_id: '',
	});
	const [updateData, setUpdateData] = useState({
		room_id: '',
		keeper_id: ''
	});
	const [deleteData, setDeleteData] = useState({
		room_id: ''
	});

	const fetchData = async () => {
		setLoading(true);
		try {
			let url = `http://localhost:3000/api/rooms?page=${page}&per_page=${perPage}`;
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
			const response = await axios.post('http://localhost:3000/api/rooms', newData);
			console.log('Data created successfully:', response.data);
			// Optionally, you can refresh the data or reset the form here
			fetchData();
			setNewData({
				roomtype: '',
				capacity: '',
				pricepernight: '',
				availability: '',
				keeper_id: '',
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
			const response = await axios.put(`http://localhost:3000/api/rooms/${updateData.room_id}`, { keeper_id: updateData.keeper_id });
			console.log('Data updated successfully:', response.data);
			// Optionally, you can refresh the data or reset the form here
			fetchData();
			setUpdateData({
				room_id: '',
				keeper_id: '',
			});
		} catch (error) {
			console.error('Error updating data:', error);
			// Optionally, you can set an error state here to display an error message to the user
		}
	};

	const handleDeleteSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.delete(`http://localhost:3000/api/rooms/${deleteData.room_id}`);
			console.log('Data deleted successfully:', response.data);
			// Optionally, you can refresh the data or reset the form here
			fetchData();
			setDeleteData({
				room_id: ''
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
		
		<div >
			<Navbar />
			<div className="w-100">
				<div className="row bg-white text-bg-secondary-blue text-bg-gray" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
					<div>
					<form onSubmit={handleCreateSubmit} className='row'	>
						<div className='col-md-6'>
							<div className="form-group ml=4">
								<label>Roomtype:</label>
								<input type="text" name="roomtype" value={newData.roomtype} onChange={handleInputChange} className="form-control" />
							</div>
							<div className="form-group ml=4">
								<label>Capacity:</label>
								<input type="text" name="capacity" value={newData.capacity} onChange={handleInputChange} className="form-control" />
							</div>
							<div className="form-group ml=4">
								<label>Price per night:</label>
								<input type="text" name="pricepernight" value={newData.pricepernight} onChange={handleInputChange} className="form-control" />
							</div>
						</div>
						<div className='col-md-6'>
							<div className="form-group ml=4">
								<label>Availability:</label>
								<input type="text" name="availability" value={newData.availability} onChange={handleInputChange} className="form-control" />
							</div>
							<div className="form-group ml=4">
								<label>Keeper ID:</label>
								<input type="text" name="keeper_id" value={newData.keeper_id} onChange={handleInputChange} className="form-control" />
							</div><br />
							<button type="submit" className="btn btn-primary">Create</button>
						</div>
					</form>
				
					<Con />
						<br /><br />
						<DataTable
							title="Rooms"
							columns={[
								...columns,
								{
									name: 'Actions',
									cell: row => (
										<div className="d-flex w-75">
											<input
												className="form-control"
												style={{ width: "400px" }}
												type="text"
												placeholder="New KeeperID..."
												onChange={(event) => {
													setUpdateData({ room_id: row.room_id, keeper_id: event.target.value });
												}}
											/>
											<div className="btn-group" role="group" aria-label="Basic button group">
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
														setDeleteData({ room_id: row.room_id });
														await handleDeleteSubmit(new Event('submit'));
													}}
												>
													Delete
												</button>
											</div>
										</div>
									),
									ignoreRowClick: true,
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
		</div>
	);
}
export default RoomPage;