// src/admin/hooks/useFirestore.js
import { useState, useCallback } from 'react';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  where, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/firebase-config';
import { useAuth } from './useAuth';

export function useFirestore(collectionName) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all documents
  const getAll = useCallback(async (options = {}) => {
    setLoading(true);
    setError(null);
    try {
      let q = collection(db, collectionName);
      
      const constraints = [];
      
      if (options.orderByField) {
        constraints.push(orderBy(options.orderByField, options.orderDirection || 'desc'));
      }
      
      if (options.whereField && options.whereOperator && options.whereValue !== undefined) {
        constraints.push(where(options.whereField, options.whereOperator, options.whereValue));
      }
      
      if (options.limitTo) {
        constraints.push(limit(options.limitTo));
      }
      
      if (constraints.length > 0) {
        q = query(q, ...constraints);
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Get single document
  const getById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Create document
  const create = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const docData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(db, collectionName), docData);
      
      // Log activity
      await addDoc(collection(db, 'activityLogs'), {
        userId: user?.uid,
        userEmail: user?.email,
        action: 'create',
        collection: collectionName,
        documentId: docRef.id,
        documentTitle: data.title_he || data.name_he || data.name || docRef.id,
        createdAt: serverTimestamp(),
      });
      
      return { id: docRef.id, ...docData };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName, user]);

  // Update document
  const update = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };
      
      await updateDoc(docRef, updateData);
      
      // Log activity
      await addDoc(collection(db, 'activityLogs'), {
        userId: user?.uid,
        userEmail: user?.email,
        action: 'update',
        collection: collectionName,
        documentId: id,
        documentTitle: data.title_he || data.name_he || data.name || id,
        createdAt: serverTimestamp(),
      });
      
      return { id, ...updateData };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName, user]);

  // Delete document
  const remove = useCallback(async (id, title = '') => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      
      // Log activity
      await addDoc(collection(db, 'activityLogs'), {
        userId: user?.uid,
        userEmail: user?.email,
        action: 'delete',
        collection: collectionName,
        documentId: id,
        documentTitle: title || id,
        createdAt: serverTimestamp(),
      });
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName, user]);

  return {
    loading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
  };
}

export default useFirestore;
