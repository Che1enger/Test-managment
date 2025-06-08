import { useEffect, useState } from 'react'
import './App.css'
import type { Members, Team } from './types'
import TeamList from './teamList'
import TeamDetails from './teamDetails'
import EditModal from './editModal'
function App() {
  const [teams,setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [editingMember, setEditingMember] = useState<Members | null>(null)
  const [editingTeam, setEditingTeam] = useState<Members | null>(null)
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      try{
        const response = await fetch('https://storage.aderize.com/Erik/Test-Works/teams.json')
        const data = await response.json()
        setTeams(data)
        setFilteredTeams(data)
      }catch(error){
        console.error('error fetching data:', error)
      }
    }
    fetchdata()
  }, [])

  const handle_SelectTeam = (team: Team) => {
    setSelectedTeam(team)
  }

  const handle_UpdateTeamName = (teamId: number, newName: string) => {
    const updatedTeams = teams.map(team => team.id === teamId ?{
      ...team,
      name: newName
    }: team)
    setTeams(updatedTeams)
    setFilteredTeams(updatedTeams)
    if(selectedTeam && selectedTeam.id === teamId) {
      setSelectedTeam({...selectedTeam, name: newName })
    }
  }

  const handle_UpdateMember = (teamId: number, updateMember: Members) => {
    const updatedTeams = teams.map(team => {
      if(team.id === teamId){
        const updateMembers = team.members.map(member => member.id === updateMember.id ? updateMember : member);
        return {
          ...team,
          members: updateMembers
        }
      }
        return team
      });
    setTeams(updatedTeams);
    setFilteredTeams(updatedTeams);
    if(selectedTeam && selectedTeam.id === teamId) {
      const updatedSelectedTeamMember = selectedTeam.members.map(member => member.id === updateMember.id ? updateMember : member)
      setSelectedTeam({
        ...selectedTeam,
        members: updatedSelectedTeamMember
      });
    }
  }

  const handle_Search = (searchTerms: string) => {
    const filtered = teams.filter(team => team.name.toLowerCase().includes(searchTerms.toLowerCase()))
    setFilteredTeams(filtered)
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="App">
      <div className="burger" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <aside className={isSidebarOpen ? 'open' : ''}>
        <nav>
          <ul>
            <li><a href="#teams">teams</a></li>
            <li><a href="#dashboard">dashboard</a></li>
            <li><a href="#reports">reports</a></li>
          </ul>
        </nav>
      </aside>    
      <main className={isSidebarOpen ? 'shifted' : ''}>
        <header>
          <h1>Team managment</h1>
        </header>
        <div className="content">
          <TeamList 
            teams={filteredTeams}
            onSelectTeam={handle_SelectTeam}
            onSearch={handle_Search}
          />
          {selectedTeam && (
            <TeamDetails
              team={selectedTeam}
              onUpdateTeamName={handle_UpdateTeamName}
              onEditMember={setEditingMember}
            />
          )}
        </div>
      </main>
      {editingMember && selectedTeam && (
        <EditModal
          member={editingMember}
          teamId={selectedTeam.id}
          onSave={handle_UpdateMember}
          onClose={() => setEditingMember(null)}
        />
      )}
    </div>
  )
}

export default App
