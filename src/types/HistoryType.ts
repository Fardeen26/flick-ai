export interface HistoryType {
    id: string,
    userPrompt: string,
    aiResponse: string,
    mood: string | null,
    action: string | null,
    createdAt: Date,
    userId: number
}