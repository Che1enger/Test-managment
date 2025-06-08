import { useState } from 'react';
import type {Members, Team} from './types';

interface TeamDetailsProps {
    team: Team
    onUpdateTeamName: (teamId: number, newName: string) => void
    onEditMember: (member: Members) => void
}

function TeamDetails({team, onUpdateTeamName, onEditMember}: TeamDetailsProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [newName, setNewName] = useState(team.name)
    
    const handle_SaveName = () => {
        onUpdateTeamName(team.id, newName)
        setIsEditing(false)
    }

    
    return (
        <div className="team_details_container">
            <div className="team_header">
                {isEditing ? (
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                )
                :( <h2>{team.name}</h2>)}
                <div style={{width: '100px', textAlign: 'center'}}>
                    {isEditing ? (
                    <button onClick={handle_SaveName}>save</button>
                    ):(
                        <button onClick={() => setIsEditing(true)}>edit</button>
                    )}
                </div>
                
            </div>
            <div className="table_container">
                <h3>Members</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.members.map(member => (
                            <tr key={member.id}>
                                <td data-label="Name">{member.name}</td>
                                <td data-label="ROle">{member.role}</td>
                                <td data-label="Email">{member.email}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button onClick={() => onEditMember(member)}>edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
} 

export default TeamDetails;