"use client"

import { ApiResponse } from "@/types/ApiResponse";
import { UtilityProps } from "@/types/UtilityProps";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { IoMdCopy } from "react-icons/io";
import { RiDeleteBin3Line } from "react-icons/ri";
import { toast } from "sonner";

export default function Utility({ aiResponse, id }: UtilityProps) {
    const router = useRouter();
    const copyToClipboard = () => {
        if (!aiResponse) return;
        navigator.clipboard.writeText(aiResponse);
        toast.success('Text copied to clipboard')
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete<ApiResponse>('/api/interaction/delete', { data: { id } });
            toast.success(response.data.message ?? 'Interaction deleted successfully')
            router.refresh()
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data?.message ?? 'Failed to delete interaction')
        }
    }

    return (
        <>
            <button onClick={copyToClipboard} className="hover:scale-110 transition-all"><IoMdCopy className='w-3 h-3' /></button>
            <button onClick={handleDelete} className="hover:scale-110 transition-all"><RiDeleteBin3Line className='w-3 h-3' /></button>
        </>
    )
}