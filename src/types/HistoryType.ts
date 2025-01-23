export interface HistoryType {
    id: number,
    userPrompt: string,
    aiResponse: string,
    mood: string | null,
    action: string | null,
    createdAt: Date,
    userId: number
}