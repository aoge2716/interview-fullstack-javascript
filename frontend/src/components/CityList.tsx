import { City } from '../types/City';

type Props = {
  cities: City[];
  onDelete: (id: string) => void;
  onEdit: (city: City) => void;
};

export default function CityList({ cities, onDelete, onEdit }: Props) {
  return (
    <ul>
      {cities.map((city) => (
        <li key={city._id}>
          {city.cityName} — Count: {city.count}
          <button onClick={() => onEdit(city)} style={{ marginLeft: '1rem' }}>Edit</button>
          <button onClick={() => onDelete(city._id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
