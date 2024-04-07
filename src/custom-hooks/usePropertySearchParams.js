import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const conversionList = [
  "itemsPerPage",
  "pageNumber",
  "currentSortingOption",
  "listingStatus",
  "activeStatus",
  "minPriceRange",
  "maxPriceRange",
  "bedrooms",
  "bathroms",
  "address",
  "currentSortingOption",
];
function usePropertySearchParams() {
  const searchParams = useSearchParams();

  const getParamsObject = () => {

    let storedObject = typeof window !='undefined'?sessionStorage?.getItem('search') : ''
    if (storedObject) {
      storedObject = JSON.parse(storedObject)
    }
    const newParamsObject = {
      itemsPerPage: searchParams.get("itemsPerPage") || storedObject?.itemsPerPage || 10,
      pageNumber: searchParams.get("pageNumber") || storedObject?.pageNumber || 1,
      orderby: searchParams.get("orderby") || storedObject?.orderby || "Newest",
      listingStatus: searchParams.get("listingStatus") || storedObject?.listingStatus || "All",
      activeStatus: searchParams.get("activeStatus") || storedObject?.activeStatus || "Active",
      minPriceRange: searchParams.get("minPriceRange") || storedObject?.minPriceRange || 0,
      maxPriceRange: searchParams.get("maxPriceRange") || storedObject?.maxPriceRange || 0,
      bedrooms: searchParams.get("bedrooms") || storedObject?.bedrooms || 0,
      bathroms: searchParams.get("bathroms") || storedObject?.bathroms || 0,
      propertyAddress: searchParams.get("propertyAddress") || storedObject?.propertyAddress || "",
      address: searchParams.get("address") || storedObject?.address || "",
      propertyId: searchParams.get("propertyId") || storedObject?.propertyId || "",
      currentSortingOption: searchParams.get("currentSortingOption") || storedObject?.currentSortingOption || "Newest",
    }
    return newParamsObject
  };
  const [paramsObject, setParamsObject] = useState(getParamsObject());

  const convertParamsObjectToString = (incomingObject = paramsObject) => {
    const newObject = {
      ...paramsObject,
      ...incomingObject,
    };

    let string = "";
    let isFirstKey = true;

    conversionList.map((item) => {
      if (isFirstKey) {
        isFirstKey = false;
        string += `${item}=${newObject[item]}`;
      } else {
        string += `&${item}=${newObject[item]}`;
      }
    });
    return string;
  };
  const splitPropertyAddress = (name) => {
    if (name == 0) {
      return paramsObject?.propertyAddress
        ?.split("__")?.[0]
        ?.split(",")?.[1]
        ?.replaceAll("-", " ")
        ?.trim();
    }
    if (name == 1) {
      return paramsObject?.propertyAddress?.split("__")?.[1];
    }
  };

  useEffect(() => {
    setParamsObject(getParamsObject());
  }, [searchParams]);

  return {
    splitPropertyAddress,
    convertParamsObjectToString,
    conversionList,
    paramsObject: { ...paramsObject },
  };
}

export default usePropertySearchParams;
