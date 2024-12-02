import React, { useState, useEffect } from 'react';
import ProjectsTable from './ProjectsTable';
import Pagination from './Pagination';
import '../styles/KickstarterProjects.css';

const API_URL = 'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json';

const KickstarterProjects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectsPerPage = 5;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch projects. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="kickstarter-projects">
      <ProjectsTable projects={currentProjects} currentPage={currentPage} />
      <Pagination
        projectsPerPage={projectsPerPage}
        totalProjects={projects.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default KickstarterProjects;