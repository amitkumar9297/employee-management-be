export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role?: "USER" | "HR";
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
    active?: boolean;
    role?: "USER" | "HR";
}

export interface LoginUserDTO {
    email: string;
    password: string;
}