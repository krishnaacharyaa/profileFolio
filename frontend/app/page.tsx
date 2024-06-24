// src/app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { User } from './types/user';

const Home = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch('http://localhost:8080/api/user');
			const data: User = await response.json();
			setUser(data);
		};
		fetchUser();
	}, []);

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="p-5">
			<h1 className="text-4xl font-bold mb-5">{user.basics.name}</h1>
			<p className="mb-5">{user.basics.summary}</p>
			<div className="mb-5">
				<h2 className="text-2xl font-semibold">Profiles</h2>
				{user.basics.profiles.map((profile, index) => (
					<p key={index}>
						<a href={profile.url} className="text-blue-500">
							{profile.network}: {profile.username}
						</a>
					</p>
				))}
			</div>
			<div className="mb-5">
				<h2 className="text-2xl font-semibold">Work</h2>
				{user.work.map((job, index) => (
					<div key={index}>
						<p className="font-bold">
							{job.position} at{' '}
							<a href={job.url} className="text-blue-500">
								{job.name}
							</a>
						</p>
						<p>
							{job.startDate} - {job.endDate}
						</p>
						<p>{job.summary}</p>
						<ul className="list-disc ml-5">
							{job.highlights.map((highlight, i) => (
								<li key={i}>{highlight}</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<div className="mb-5">
				<h2 className="text-2xl font-semibold">Education</h2>
				{user.education.map((edu, index) => (
					<div key={index}>
						<p className="font-bold">
							{edu.studyType} in {edu.area} at{' '}
							<a href={edu.url} className="text-blue-500">
								{edu.institution}
							</a>
						</p>
						<p>
							{edu.startDate} - {edu.endDate}
						</p>
						<p>Score: {edu.score}</p>
						<ul className="list-disc ml-5">
							{edu.courses.map((course, i) => (
								<li key={i}>{course}</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<div>
				<h2 className="text-2xl font-semibold">Projects</h2>
				{user.projects.map((project, index) => (
					<div key={index}>
						<p className="font-bold">
							<a href={project.url} className="text-blue-500">
								{project.name}
							</a>
						</p>
						<p>
							{project.startDate} - {project.endDate}
						</p>
						<p>{project.description}</p>
						<ul className="list-disc ml-5">
							{project.highlights.map((highlight, i) => (
								<li key={i}>{highlight}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
