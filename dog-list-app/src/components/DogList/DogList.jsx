import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./DogList.module.css";

const DogList = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange   
 = (event) =>
    setSearchTerm(event.target.value);

  const filteredDogs = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dogapi.io/api/v2/breeds"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dogs!");
        }

        const data = await response.json();
        setDogs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDogs();
  }, []);

  if (loading) return <p>Loading dogs...</p>;
  if (error) return <p>Error loading dogs: {error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search for dog breed"
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      <div className={styles.dogsGrid}>
        {filteredDogs.map((dog) => (
          <Link
            to={`/dog/${dog.name}`}
            key={dog.id}
            className={styles.dogCard}
          >
            <img
              src={dog.image.url}
              alt={`Image of ${dog.name}`}
              className={styles.dogImage}
            />
            <h2 className={styles.dogName}>{dog.name}</h2>
            <p className={styles.dogTemperament}>{dog.temperament}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DogList;