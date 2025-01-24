import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export const LoginModal = ({ onClose, showLoginModal }: { onClose: () => void, showLoginModal: boolean }) => {
    return (
        <Dialog open={showLoginModal} onOpenChange={(open) => {
            if (!open) {
                onClose();
            }
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Login to Continue</DialogTitle>
                    <DialogDescription>
                        You&apos;ve reached the free tier usage limit. Sign in to unlock full access to our AI-powered features and continue your journey.
                    </DialogDescription>
                </DialogHeader>
                <Button className="dark:bg-white bg-black text-white hover:bg-black/90 dark:text-black dark:hover:bg-white/95" onClick={() => signIn("google")}>Login with Google</Button>
            </DialogContent>
        </Dialog>
    );
};