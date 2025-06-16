import { useState } from "react";

type Props = {
  onCityAdded: () => void;
};

export default function AddCityForm({ onCityAdded }: Props){
  const [uuid, setUuid] = useState('');
  const [cityName, setCityName] = useState('');
  const [count, setCount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/cities`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid, cityName, count }),
    });

    if(res.ok){
      setUuid('');
      setCityName('');
      setCount(0);
      onCityAdded();
    } else {
      console.error('Failed to add city');
    }
  };

  return(
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Add New City</h3>
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
      <button type="submit">Add City</button>
    </form>
  )
}