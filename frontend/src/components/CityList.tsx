import { City } from '../types/City';

type Props = {
  cities: City[];
};

export default function CityList({ cities }: Props) {
  return (
    <ul>
      {cities.map((city) => (
        <li key={city._id}>
          {city.cityName} — Count: {city.count}
        </li>
      ))}
    </ul>
  );
}
