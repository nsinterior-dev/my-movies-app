import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/utils/startMongo';
import { ObjectId } from 'mongodb';

export function apiRequestHandler(collectionName: string) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const client = await clientPromise;
      const db = client.db('test-account');
      const collection = db.collection(collectionName);

      const trimmedCollectionName = collectionName.endsWith('s')
        ? collectionName.slice(0, -1)
        : collectionName;

      const { id } = req.query; // Check if an `id` is provided in the query

      if (req.method === 'GET') {
        if (id) {
          // Fetch a single document by ID
          const document = await collection.findOne({ _id: new ObjectId(id as string) });
          if (!document) {
            res.status(404).json({ message: `${trimmedCollectionName} not found` });
          } else {
            res.status(200).json(document);
          }
        } else {
          // Fetch all documents
          const documents = await collection.find({}).toArray();
          res.status(200).json(documents);
        }
      } else if (req.method === 'POST') {
        if (id) {
          res.status(400).json({ message: 'POST request should not include an ID' });
        } else {
          const body = req.body;
          const result = await collection.insertOne(body);
          res.status(201).json(result);
        }
      } else if (req.method === 'DELETE') {
        if (!id) {
          res.status(400).json({ message: 'DELETE request must include an ID' });
        } else {
          const result = await collection.deleteOne({ _id: new ObjectId(id as string) });
          if (result.deletedCount === 0) {
            res.status(404).json({ message: `${trimmedCollectionName} not found` });
          } else {
            res.status(200).json({ message: `${trimmedCollectionName} deleted successfully` });
          }
        }
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  };
}