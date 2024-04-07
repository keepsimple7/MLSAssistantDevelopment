"use client";
import Select from "react-select";
import { BUY_OPTION_PRICE_RANGE, PRICE_RANGE, RENT_OPTION_PRICE_RANGE } from "@/utilis/constants";
import React, { useState, useEffect, useMemo } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";



const PriceRange = ({ filterFunctions }) => {
  // const [price, setPrice] = useState({ value: { min: 0, max: 100000 } });
  const [minPriceOptions, setMinPriceOptions] = useState([]);
  const [maxPriceOptions, setMaxPriceOptions] = useState([]);

  // price range handler
  const handleOnChange = (value) => {
    // setPrice({ value });
    filterFunctions?.handlepriceRange([value.min || 0, value.max]);
  };
  const { minSelectedPrice, maxSelectedPrice } = useMemo(() => ({
    minSelectedPrice: minPriceOptions?.find(min => filterFunctions.priceRange[0] == min.value) || '',
    maxSelectedPrice: minPriceOptions?.find(max => filterFunctions.priceRange[1] == max.value) || ''
  }), [filterFunctions?.priceRange])

  useEffect(() => {
    if (filterFunctions.listingStatus.label === "Rent") {
      setMinPriceOptions(RENT_OPTION_PRICE_RANGE);
      setMaxPriceOptions(RENT_OPTION_PRICE_RANGE);
    } else {
      // Buy or All
      setMinPriceOptions(BUY_OPTION_PRICE_RANGE);
      setMaxPriceOptions(BUY_OPTION_PRICE_RANGE);
    }
  }, [filterFunctions.listingStatus.value]);

  useEffect(() => {
    if (minSelectedPrice) {
      const index = minPriceOptions?.findIndex(min => minSelectedPrice == min)
      const newMaxPriceListingOption = [...minPriceOptions]
      setMaxPriceOptions(newMaxPriceListingOption?.splice(index, newMaxPriceListingOption?.length))

    }
  }, [minSelectedPrice])

  return (
    <>
      <div className="range-wrapper row">
        <div className="col-6 col-md-6">
          <label htmlFor="" className="text-start p0">Minimum</label>
          <Select
            options={minPriceOptions}
            onChange={(selectedOption) => handleOnChange({ min: selectedOption.value, max: filterFunctions.priceRange[1] })}
            className="select-custom"
            value={minSelectedPrice}
            classNamePrefix="select"
            isSearchable={false}
            required
          />
        </div>
        <div className="col-6 col-md-6">
          <label htmlFor="" className="text-start p0">Maximum</label>
          <Select
            options={maxPriceOptions}
            onChange={(selectedOption) => handleOnChange({ min: filterFunctions.priceRange[0], max: selectedOption.value })}
            className="select-custom"
            value={maxSelectedPrice}

            classNamePrefix="select"
            isSearchable={false}
            required
          />
        </div>
      </div>
    </>
  );
};

export default PriceRange;
