import type { Team } from "./types";

interface TeamListProps {
    teams: Team[]
    onSelectTeam: (team: Team) => void
    onSearch:(term: string) => void
}

function TeamList({ teams, onSelectTeam, onSearch }: TeamListProps) {
    return (
        <div className="team_list_container">
            <h2>Teams</h2>
            <input type="text" placeholder="Search team" 
            onChange={(e) => onSearch(e.target.value)}
            className="search_input" />
            <ul className="team_list">
                {teams.map(team =>(
                    <li key={team.id} onClick={() => onSelectTeam(team)}>
                        <div className="team_name">{team.name}</div>
                        <div className="team_info">
                            <span>{team.members.length} members</span>
                            <span>Created: {new Date(team.createdAt).toLocaleDateString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>       
    );
}

export default TeamList;