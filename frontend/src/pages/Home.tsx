import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import CityList from '../components/CityList';
import Pagination from '../components/Pagination';
import { City } from '../types/City';
import AddCityForm from '../components/AddCityForm';

export default function Home() {
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCities = async () => {
    const res = await fetch(`${API_URL}/cities?search=${search}&page=${page}`);
    const data = await res.json();
    setCities(data.results);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchCities();
  }, [search, page]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>City Search</h1>
      <AddCityForm onCityAdded={() => {
        fetchCities();
        setPage(1);
      }} />

      <SearchBar value={search} onChange={(val) => {
        setPage(1);
        setSearch(val);
      }} />
      <CityList cities={cities} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
