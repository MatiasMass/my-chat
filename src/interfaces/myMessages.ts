export interface myMessages {
    id: string;
    message: string;
    createdAt: Date;
    client?: boolean;
    senderId?: string;
}