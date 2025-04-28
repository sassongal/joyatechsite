import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { Link } from 'react-router-dom';

export default function BlogPosts() {
  const [value, loading, error] = useCollection(collection(db, 'blogPosts'));

  if (loading) return <p>טוען...</p>;
  if (error) return <p>שגיאה: {error.message}</p>;

  const handleDelete = async (id) => {
    if (confirm('האם אתה בטוח שברצונך למחוק פוסט זה?')) {
      await deleteDoc(doc(db, 'blogPosts', id));
    }
  };

  const togglePublished = async (id, currentStatus) => {
    await updateDoc(doc(db, 'blogPosts', id), {
      published: !currentStatus,
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">פוסטים בבלוג</h1>
        <Link
          to="/admin/blogs/create"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          צור פוסט חדש
        </Link>
      </div>

      <ul className="space-y-4">
        {value?.docs.map((doc) => {
          const data = doc.data();
          return (
            <li key={doc.id} className="border p-4 rounded flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{data.title_he} / {data.title_en}</h2>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/blogs/edit/${doc.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    ערוך
                  </Link>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-600 hover:underline"
                  >
                    מחק
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">סטטוס:</span>
                <button
                  onClick={() => togglePublished(doc.id, data.published)}
                  className={`py-1 px-3 rounded ${
                    data.published ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
                  }`}
                >
                  {data.published ? 'פורסם' : 'טיוטה'}
                </button>
              </div>
              <p className="text-gray-600">{data.publish_date}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
