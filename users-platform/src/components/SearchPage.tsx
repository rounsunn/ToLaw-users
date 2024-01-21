import { useState, useEffect, ChangeEvent } from "react";
import { defaultLawyers } from "../interface/defaultValues";
import { LawyerInterface } from "../interface/lawyerSchema";
import { Button, Form } from "react-bootstrap";
import DisplayLawyers from "./DisplayLawyers";
import searchLawyersData from "../data/searchLawyersData";

function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  const [search, setsearch] = useState("");

  const handlesearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };
  const handleSearch = () => {
    onSearch(search);
    setsearch("");
  };

  return (
    <div className="d-flex flex-row align-items-center justify-content-around  mx-3">
      <Form className="">
        <Form.Group controlId="searchBar">
          <Form.Control
            type="text"
            placeholder="Search lawyers..."
            onChange={handlesearchChange}
            value={search}
          />
        </Form.Group>
      </Form>
      <Button onClick={handleSearch} className="btn btn-primary">
        Submit
      </Button>
    </div>
  );
}

const SearchPage = () => {
  const [search, setsearch] = useState("*");
  const [lawyersData, setLawyersData] = useState(defaultLawyers);

  useEffect(() => {
    if (search.length > 0) {
      async function fetchData() {
        const data: LawyerInterface[] = await searchLawyersData(search);
        setLawyersData(data);
        console.log(lawyersData);
      }
      console.log("hi");
      fetchData();
    }
  }, [search]);

  const handleLawyersSearch = (term: string) => {
    setsearch(term);
  };

  return (
    <>
      <SearchBar onSearch={handleLawyersSearch} />
      {search && search.length > 0 && (
        <DisplayLawyers lawyersData={lawyersData} />
      )}
    </>
  );
};

export default SearchPage;
