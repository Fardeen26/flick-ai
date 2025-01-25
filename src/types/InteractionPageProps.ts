export interface InteractionPageProps {
    params: {
        interactionId: string
    } | Promise<{ interactionId: string }>
}