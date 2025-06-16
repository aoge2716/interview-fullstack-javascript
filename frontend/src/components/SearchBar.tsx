type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search for a city..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
