import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"


import { signIn } from "next-auth/react";

export const LoginModal = ({ onClose, showLoginModal }: { onClose: () => void, showLoginModal: boolean }) => {
    return (
        // <div className="absolute top-32 transform -translate-x-1/2 flex flex-col space-y-4 -translate-y-1/2 p-5 rounded-lg shadow-md z-50">
        //     <h2></h2>
        //     <p></p>
        //     <button onClick={() => signIn("google")}>Login with Google</button>
        //     <button onClick={onClose}>Close</button>
        // </div>

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
                <Button onClick={() => signIn("google")}>Login with Google</Button>
            </DialogContent>
        </Dialog>
    );
};