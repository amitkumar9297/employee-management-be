export interface CreateGroupDTO {
    name: string;
    members: string[]; 
}

export interface UpdateGroupDTO {
    name?: string;
    members?: string[]; 
}
