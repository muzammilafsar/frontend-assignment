import React from 'react';
import '../styles/ProjectsTable.css';

const ProjectsTable = ({ projects, currentPage }) => {
  return (
    <table className="projects-table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage funded</th>
          <th>Amount pledged</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={index}>
            <td>{project['s.no']}</td>
            <td>{project['percentage.funded']}%</td>
            <td>${project['amt.pledged'].toFixed(2)}</td>   
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectsTable;