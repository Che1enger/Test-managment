export interface Team {
    id: number
    name: string
    members: Members[]
    createdAt: string
    
}

export interface Members{
    id: number
    name: string
    role: string
    email: string
}