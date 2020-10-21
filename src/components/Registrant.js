import React, { useState, useEffect } from 'react';
import {
	getAllRegistrants,
	createRegistrant,
	deleteRegistrant,
	updateRegistrant,
} from '../services/api-registrantHelper';

function Registrant() {
	const [registrants, setRegistrants] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showUpdate, setShowUpdate] = useState(false);
	const [update, setUpdate] = useState('');
	const [name, setName] = useState('');

	useEffect(() => {
		const makeAPICall = async () => {
			const resp = await getAllRegistrants();
			setRegistrants(resp);
			setIsLoading(false);
		};
		makeAPICall();
	}, []);

	const handleDelete = async (id) => {
		const json = await deleteRegistrant(id); 
		console.log(json); 
		const registrantArr = registrants.filter(
			(registrant) => registrant._id !== id
		);
		setRegistrants(registrantArr);
	};

	const handleUpdateChange = (e) => {
		setUpdate(e.target.value);
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		const json = await updateRegistrant(showUpdate, { Name: update });
		console.log(json);
		const resp = await getAllRegistrants();
		setRegistrants(resp);
		setShowUpdate(false);
		setUpdate('');
	};

	const handleCreate = async (e) => {
		e.preventDefault();
		const json = await createRegistrant({ Name: name });
		setRegistrants([...registrants, json]);
		setName('');
	};

	const renderRegistrants = registrants.map((registrant, index) => {
		return (
			<div key={index} className='registrant-item'>
				<li>
					Name: {registrant.name} <br />
					Email: {registrant.companyEmail} <br />
					Company Name: {registrant.companyName} <br />
					Registration Status: {registrant.eventStatus}
				</li>
				<button onClick={() => handleDelete(registrant._id)}>Delete</button>
				<button onClick={() => setShowUpdate(registrant._id)}>Edit</button>
			</div>
		);
	});

	return (
		<div className={'registrant form container'}>
			{!isLoading && <ul>{renderRegistrants}</ul>}
			{showUpdate && (
				<>
					<h3>Edit Registrant</h3>
					<form onSubmit={handleUpdate}>
						<div>
							<label>Name: </label>
							<input
								type='text'
								onChange={handleUpdateChange}
								value={name}></input>
						</div>
						<button>Submit</button>
					</form>
				</>
			)}
		</div>
	);
}

export default Registrant;
