export interface ResultProps {
    improvePrompt: string;
    isImprovingField: boolean;
    setImprovePrompt: (improvePrompt: string) => void;
    handleRegenerate: () => void;
    copyToClipboard: () => void;
    saveInteraction: () => void
}