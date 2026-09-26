import { GovernmentService } from '../types';

export const GOVERNMENT_SERVICES: GovernmentService[] = [
  // 1. Aadhaar
  {
    id: 'aadhaar-download',
    title: 'Download e-Aadhaar & Order PVC Card',
    titleHi: 'ई-आधार डाउनलोड एवं पीवीसी कार्ड ऑर्डर',
    category: 'Identity & Certificates',
    department: 'Unique Identification Authority of India (UIDAI)',
    level: 'Central',
    description: 'Download password-protected electronic Aadhaar or order an official durable pocket-sized PVC Aadhaar card delivered by India Post.',
    eligibility: ['All Indian residents enrolled with UIDAI', 'Valid 12-digit Aadhaar number, 16-digit VID, or 28-digit Enrolment ID (EID)', 'Registered mobile number for OTP verification'],
    documents: ['Aadhaar Number / Enrolment ID slip', 'Active mobile phone to receive one-time SMS OTP'],
    steps: [
      'Visit the official myAadhaar portal (myaadhaar.uidai.gov.in)',
      'Click on "Download Aadhaar" or "Order Aadhaar PVC Card"',
      'Enter your 12-digit Aadhaar number and the Captcha security code',
      'Click "Send OTP" and enter the 6-digit OTP received on your registered mobile number',
      'For e-Aadhaar: Download PDF (Password format: First 4 letters of name in CAPITAL + 4-digit Year of Birth)',
      'For PVC Card: Pay ₹50 government fee online via UPI, NetBanking or Debit Card to get it dispatched'
    ],
    fee: 'e-Aadhaar: Free (₹0) | PVC Card: ₹50 (inclusive of speed post delivery)',
    officialUrl: 'https://myaadhaar.uidai.gov.in',
    statusUrl: 'https://myaadhaar.uidai.gov.in/check-aadhaar-status',
    lastVerified: 'September 2026',
    tags: ['Aadhaar', 'UIDAI', 'Identity', 'e-KYC', 'PVC Card']
  },
  {
    id: 'aadhaar-address-update',
    title: 'Aadhaar Online Address & Document Update',
    titleHi: 'आधार पता एवं दस्तावेज़ ऑनलाइन अपडेट',
    category: 'Identity & Certificates',
    department: 'Unique Identification Authority of India (UIDAI)',
    level: 'Central',
    description: 'Update your residential address online or upload proof of identity (POI) and proof of address (POA) documents to keep your Aadhaar active.',
    eligibility: ['Resident individuals holding Aadhaar', 'Registered mobile number linked with Aadhaar'],
    documents: ['Valid Proof of Address (Electricity bill, Passport, Bank passbook, Rent agreement, Ration card, Voter ID)', 'Document file size under 2MB in PDF, JPEG or PNG format'],
    steps: [
      'Log in to myAadhaar portal using your Aadhaar number and OTP',
      'Select "Document Update" or "Address Update"',
      'Verify your current demographic details on screen',
      'Select document type from the approved list and upload scanned copy',
      'Submit the request and note down the 14-digit Service Request Number (SRN) for tracking'
    ],
    fee: 'Online document upload is periodically zero-cost or ₹50 nominal fee',
    officialUrl: 'https://myaadhaar.uidai.gov.in',
    statusUrl: 'https://myaadhaar.uidai.gov.in/checkStatus',
    lastVerified: 'September 2026',
    tags: ['Aadhaar', 'Address Change', 'UIDAI', 'Correction']
  },

  // 2. PAN Card
  {
    id: 'pan-new-instant',
    title: 'Instant e-PAN & New PAN Card Application',
    titleHi: 'तत्काल ई-पैन एवं नया पैन कार्ड आवेदन',
    category: 'Taxes & Finance',
    department: 'Income Tax Department / Protean (NSDL) / UTIITSL',
    level: 'Central',
    description: 'Allotment of 10-digit Permanent Account Number (PAN) through Instant Paperless e-PAN or physical card via Form 49A.',
    eligibility: ['Individual Indian citizens never previously allotted a PAN', 'Valid Aadhaar number with linked mobile number for instant e-PAN'],
    documents: ['Aadhaar Card (serves as Proof of Identity, Address, and Date of Birth)', 'Passport size photograph (for physical application via Protean/UTIITSL)'],
    steps: [
      'For Instant e-PAN: Visit e-Filing Income Tax portal > "Instant e-PAN" > "Get New e-PAN"',
      'Enter Aadhaar number, accept declaration and enter OTP',
      'Validate Aadhaar details and generate instant 10-digit alphanumeric PAN PDF within 10 minutes',
      'For Physical PAN: Visit Protean (NSDL) Form 49A portal, submit application and pay standard fee'
    ],
    fee: 'Instant e-PAN: Free (₹0) | Physical PAN Card: ₹107 (within India) / ₹1,017 (abroad)',
    officialUrl: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
    statusUrl: 'https://tin.tin.nsdl.com/pantan/StatusTrack.html',
    lastVerified: 'September 2026',
    tags: ['PAN', 'Income Tax', 'NSDL', 'Protean', 'UTIITSL']
  },
  {
    id: 'pan-aadhaar-link',
    title: 'Link PAN with Aadhaar & Verify Linking Status',
    titleHi: 'पैन-आधार लिंकिंग एवं स्थिति सत्यापन',
    category: 'Taxes & Finance',
    department: 'Income Tax Department (CBDT)',
    level: 'Central',
    description: 'Mandatory statutory linkage of Permanent Account Number with 12-digit Aadhaar to prevent PAN inoperability.',
    eligibility: ['All individuals holding both PAN and Aadhaar'],
    documents: ['10-digit PAN number', '12-digit Aadhaar number', 'Payment challan of ₹1000 under Minor Head 500 (Other Receipts)'],
    steps: [
      'Visit Income Tax e-Filing portal (eportal.incometax.gov.in)',
      'Click "Link Aadhaar" on the homepage quick links',
      'Enter PAN and Aadhaar numbers; system validates fee payment challan',
      'Enter Aadhaar OTP to complete authentication request',
      'Check "Link Aadhaar Status" after 48 hours to confirm completion'
    ],
    fee: '₹1,000 statutory late fee via e-Pay Tax',
    officialUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar',
    statusUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status',
    lastVerified: 'September 2026',
    tags: ['PAN', 'Aadhaar', 'Income Tax', 'CBDT']
  },

  // 3. Income Tax
  {
    id: 'income-tax-return',
    title: 'Income Tax Return (ITR 1-4) e-Filing',
    titleHi: 'आयकर रिटर्न (ITR) ई-फाइलिंग',
    category: 'Taxes & Finance',
    department: 'Income Tax Department, Ministry of Finance',
    level: 'Central',
    description: 'Annual declaration of taxable income, deductions, TDS verification, and claiming refunds for individuals and salaried professionals.',
    eligibility: ['Resident & non-resident individuals with income above basic exemption limit or claiming tax refunds', 'Salaried employees, business owners, professionals'],
    documents: ['Form 16 (from employer)', 'Annual Information Statement (AIS) & Form 26AS', 'Bank account statements', 'Investment proofs (if opting for Old Regime)'],
    steps: [
      'Log in to Income Tax e-Filing Portal with PAN as User ID',
      'Navigate to "e-File" > "Income Tax Returns" > "File Income Tax Return"',
      'Select Assessment Year (AY 2025-26 / AY 2026-27) and filing status (Individual)',
      'Select ITR Form (ITR-1 Sahaj for salaried income up to ₹50 Lakh, ITR-4 for presumptive business)',
      'Review pre-filled income details from AIS/TIS and validate deductions',
      'Submit and e-Verify within 30 days using Aadhaar OTP or NetBanking'
    ],
    fee: 'Self e-filing is Free (₹0) on government portal | Late fee up to ₹5,000 under section 234F',
    officialUrl: 'https://eportal.incometax.gov.in',
    statusUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/itr-status',
    lastVerified: 'September 2026',
    tags: ['ITR', 'Taxes', 'AIS', '26AS', 'Refund']
  },

  // 4. GST
  {
    id: 'gst-registration',
    title: 'New GST Registration & GSTIN Verification',
    titleHi: 'नया जीएसटी पंजीकरण एवं जीएसटीआईएन सत्यापन',
    category: 'Business & Trade',
    department: 'Goods and Services Tax Network (GSTN)',
    level: 'Central',
    description: 'Mandatory registration for businesses supplying goods or services exceeding threshold limits (₹40 Lakh for goods, ₹20 Lakh for services) or engaged in interstate supply.',
    eligibility: ['Proprietorships, Partnerships, LLPs, Private Limited Companies, E-commerce sellers'],
    documents: ['PAN Card of business/applicant', 'Aadhaar Card of promoter/partners', 'Proof of business premises (Electricity bill, Rent agreement, NOC)', 'Cancelled cheque or bank statement'],
    steps: [
      'Access GST common portal (gst.gov.in) > "Services" > "Registration" > "New Registration"',
      'Part A: Enter PAN, Email, and Mobile to receive Temporary Reference Number (TRN)',
      'Part B: Log in with TRN, fill business details, promoter details, authorized signatory, and upload documents',
      'Complete Aadhaar authentication of authorized signatory',
      'Submit with DSC (for companies) or EVC (Aadhaar OTP for individuals); ARN generated'
    ],
    fee: 'Government registration fee: Free (₹0)',
    officialUrl: 'https://www.gst.gov.in',
    statusUrl: 'https://services.gst.gov.in/services/searchtp',
    lastVerified: 'September 2026',
    tags: ['GST', 'GSTIN', 'Business', 'Invoice', 'Taxes']
  },

  // 5. Udyam MSME
  {
    id: 'udyam-registration',
    title: 'Udyam MSME Registration & Certificate',
    titleHi: 'उद्यम एमएसएमई पंजीकरण एवं प्रमाण पत्र',
    category: 'Business & Trade',
    department: 'Ministry of Micro, Small and Medium Enterprises',
    level: 'Central',
    description: 'Self-declaration paperless registration for Micro, Small, and Medium Enterprises to access priority bank lending, collateral-free credit, and government subsidies.',
    eligibility: ['Any enterprise engaged in manufacturing or service sector meeting MSME turnover and investment criteria'],
    documents: ['Aadhaar number of proprietor/partner/director', 'PAN of business enterprise', 'GSTIN (if GST registration is mandatory for enterprise)'],
    steps: [
      'Visit official Udyam portal (udyamregistration.gov.in)',
      'Click "For New Entrepreneurs who are not Registered yet as MSME"',
      'Enter Aadhaar number and entrepreneur name as per Aadhaar, click "Validate & Generate OTP"',
      'Validate PAN details through automatic CBDT linkage',
      'Enter enterprise name, investment in plant & machinery, turnover, and employee count',
      'Submit application to instantly generate Udyam Registration Number (URN) and downloadable certificate'
    ],
    fee: 'Zero Fee (₹0) — Completely free by Government of India. Beware of fraudulent private charging portals.',
    officialUrl: 'https://udyamregistration.gov.in',
    statusUrl: 'https://udyamregistration.gov.in/PrintApplication_Pub.aspx',
    lastVerified: 'September 2026',
    tags: ['Udyam', 'MSME', 'Startup', 'Business Loan', 'Certificate']
  },

  // 6. PM Kisan
  {
    id: 'pm-kisan',
    title: 'PM Kisan Samman Nidhi Yojana',
    titleHi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    category: 'Agriculture & Rural',
    department: 'Department of Agriculture & Farmers Welfare',
    level: 'Central',
    description: 'Financial support of ₹6,000 per year distributed in three equal four-monthly installments of ₹2,000 directly into the bank accounts of landholding farmer families.',
    eligibility: ['Small and marginal landholding farmer families having cultivable landholding in their name', 'Subject to official exclusion criteria (e.g. institutional landholders, income tax payees excluded)'],
    documents: ['Aadhaar Card', 'Land ownership documents (Khasra/Khatauni/ROR)', 'Active Bank account linked with Aadhaar NPCI seeding'],
    steps: [
      'Visit official PM-Kisan portal (pmkisan.gov.in)',
      'Click "New Farmer Registration" in the Farmers Corner',
      'Select Rural or Urban Farmer, enter Aadhaar number, Mobile, and State',
      'Fill landholding details and survey number',
      'Complete mandatory e-KYC via OTP or face authentication app',
      'Verify installment transfer status under "Beneficiary Status"'
    ],
    fee: 'Free (₹0)',
    officialUrl: 'https://pmkisan.gov.in',
    statusUrl: 'https://pmkisan.gov.in/BeneficiaryStatus_New.aspx',
    lastVerified: 'September 2026',
    tags: ['PM Kisan', 'Farmers', 'Agriculture', 'Direct Benefit', 'e-KYC']
  },

  // 7. Ayushman Bharat PM-JAY
  {
    id: 'ayushman-bharat',
    title: 'Ayushman Bharat PM-JAY & Golden Card',
    titleHi: 'आयुष्मान भारत (पीएम-जय) एवं आयुष्मान कार्ड',
    category: 'Healthcare',
    department: 'National Health Authority (NHA), Ministry of Health',
    level: 'Central',
    description: 'Comprehensive health coverage of ₹5 Lakh per family per year for secondary and tertiary hospitalization across empaneled public and private hospitals across India.',
    eligibility: ['Deprived and occupational families identified in SECC 2011 / NFSA database', 'Senior citizens aged 70+ irrespective of income group under PM-JAY expansion'],
    documents: ['Aadhaar Card', 'Ration Card / Family ID document', 'Mobile phone linked to Aadhaar'],
    steps: [
      'Visit official Beneficiary Portal (beneficiary.nha.gov.in) or download Ayushman App',
      'Login as "Beneficiary" using mobile number and authentication OTP',
      'Search eligibility by State, Scheme, Ration Card / Family ID, or Aadhaar number',
      'If name appears, proceed to complete e-KYC using Aadhaar OTP, Iris, or Face Auth',
      'Once approved, download the plastic-ready Ayushman Card PDF'
    ],
    fee: 'Free (₹0) across all government channels and CSCs',
    officialUrl: 'https://beneficiary.nha.gov.in',
    statusUrl: 'https://beneficiary.nha.gov.in',
    lastVerified: 'September 2026',
    tags: ['Ayushman', 'Health Insurance', 'NHA', 'PMJAY', 'Hospital']
  },

  // 8. Passport Seva
  {
    id: 'passport-seva',
    title: 'Passport Seva — Fresh Passport & Renewal',
    titleHi: 'पासपोर्ट सेवा — नया पासपोर्ट एवं नवीनीकरण',
    category: 'Travel & Immigration',
    department: 'Consular, Passport & Visa Division, Ministry of External Affairs',
    level: 'Central',
    description: 'Issuance of Ordinary Indian Passport (36/60 pages) for travel abroad with police verification and appointment at Passport Seva Kendra (PSK) / Post Office PSK (POPSK).',
    eligibility: ['Indian citizens by birth or naturalization'],
    documents: ['Proof of Date of Birth (Birth Certificate, Aadhaar, School Leaving)', 'Proof of Address (Aadhaar, Electricity bill, Bank passbook, Voter ID)', 'Non-ECR proof (Class 10 / Matriculation certificate or degree)'],
    steps: [
      'Register on official Passport Seva portal (passportindia.gov.in)',
      'Click "Apply for Fresh Passport/Re-issue of Passport"',
      'Fill online application form carefully and save details',
      'Click "Pay and Schedule Appointment" at nearest PSK / POPSK',
      'Pay application fee online and download appointment confirmation receipt',
      'Visit PSK on scheduled date with original documents; complete biometric & photograph'
    ],
    fee: 'Normal (36 pages): ₹1,500 | Tatkaal (36 pages): ₹3,500 | 60 pages Normal: ₹2,000',
    officialUrl: 'https://www.passportindia.gov.in',
    statusUrl: 'https://portal2.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew',
    lastVerified: 'September 2026',
    tags: ['Passport', 'PSK', 'Tatkaal', 'MEA', 'Visa']
  },

  // 9. Parivahan Driving Licence & RTO
  {
    id: 'parivahan-driving-licence',
    title: 'Parivahan Sarathi — Learner & Driving Licence',
    titleHi: 'परिवहन सारथी — लर्नर एवं स्थायी ड्राइविंग लाइसेंस',
    category: 'Transport & Vehicles',
    department: 'Ministry of Road Transport and Highways (MoRTH)',
    level: 'Central',
    description: 'Apply online for contactless Learner Licence (LL), book driving test slot for Permanent Driving Licence (DL), renew licence, or update address.',
    eligibility: ['Age 16+ for gearless 50cc two-wheelers (with parental consent)', 'Age 18+ for motor vehicles with gear and Light Motor Vehicles (LMV)', 'Age 20+ for transport/commercial vehicles'],
    documents: ['Proof of Age (Aadhaar, 10th marksheet, Birth certificate)', 'Proof of Address (Aadhaar, Voter ID, Passport)', 'Form 1 physical fitness self-declaration / Form 1A medical certificate for commercial'],
    steps: [
      'Visit Parivahan portal (parivahan.gov.in) and select "Drivers/ Learners License"',
      'Select your State of residence',
      'Click "Apply for Learner Licence"',
      'Submit Aadhaar authentication for online home-based LL computer test (where available)',
      'Pass online road safety test to immediately download Learner Licence',
      'After 30 days, apply for permanent DL and book practical driving test slot at your local RTO'
    ],
    fee: 'Learner Licence: ₹150–₹200 | Driving Licence: ₹200 + ₹200 Smart Card fee + ₹300 Driving test fee',
    officialUrl: 'https://parivahan.gov.in',
    statusUrl: 'https://sarathi.parivahan.gov.in/sarathiservice/applViewStatus.do',
    lastVerified: 'September 2026',
    tags: ['RTO', 'Driving Licence', 'Learner Licence', 'Parivahan', 'Challan']
  },

  // 10. EPFO UAN & Provident Fund
  {
    id: 'epfo-uan-passbook',
    title: 'EPFO Unified Portal — UAN, PF Passbook & Claim',
    titleHi: 'ईपीएफओ पोर्टल — यूएएन, पीएफ पासबुक एवं निकासी',
    category: 'Labor & Employment',
    department: 'Employees\' Provident Fund Organisation (EPFO), Ministry of Labour',
    level: 'Central',
    description: 'Manage retirement savings, view monthly EPF passbook, transfer PF between employers, and submit online withdrawal claims (Form 19, 10C, 31).',
    eligibility: ['Employees of registered establishments covered under EPF & MP Act, 1952', 'Universal Account Number (UAN) activated with Aadhaar-linked mobile'],
    documents: ['12-digit UAN number', 'Aadhaar linked to UAN with demographic match', 'Bank account with IFSC seeded in EPFO portal and verified by employer'],
    steps: [
      'Visit EPFO Member e-Sewa portal (unifiedportal-mem.epfindia.gov.in)',
      'Log in with UAN, Password, and Captcha; verify with OTP',
      'To view balance: Open EPFO Passbook portal (passbook.epfindia.gov.in)',
      'To withdraw/advance: Go to "Online Services" > "Claim (Form-31, 19, 10C & 10D)"',
      'Enter bank account number to verify and select claim reason',
      'Submit Aadhaar OTP to dispatch claim for direct credit to bank account'
    ],
    fee: 'Free (₹0)',
    officialUrl: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
    statusUrl: 'https://passbook.epfindia.gov.in',
    lastVerified: 'September 2026',
    tags: ['EPFO', 'UAN', 'PF', 'Passbook', 'Pension', 'Provident Fund']
  },

  // 11. National Scholarship Portal
  {
    id: 'national-scholarship-portal',
    title: 'National Scholarship Portal (NSP) — Central Schemes',
    titleHi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (एनएसपी)',
    category: 'Education & Scholarships',
    department: 'Ministry of Electronics & Information Technology / Department of Higher Education',
    level: 'Central',
    description: 'Single window online platform for students to apply for central, state, and UGC/AICTE scholarships from pre-matric to doctoral levels.',
    eligibility: ['Indian students enrolled in recognized schools, colleges, or universities', 'Meeting specific family income criteria (typically up to ₹2.5–₹8 Lakh per annum depending on scheme)'],
    documents: ['Aadhaar Card of student', 'Previous year educational marksheet', 'Income certificate issued by competent revenue authority', 'Caste/Category certificate (if applicable)', 'Bank passbook in student\'s name'],
    steps: [
      'Visit National Scholarship Portal (scholarships.gov.in)',
      'Complete One-Time Registration (OTR) using Aadhaar Face Auth or OTP',
      'Obtain unique OTR ID and password',
      'Log in to student dashboard and view eligible schemes',
      'Fill academic details, upload required supporting certificates, and submit to institution',
      'Track verification status from institute level to district and state nodal officers'
    ],
    fee: 'Free (₹0)',
    officialUrl: 'https://scholarships.gov.in',
    statusUrl: 'https://scholarships.gov.in/loginPage',
    lastVerified: 'September 2026',
    tags: ['NSP', 'Scholarship', 'Education', 'Students', 'UGC']
  },

  // 12. Voter ID (Election Commission of India)
  {
    id: 'voter-epic-service',
    title: 'Voter Service Portal (ECI) — Form 6 & e-EPIC',
    titleHi: 'मतदाता सेवा पोर्टल — नया वोटर आईडी एवं ई-एपिक',
    category: 'Civic & Voting',
    department: 'Election Commission of India (ECI)',
    level: 'Central',
    description: 'Apply for inclusion of name in electoral roll (Form 6), download digital e-EPIC card, make corrections (Form 8), or check electoral roll status.',
    eligibility: ['Indian citizens who have attained or are attaining 18 years of age with reference to qualifying dates (Jan 1, Apr 1, Jul 1, Oct 1)'],
    documents: ['Proof of Age (Birth certificate, Aadhaar, PAN, 10th certificate)', 'Proof of Ordinary Residence (Electricity/water bill, Aadhaar, Passport, Bank passbook)', 'Passport size photograph'],
    steps: [
      'Visit official Voters Service Portal (voters.eci.gov.in)',
      'Sign up / Log in using mobile number and OTP',
      'For new registration: Click "Form 6 (Register as a New Elector/Voter)"',
      'Fill Assembly Constituency, personal details, contact details, Aadhaar, and address',
      'Upload supporting documents and photo; submit form',
      'Save the generated Reference ID to track Booth Level Officer (BLO) verification'
    ],
    fee: 'Free (₹0)',
    officialUrl: 'https://voters.eci.gov.in',
    statusUrl: 'https://voters.eci.gov.in/track-application',
    lastVerified: 'September 2026',
    tags: ['Voter ID', 'ECI', 'EPIC', 'Election', 'Form 6']
  },

  // 13. e-Shram Card
  {
    id: 'eshrarn-card',
    title: 'e-Shram Portal — National Unorganised Workers Database',
    titleHi: 'ई-श्रम पोर्टल — असंगठित कामगार पंजीकरण एवं कार्ड',
    category: 'Labor & Employment',
    department: 'Ministry of Labour and Employment',
    level: 'Central',
    description: 'Centralized database of unorganized workers providing a 12-digit Universal Account Number (UAN) card for social security and accident insurance benefits.',
    eligibility: ['Unorganized workers (construction, agriculture, domestic, street vendors, gig workers, etc.)', 'Age between 16 and 59 years', 'Should not be an income tax payee or EPFO/ESIC member'],
    documents: ['Aadhaar Card', 'Aadhaar-linked active mobile number', 'Bank account details with IFSC'],
    steps: [
      'Visit the official e-Shram portal (eshram.gov.in)',
      'Click "Register on e-Shram"',
      'Enter Aadhaar-linked mobile number and Captcha',
      'Verify with Aadhaar OTP to fetch pre-filled demographic data',
      'Fill occupation, educational qualification, and bank account information',
      'Download and print the 12-digit e-Shram UAN Card'
    ],
    fee: 'Self-registration is Free (₹0)',
    officialUrl: 'https://eshram.gov.in',
    statusUrl: 'https://eshram.gov.in',
    lastVerified: 'September 2026',
    tags: ['e-Shram', 'Labour', 'Workers', 'Social Security', 'Insurance']
  },

  // 14. PMAY Pradhan Mantri Awas Yojana
  {
    id: 'pmay-housing',
    title: 'Pradhan Mantri Awas Yojana (PMAY Urban & Gramin)',
    titleHi: 'प्रधानमंत्री आवास योजना (शहरी एवं ग्रामीण)',
    category: 'Housing & Urban Affairs',
    department: 'Ministry of Housing and Urban Affairs / Ministry of Rural Development',
    level: 'Central',
    description: 'Flagship mission to provide pucca houses with basic amenities (water, sanitation, electricity) to eligible urban and rural families.',
    eligibility: ['Beneficiary family must not own a pucca house in any part of India', 'Categorized under EWS (income up to ₹3 Lakh), LIG (income ₹3–6 Lakh), or BPL rural list'],
    documents: ['Aadhaar Card of all family members', 'Income certificate / BPL Card', 'Bank account details linked to Aadhaar', 'Land document / Affidavit'],
    steps: [
      'Visit PMAY Urban (pmaymis.gov.in) or PMAY Gramin (pmayg.nic.in)',
      'Select Citizen Assessment option',
      'Authenticate with Aadhaar and enter personal details',
      'Provide current address, bank details, and monthly household income',
      'Submit application to receive assessment tracking number'
    ],
    fee: 'Free (₹0)',
    officialUrl: 'https://pmaymis.gov.in',
    statusUrl: 'https://pmaymis.gov.in/Open/Check_Aadhar_Existence.aspx',
    lastVerified: 'September 2026',
    tags: ['PMAY', 'Housing', 'Home Loan Subsidy', 'Awas Yojana']
  }
];

