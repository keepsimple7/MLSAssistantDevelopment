import PropertyCard from "@/components/common/PropertyCard";
import SharePropertyModal from "@/components/menu/SharePropertyModal";
import { useAppContext } from "@/custom-hooks/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ContentLoader from 'react-content-loader'

const FeaturedListings = ({
  data,
  colstyle,
  listings,
  handleClickProperty,
  loading
}) => {
  const router = useRouter();
  const { handleGetLikedProperty } = useAppContext();
  const handleClickPropertyButton = (listing) => {
    router.replace(
      `/properties?propertyAddress=${listing.UnparsedAddress?.replaceAll(
        " ",
        "-"
      )}__${listing.ListingKey}`
    );
    handleClickProperty(listing);
  };
  return (
    <>
      {listings
        .filter((listing) => listing.Media && listing.Media.length > 0)
        .map((listing) => {
          const isLiked = handleGetLikedProperty(listing?.ListingKey);
          return (
            <div
              className={` ${
                colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-6"
              } mb-4`}
              key={listing.id} // Unique key prop added here
            > 
              <PropertyCard
                handleClickProperty={handleClickPropertyButton}
                listing={listing}
              />
            </div>
          );
        })}
    </>
  );
};

export default FeaturedListings;
