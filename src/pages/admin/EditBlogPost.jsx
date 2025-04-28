import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '@/firebase-config';

export default function EditBlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'blogPosts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'blogPosts', id);
    await updateDoc(docRef, post);
    alert('פוסט עודכן בהצלחה!');
  };

  if (loading) return <p>טוען...</p>;
  if (!post) return <p>פוסט לא נמצא.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">עריכת פוסט</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="כותרת בעברית"
          value={post.title_he}
          onChange={(e) => setPost({ ...post, title_he: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Title in English"
          value={post.title_en}
          onChange={(e) => setPost({ ...post, title_en: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="תוכן בעברית"
          value={post.content_he}
          onChange={(e) => setPost({ ...post, content_he: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Content in English"
          value={post.content_en}
          onChange={(e) => setPost({ ...post, content_en: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          עדכן פוסט
        </button>
      </form>
    </div>
  );
}
