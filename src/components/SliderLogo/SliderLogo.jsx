import React from "react";
import "./style.css";

import sdg1 from "../../assets/odsIcons/1.png";
import sdg2 from "../../assets/odsIcons/2.webp"; // Corrigido para .webp
import sdg3 from "../../assets/odsIcons/3.png";
import sdg4 from "../../assets/odsIcons/4.webp"; // Corrigido para .webp
import sdg5 from "../../assets/odsIcons/5.png";
import sdg6 from "../../assets/odsIcons/6.png";
import sdg7 from "../../assets/odsIcons/7.png";
import sdg8 from "../../assets/odsIcons/8.png";
import sdg9 from "../../assets/odsIcons/9.png";
import sdg10 from "../../assets/odsIcons/10.webp"; // Corrigido para .webp
import sdg11 from "../../assets/odsIcons/11.png";
import sdg12 from "../../assets/odsIcons/12.png";
import sdg13 from "../../assets/odsIcons/13.png";
import sdg14 from "../../assets/odsIcons/14.png";
import sdg15 from "../../assets/odsIcons/15.webp"; // Corrigido para .webp
import sdg16 from "../../assets/odsIcons/16.webp"; // Corrigido para .webp
import sdg17 from "../../assets/odsIcons/17.png";

export default function SliderLogo(props) {
  const images = [
    sdg1, sdg2, sdg3, sdg4, sdg5, sdg6, sdg7, sdg8, 
    sdg9, sdg10, sdg11, sdg12, sdg13, sdg14, sdg15, sdg16, sdg17
  ];

  return (
    <>
      <div className="logo-slider">
        <div className="logo-slide-track">
          {images.map((image, index) => (
            <div className="slide" key={index}>
              <img src={image} alt={`ODS ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}