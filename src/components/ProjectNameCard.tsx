import Link from 'next/link';
import React from 'react'

interface ProjectCardProps{
    name: string;
    createdAt: Date;
    docId:string
}

/*Card to display a single project in project list along with project creation date. */
  const ProjectNameCard:React.FunctionComponent<ProjectCardProps> = ({name,createdAt,docId}) => {
    return (
      <Link href={`/projects/${docId}`}className="flex flex-col justify-center hover:bg-gray-400 cursor-pointer bg-white shadow-md  rounded-lg p-4 h-56 mb-4">
        <h3 className="text-lg font-semibold text-center">{name}</h3>
        <p className="text-gray-500">
          Created on: {createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
        </p>
      </Link>
    );
}

export default ProjectNameCard