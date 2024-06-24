// app/page.js
'use client';

import { useState, useEffect } from 'react';

const Home = () => {
	const [message, setMessage] = useState('');

	useEffect(() => {
		fetch('http://localhost:8080/api/hello')
			.then(response => response.json())
			.then(data => {
				setMessage(data.message);
				console.log(data);
			})
			.catch(error => console.error('Error fetching data:', error));
	}, []);

	return (
		<div>
			<div className="text-blue-400">{message}</div>
		</div>
	);
};

export default Home;
