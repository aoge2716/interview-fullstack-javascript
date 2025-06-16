import { useState, useEffect } from 'react';
import { City } from '../types/City';

type Props = {
  onSubmit: () => void;
  initialData?: City | null;
};

export default function CityForm({ onSubmit, initialData }: Props) {
  const [uuid, setUuid] = useState('');
  const [cityName, setCityName] = useState('');
  const [count, setCount] = useState<number>(0);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (initialData) {
      setUuid(initialData.uuid);
      setCityName(initialData.cityName);
      setCount(initialData.count);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData
      ? `${API_URL}/cities/${initialData._id}`
      : `${API_URL}/cities`;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid, cityName, count }),
    });

    if (res.ok) {
      setUuid('');
      setCityName('');
      setCount(0);
      onSubmit();
    } else {
      console.error('Failed to save city');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>{initialData ? 'Edit City' : 'Add New City'}</h3>
      <input
        type="text"
        placeholder="UUID"
        value={uuid}
        onChange={(e) => setUuid(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="City Name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Count"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
        required
      />
      <button type="submit">{initialData ? 'Update' : 'Add'} City</button>
    </form>
  );
}
