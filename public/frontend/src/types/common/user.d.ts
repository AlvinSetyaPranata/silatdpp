export interface UserCredentialType {
    user: {
        id: string,
        name: string,
        email: string,
        email_verified_at: null,
        created_at: string,
        updated_at: string
    },
    roles: string[]
}

export interface ROLE_TYPE {
    created_at: string;
    guard_name: string;
    id: string;
    name: string
    role_id: 2
}