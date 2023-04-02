import React, { useState, useEffect } from "react";
import axios from "axios";
import "./APInueva.css";
import Pagination from "react-js-pagination";

const API_URL = "https://dog.ceo/api/breeds/image/random/";

function DogImages() {
  const [images, setImages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(1);

  useEffect(() => {
    axios
      .get(`${API_URL}50`)
      .then((response) => {
        setImages(response.data.message);
        setItemsCountPerPage(1);
        setTotalItemsCount(response.data.message.length);
      })
      .catch((error) => {
        console.error("Error fetching dog images: ", error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastImage = activePage * itemsCountPerPage;
  const indexOfFirstImage = indexOfLastImage - itemsCountPerPage;
  const currentImage = images.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <div className="container">
      <h1>Perritos Bonitos</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {currentImage.map((image, index) => (
            <div key={index}>
              <img src={image} alt="Dog" className="img-fluid" />
            </div>
          ))}
        </div>
      </div>
      <div className="pagination justify-content-center">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="Primero"
          lastPageText="Ultimo"
        />
      </div>
    </div>
  );
}

export default DogImages;
