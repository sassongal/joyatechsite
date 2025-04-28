import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';

export default function CreateBlogPost() {
  const [titleHe, setTitleHe] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [contentHe, setContentHe] = useState('');
  const [contentEn, setContentEn] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'blogPosts'), {
        title_he: titleHe,
        title_en: titleEn,
        content_he: contentHe,
        content_en: contentEn,
        published: false,
        publish_date: new Date().toISOString().split('T')[0] // תאריך היום
      });

      alert('פוסט נוצר בהצלחה!');
      setTitleHe('');
      setTitleEn('');
      setContentHe('');
      setContentEn('');
    } catch (error) {
      console.error('שגיאה ביצירת פוסט:', error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">צור פוסט חדש</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="כותרת בעברית"
          value={titleHe}
          onChange={(e) => setTitleHe(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Title in English"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="תוכן בעברית"
          value={contentHe}
          onChange={(e) => setContentHe(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Content in English"
          value={contentEn}
          onChange={(e) => setContentEn(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          שמור פוסט
        </button>
      </form>
    </div>
  );
}
