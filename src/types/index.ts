export type TApartment = {
    is_promoted: boolean;
    is_top_promoted: boolean;
    currency: string;
    vr_link: null;
    additional_info: {
      bathrooms: number;
      rooms: number;
      floor: {
        on_the: number;
        out_of: number;
      };
      area: {
        garden: null | number;
        field: null | number;
        base: number;
      };
      parking: {
        aboveground: string;
        underground: string;
      };
    };
    price: number;
    search_option: string;
    property_type: string;
    images?: {gallery: string, thumbnail : string}[];
    address: {
      ru: null;
      fr: null;
      tags: any[];
      he: {
        country_name: string;
        city_name: string;
        house_number: string;
        street_name: string;
        neighborhood: string;
      };
      location: {
        lat: number;
        lon: number;
      };
      en: {
        country_name: string;
        city_name: string;
        house_number: string;
        street_name: string;
        neighborhood: string;
      };
      place_id: string;
    };
    id: string;
    search_date: Date;
    created_at: Date;
    thumbnail: null | string;
  };