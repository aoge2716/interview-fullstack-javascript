import express from 'express';
import City from '../models/City';
import { Request, Response } from 'express';

const router = express.Router();

// GET /cities?search=ber&page=1
router.get('/', async (req, res) => {
  const search = req.query.search?.toString() || '';
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 5;

  try {
    const query = {
      cityName: { $regex: search, $options: 'i' }, // case-insensitive match
    };

    const cities = await City.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const total = await City.countDocuments(query);

    res.json({
      page,
      totalPages: Math.ceil(total / pageSize),
      results: cities,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

// POST /cities
router.post('/', async (req, res) => {
  try{
    const{ uuid, cityName, count } = req.body;
    const newCity = await City.create({ uuid, cityName, count});
    res.status(201).json(newCity);
  } catch (err){
    res.status(500).json({error: 'failed to add city'})
  }
});

// PUT /cities:id
router.put('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try{
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCity) return res.status(404).json({ error: 'City not found' });
    res.json(updatedCity);
  } catch (err) {
      res.status(500).json({ error: 'Failed to update city' });
  }
});

// DELETE /cities/:id
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const deleted = await City.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'City not found' });
    res.json({ message: 'City deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete city' });
  }
});

export default router;
