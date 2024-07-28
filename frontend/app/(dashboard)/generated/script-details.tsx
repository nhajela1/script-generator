"use client"

import { useQuery } from '@tanstack/react-query';
import { 
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogCancel, 
    AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { getScriptDetails } from '../../api/scriptService';

interface ScriptDetailsProps {
  scriptId: string;
}

export function ScriptDetails({ scriptId }: ScriptDetailsProps) {
  const { data: scriptDetails, isLoading } = useQuery({
    queryKey: ['scriptDetails', scriptId],
    queryFn: async () => await getScriptDetails(scriptId),
    enabled: !!scriptId
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">View Script Details</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Script Details</AlertDialogTitle>
        </AlertDialogHeader>
            {
                isLoading ? <p>Loading script details...</p> :
                <div>
                <p>Title: {scriptDetails.title}</p>
                <p>Description: {scriptDetails.script_text}</p>
                <p>Genre: {scriptDetails.genre}</p>
                <p>Clip Length: {scriptDetails.clipLength}</p>
                {/* Add more script details as needed */}
                </div>

            }
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
