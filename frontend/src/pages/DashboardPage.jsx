import MainLayout from '../components/layout/MainLayout';
import NoteList from '../features/notes/components/NoteList';
import NoteForm from '../features/notes/components/NoteForm';
import TagForm from '../features/tags/components/TagForm';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Colonne de gauche (Formulaires) */}
        <div className="md:col-span-1 space-y-8">
            <div className="bg-white p-6 shadow-sm border border-gray-200 rounded">
                <TagForm />
            </div>
            
            <div className="bg-white p-6 shadow-sm border border-gray-200 rounded">
                <NoteForm />
            </div>
        </div>
        
        {/* Colonne de droite (Liste) */}
        <div className="md:col-span-2 bg-white p-6 shadow-sm border border-gray-200 rounded">
            <NoteList />
        </div>

      </div>
    </MainLayout>
  );
}
