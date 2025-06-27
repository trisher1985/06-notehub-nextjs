import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query";
  import { fetchNoteById } from "@/lib/api";
  import NoteDetailsClient from "./NoteDetails.client";
  
  interface NoteDetailsProps {
    params: Promise<{ id: string }>;
  };
  
  export default async function NoteDetails({params} : NoteDetailsProps) {
    const { id } = await params;
    const noteId = parseInt(id); // Конвертуємо id в число один раз
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery({
      queryKey: ["note", noteId], // Використовуємо числовий noteId у queryKey
      queryFn: () => fetchNoteById(noteId),
    });
  
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    );
  };