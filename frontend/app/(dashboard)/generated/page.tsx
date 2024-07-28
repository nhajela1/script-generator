'use client'

import { useQuery } from '@tanstack/react-query'
import ScriptsTable from "@/components/scripts-table";
import { getGeneratedScripts } from '@/app/api/scriptService'
import { useAuth } from '@/hooks/auth';

export default function GeneratedScriptsPage() {

    const { getCurrentUser } = useAuth();

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: async () => await getCurrentUser(),
    })
    
    const { data: scripts, isLoading, error } = useQuery({
        queryKey: ['scripts'],
        queryFn: async () => await getGeneratedScripts(user?.id!),
        enabled: !!user
    })

    return (
        <main className="py-5">
            <section className="px-3 md:px-7">
                <ScriptsTable scripts={scripts} isLoading={isLoading} error={error} />
            </section>
        </main>
    )
}