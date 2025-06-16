import { useEffect, useState } from "react";
import { City } from "../types/City";

type Props = {
  initialData: City | null;
  onSubmit: () => void;
};

export default function CityForm({ initialData, onSubmit }: Props) {
  const [uuid, setUuid] = useState('');
  const [cityName, setCityName] = useState('');
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (initialData) {
      setUuid(initialData.uuid);
      setCityName(initialData.cityName);
      setCount(initialData.count);
    } else {
      setUuid('');
      setCityName('');
      setCount(0);
    }
  }, [initialData]);

  const isEdit = !!initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEdit
      ? `${import.meta.env.VITE_API_URL}/cities/${initialData!._id}`
      : `${import.meta.env.VITE_API_URL}/cities`;

    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid, cityName, count }),
    });

    if (res.ok) {
      onSubmit();
    } else {
      console.error(`${isEdit ? 'Update' : 'Add'} failed`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>{isEdit ? 'Edit City' : 'Add New City'}</h3>
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
      <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
      {isEdit && (
        <button
          type="button"
          onClick={() => onSubmit()}
          style={{ marginLeft: '1rem' }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
