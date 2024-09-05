import { RESTDataSource } from "@apollo/datasource-rest";
import { Amenity, Listing, CreateListingInput } from "../types";
export class ListingAPI extends RESTDataSource {
  
  baseURL = "https://rt-airlock-services-listing.herokuapp.com/featured-listings";
  
async getFeaturedListings(): Promise<Listing[]> {
  const listings =  await this.get<Listing[]>("featured-listings");
  // for each listing ID, request this.get<Amenity[]>(`listings/{id}/amenities`)
  // Then map each set of amenities back to its listing
  return listings;
}
    
getListing(listingId: string): Promise<Listing> {
    return this.get<Listing>(`listings/${listingId}`);
  }
  getAmenities(listingId: string): Promise<Amenity[]> {
    console.log("Making a follow-up call for amenities with ", listingId);
    return this.get<Amenity[]>(`listings/${listingId}/amenities`)
  }
  createListing(listing: CreateListingInput): Promise<Listing> {
    return this.post("listings", {
      body: {
        listing
      }
    });
  }
}