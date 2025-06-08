import { useState } from "react";
import type { Members } from "./types";

interface EditModalProps {
    member: Members
    teamId: number
    onSave: (teamId: number, member: Members) => void
    onClose: () => void
}

function EditModal({member, teamId, onSave, onClose}: EditModalProps) {
    const [editedMember, setEditedMember] = useState<Members>(member)

    const handle_Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setEditedMember(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handle_Save = () => {
        onSave(teamId, editedMember)
        onClose()
    }

    return(
        <div className="drop">
            <div className="modal_content">
                <h2>Edit Member</h2>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={editedMember.name} 
                        onChange={handle_Change} 
                    />
                </label>
                <label>
                    Role:
                    <input 
                        type="text" 
                        name="role" 
                        value={editedMember.role} 
                        onChange={handle_Change} 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={editedMember.email} 
                        onChange={handle_Change} 
                    />
                </label>
                <div className="modal_buttons">
                    <button onClick={handle_Save}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
                
            </div>
        </div>
    )
}

export default EditModal;