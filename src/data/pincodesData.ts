export interface PincodeRecord {
  pincode: string;
  officeName: string;
  district: string;
  state: string;
  division: string;
  deliveryStatus: 'Delivery' | 'Non-Delivery';
  circle: string;
}

export const POPULAR_PINCODES: PincodeRecord[] = [
  // Delhi
  { pincode: '110001', officeName: 'Connaught Place H.O', district: 'New Delhi', state: 'Delhi', division: 'New Delhi Central', deliveryStatus: 'Delivery', circle: 'Delhi' },
  { pincode: '110006', officeName: 'Chandni Chowk S.O', district: 'Central Delhi', state: 'Delhi', division: 'Delhi North', deliveryStatus: 'Delivery', circle: 'Delhi' },
  { pincode: '110016', officeName: 'Hauz Khas S.O', district: 'South Delhi', state: 'Delhi', division: 'Delhi South', deliveryStatus: 'Delivery', circle: 'Delhi' },
  { pincode: '110020', officeName: 'Okhla Industrial Area S.O', district: 'South Delhi', state: 'Delhi', division: 'Delhi South', deliveryStatus: 'Delivery', circle: 'Delhi' },
  { pincode: '110075', officeName: 'Dwarka Sector 6 S.O', district: 'South West Delhi', state: 'Delhi', division: 'Delhi South West', deliveryStatus: 'Delivery', circle: 'Delhi' },
  
  // Mumbai
  { pincode: '400001', officeName: 'Mumbai G.P.O', district: 'Mumbai', state: 'Maharashtra', division: 'Mumbai GPO', deliveryStatus: 'Delivery', circle: 'Maharashtra' },
  { pincode: '400050', officeName: 'Bandra West S.O', district: 'Mumbai Suburban', state: 'Maharashtra', division: 'Mumbai West', deliveryStatus: 'Delivery', circle: 'Maharashtra' },
  { pincode: '400051', officeName: 'Bandra Kurla Complex (BKC) S.O', district: 'Mumbai Suburban', state: 'Maharashtra', division: 'Mumbai West', deliveryStatus: 'Delivery', circle: 'Maharashtra' },
  { pincode: '400076', officeName: 'Powai I.I.T S.O', district: 'Mumbai Suburban', state: 'Maharashtra', division: 'Mumbai East', deliveryStatus: 'Delivery', circle: 'Maharashtra' },
  { pincode: '400092', officeName: 'Borivali West S.O', district: 'Mumbai Suburban', state: 'Maharashtra', division: 'Mumbai West', deliveryStatus: 'Delivery', circle: 'Maharashtra' },

  // Bengaluru
  { pincode: '560001', officeName: 'Bengaluru G.P.O', district: 'Bengaluru Urban', state: 'Karnataka', division: 'Bangalore East', deliveryStatus: 'Delivery', circle: 'Karnataka' },
  { pincode: '560034', officeName: 'Koramangala VI Block S.O', district: 'Bengaluru Urban', state: 'Karnataka', division: 'Bangalore South', deliveryStatus: 'Delivery', circle: 'Karnataka' },
  { pincode: '560038', officeName: 'Indiranagar S.O', district: 'Bengaluru Urban', state: 'Karnataka', division: 'Bangalore East', deliveryStatus: 'Delivery', circle: 'Karnataka' },
  { pincode: '560066', officeName: 'Whitefield S.O', district: 'Bengaluru Urban', state: 'Karnataka', division: 'Bangalore East', deliveryStatus: 'Delivery', circle: 'Karnataka' },
  { pincode: '560100', officeName: 'Electronic City S.O', district: 'Bengaluru Urban', state: 'Karnataka', division: 'Bangalore South', deliveryStatus: 'Delivery', circle: 'Karnataka' },

  // Kolkata
  { pincode: '700001', officeName: 'Kolkata G.P.O', district: 'Kolkata', state: 'West Bengal', division: 'Kolkata GPO', deliveryStatus: 'Delivery', circle: 'West Bengal' },
  { pincode: '700091', officeName: 'Salt Lake Sector V S.O', district: 'North 24 Parganas', state: 'West Bengal', division: 'Barasat', deliveryStatus: 'Delivery', circle: 'West Bengal' },
  { pincode: '700029', officeName: 'Gariahat S.O', district: 'Kolkata', state: 'West Bengal', division: 'Kolkata South', deliveryStatus: 'Delivery', circle: 'West Bengal' },

  // Chennai
  { pincode: '600001', officeName: 'Chennai G.P.O', district: 'Chennai', state: 'Tamil Nadu', division: 'Chennai City North', deliveryStatus: 'Delivery', circle: 'Tamil Nadu' },
  { pincode: '600017', officeName: 'T. Nagar S.O', district: 'Chennai', state: 'Tamil Nadu', division: 'Chennai City Central', deliveryStatus: 'Delivery', circle: 'Tamil Nadu' },
  { pincode: '600036', officeName: 'IIT Madras S.O', district: 'Chennai', state: 'Tamil Nadu', division: 'Chennai City South', deliveryStatus: 'Delivery', circle: 'Tamil Nadu' },

  // Hyderabad
  { pincode: '500001', officeName: 'Hyderabad G.P.O', district: 'Hyderabad', state: 'Telangana', division: 'Hyderabad City', deliveryStatus: 'Delivery', circle: 'Telangana' },
  { pincode: '500081', officeName: 'HITEC City Madhapur S.O', district: 'K.V.Rangareddy', state: 'Telangana', division: 'Hyderabad South East', deliveryStatus: 'Delivery', circle: 'Telangana' },

  // Ahmedabad, Pune, Jaipur, Lucknow
  { pincode: '380001', officeName: 'Ahmedabad G.P.O', district: 'Ahmedabad', state: 'Gujarat', division: 'Ahmedabad City', deliveryStatus: 'Delivery', circle: 'Gujarat' },
  { pincode: '411001', officeName: 'Pune G.P.O', district: 'Pune', state: 'Maharashtra', division: 'Pune City', deliveryStatus: 'Delivery', circle: 'Maharashtra' },
  { pincode: '302001', officeName: 'Jaipur G.P.O', district: 'Jaipur', state: 'Rajasthan', division: 'Jaipur City', deliveryStatus: 'Delivery', circle: 'Rajasthan' },
  { pincode: '226001', officeName: 'Lucknow G.P.O', district: 'Lucknow', state: 'Uttar Pradesh', division: 'Lucknow', deliveryStatus: 'Delivery', circle: 'Uttar Pradesh' },
  { pincode: '800001', officeName: 'Patna G.P.O', district: 'Patna', state: 'Bihar', division: 'Patna', deliveryStatus: 'Delivery', circle: 'Bihar' },
  { pincode: '781001', officeName: 'Guwahati G.P.O', district: 'Kamrup', state: 'Assam', division: 'Guwahati', deliveryStatus: 'Delivery', circle: 'Assam' },
];

export function searchPincodes(query: string): PincodeRecord[] {
  const q = query.toLowerCase().trim();
  if (!q) return POPULAR_PINCODES.slice(0, 10);
  return POPULAR_PINCODES.filter((p) =>
    p.pincode.includes(q) ||
    p.officeName.toLowerCase().includes(q) ||
    p.district.toLowerCase().includes(q) ||
    p.state.toLowerCase().includes(q)
  );
}
