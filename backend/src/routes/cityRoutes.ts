import express from 'express';
import City from '../models/City';

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

export default router;