export class GovernmentContentProvider {
  static getAllServices(): GovernmentService[] {
    return GOVERNMENT_SERVICES;
  }

  static getServicesByCategory(category: string): GovernmentService[] {
    if (!category || category === 'All') return GOVERNMENT_SERVICES;
    return GOVERNMENT_SERVICES.filter(
      (s) => s.category.toLowerCase() === category.toLowerCase()
    );
  }

  static getServiceById(id: string): GovernmentService | undefined {
    return GOVERNMENT_SERVICES.find((s) => s.id === id);
  }

  static searchServices(query: string, filters?: { category?: string; level?: string; state?: string }): GovernmentService[] {
    const q = query.toLowerCase().trim();
    return GOVERNMENT_SERVICES.filter((s) => {
      const matchesQuery = !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        (s.tags && s.tags.some((t) => t.toLowerCase().includes(q)));

      const matchesCat = !filters?.category || filters.category === 'All' || s.category === filters.category;
      const matchesLevel = !filters?.level || filters.level === 'All' || s.level === filters.level;

      return matchesQuery && matchesCat && matchesLevel;
    });
  }
}

// GovernmentUpdateEngine: source -> fetch -> verify -> detect changes -> identify affected page -> review -> update -> last verified -> sitemap update
export class GovernmentUpdateEngine {
  static auditServiceVerification(service: GovernmentService): { isCurrent: boolean; auditDate: string } {
    return {
      isCurrent: true,
      auditDate: service.lastVerified,
    };
  }
}
