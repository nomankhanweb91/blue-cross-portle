import { GovGuideConfig } from '../pages/gov/GovUniversalGuidePage';

// 1. Income Tax Configuration
export const incomeTaxConfig: GovGuideConfig = {
  id: 'income-tax',
  badge: 'Income Tax Department (e-Filing)',
  title: 'Income Tax Return (ITR) Portal & Slabs',
  subtitle: 'Official e-Filing guidelines, Assessment Year 2025-26 & 2026-27 tax slabs, AIS/TIS inspection, refund status, and Form 16 reconciliation.',
  description: 'Complete guide for filing ITR 1-4, verifying Form 26AS & AIS, New vs Old Tax Regime calculations, and refund tracking on incometax.gov.in.',
  department: 'Income Tax Department, Ministry of Finance',
  officialUrl: 'https://eportal.incometax.gov.in',
  statusUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/itr-status',
  fee: 'Self e-Filing is Free (₹0) on Income Tax Portal',
  lastVerified: 'September 2026',
  services: [
    { title: 'File ITR 1-4 Online', desc: 'Direct browser e-filing with pre-filled salary, interest, and dividend figures from AIS/TIS.', url: 'https://eportal.incometax.gov.in', fee: 'Free (₹0)' },
    { title: 'Check ITR Refund Status', desc: 'Verify processing status of filed return and refund credit directly to pre-validated bank account.', url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/itr-status', fee: 'Free' },
    { title: 'Download AIS & TIS', desc: 'Inspect comprehensive Annual Information Statement and Taxpayer Information Summary for all financial transactions.', url: 'https://eportal.incometax.gov.in', fee: 'Free' },
    { title: 'Form 26AS Tax Credit Statement', desc: 'View TDS, TCS, and advance tax payments credited against your Permanent Account Number.', url: 'https://www.tdscpc.gov.in', fee: 'Free' },
    { title: 'e-Pay Tax Challan', desc: 'Pay self-assessment tax, advance tax, or demand notices directly via UPI, NetBanking, or RTGS.', url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/epay-tax', fee: 'Free' },
    { title: 'e-Verify ITR (Aadhaar OTP)', desc: 'Complete mandatory 30-day verification using instant Aadhaar OTP, NetBanking, or bank ATM EVC.', url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/e-verify', fee: 'Free' },
  ],
  eligibility: [
    'Resident individuals with gross total income exceeding basic exemption limit (₹3,00,000 under New Regime)',
    'Salaried employees, business owners, professionals, freelancers, and senior citizens',
    'Individuals claiming tax refunds on excess TDS deducted by employers or banks',
    'Persons incurring electricity expense > ₹1 Lakh or foreign travel expenditure > ₹2 Lakhs'
  ],
  documents: [
    'Form 16 provided by employer (Part A and Part B)',
    'Annual Information Statement (AIS) & Taxpayer Information Summary (TIS)',
    'Bank account statements with interest certificates (Savings & FDs)',
    'Proof of investments (80C, 80D, NPS) if choosing the Old Tax Regime',
    'Aadhaar number linked to PAN'
  ],
  steps: [
    'Log in to Income Tax e-Filing portal (eportal.incometax.gov.in) using PAN as User ID and your password',
    'Navigate to "e-File" > "Income Tax Returns" > "File Income Tax Return"',
    'Select Assessment Year (AY 2025-26 / 2026-27), filing status (Individual), and ITR Form (ITR-1 for salaried income up to ₹50 Lakh)',
    'Confirm pre-filled personal, salary, and dividend data fetched from AIS and 26AS',
    'Select New Tax Regime (default) or opt out to claim Old Regime Chapter VI-A deductions',
    'Calculate tax liability; pay balance through e-Pay Tax if due',
    'Submit and complete instant e-Verification within 30 days using 6-digit Aadhaar OTP'
  ],
  faqs: [
    { q: 'What is the default tax regime in India?', a: 'Under the Finance Act, the New Tax Regime is the default regime with lower slab rates and a standard deduction of ₹75,000 for salaried employees. Taxpayers can opt for the Old Regime at the time of return filing.' },
    { q: 'Is there a penalty for late filing?', a: 'Yes. Filing after the statutory deadline (July 31 for non-audit individual taxpayers) incurs a late filing fee under Section 234F of up to ₹5,000 (or ₹1,000 if total income is below ₹5 Lakhs).' },
  ]
};

// 2. GST Configuration
export const gstConfig: GovGuideConfig = {
  id: 'gst',
  badge: 'Goods & Services Tax Network (GSTN)',
  title: 'GST Portal — Registration, Returns & GSTIN',
  subtitle: 'Official business registration, GSTIN verification, GSTR-1, GSTR-3B filing schedules, e-Way bills, and input tax credit claims.',
  description: 'Official procedure for new GST registration, checking GSTIN validity, e-Invoice rules, and tax compliance on gst.gov.in.',
  department: 'Central Board of Indirect Taxes and Customs (CBIC) & GSTN',
  officialUrl: 'https://www.gst.gov.in',
  statusUrl: 'https://services.gst.gov.in/services/searchtp',
  fee: 'Government Registration Fee is ₹0 (Free)',
  lastVerified: 'September 2026',
  services: [
    { title: 'New GST Registration', desc: 'Online application for 15-digit GST Identification Number (GSTIN) with Aadhaar authentication.', url: 'https://reg.gst.gov.in/registration/', fee: 'Free (₹0)' },
    { title: 'Search Taxpayer / GSTIN', desc: 'Verify business name, operational status, constitution, and filing track record of any supplier.', url: 'https://services.gst.gov.in/services/searchtp', fee: 'Free' },
    { title: 'e-Way Bill Portal', desc: 'Generate electronic transit permits for movement of consignments exceeding ₹50,000 value.', url: 'https://ewaybillgst.gov.in', fee: 'Free' },
    { title: 'e-Invoice Portal', desc: 'Invoice Registration Portal (IRP) for generating unique Invoice Reference Numbers (IRN) and QR codes.', url: 'https://einvoice1.gst.gov.in', fee: 'Free' },
    { title: 'File GSTR-1 & GSTR-3B', desc: 'Monthly/quarterly outward sales declarations and summary tax calculation returns.', url: 'https://www.gst.gov.in', fee: 'Free' },
    { title: 'Track Application Status (ARN)', desc: 'Check stage of approval by central/state jurisdictional tax officers using 15-digit ARN.', url: 'https://services.gst.gov.in/services/arnstatus', fee: 'Free' },
  ],
  eligibility: [
    'Businesses with annual turnover exceeding threshold limits (₹40 Lakhs for goods suppliers in normal states, ₹20 Lakhs in special states)',
    'Service providers with annual turnover exceeding ₹20 Lakhs (₹10 Lakhs in special states)',
    'Persons making interstate taxable supplies of goods (mandatory registration regardless of turnover)',
    'Casual taxable persons, non-resident taxable persons, and e-commerce sellers'
  ],
  documents: [
    'PAN card of business entity / proprietor',
    'Aadhaar card of promoter / partner / director',
    'Proof of business address (Electricity bill, property tax receipt, registered rent agreement, and NOC from owner)',
    'Bank account proof (Cancelled cheque or first page of bank passbook with IFSC)',
    'Digital Signature Certificate (DSC) for LLPs and Companies / EVC OTP for proprietorship'
  ],
  steps: [
    'Access the official GST Common Portal (gst.gov.in) and select "Services" > "Registration" > "New Registration"',
    'Part A: Select "Taxpayer", enter legal entity name, PAN, primary email, and mobile; submit to receive Temporary Reference Number (TRN)',
    'Part B: Log in using TRN and mobile OTP within 15 days; complete 10 business details tabs',
    'Upload required premises address documents, partner photos, and HSN/SAC codes for top goods/services',
    'Perform mandatory Aadhaar Authentication of primary authorized signatory',
    'Sign and submit using DSC (Companies) or EVC (Aadhaar OTP for Proprietorships); 15-digit ARN generated',
    'Track ARN status; upon officer approval, GSTIN certificate is dispatched to registered email'
  ],
  faqs: [
    { q: 'Is there any fee charged by the government for GST registration?', a: 'No. The Government of India charges zero fee (₹0) for GST registration. Avoid unofficial private portals that demand advance payment for registration.' },
    { q: 'What is the composition scheme in GST?', a: 'The Composition Scheme allows small taxpayers with turnover up to ₹1.5 Crore to pay tax at a low flat rate (1% to 6%) with simplified quarterly returns, without claiming Input Tax Credit (ITC).' },
  ]
};

// 3. Udyam MSME Configuration
export const udyamConfig: GovGuideConfig = {
  id: 'udyam',
  badge: 'Ministry of MSME, Government of India',
  title: 'Udyam Registration — MSME Certificate',
  subtitle: 'Zero-cost paperless registration for Micro, Small and Medium Enterprises with automatic CBDT & GSTN integration.',
  description: 'Complete guide to registering your enterprise under Udyam, classification criteria, collateral-free loans, and subsidies on udyamregistration.gov.in.',
  department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
  officialUrl: 'https://udyamregistration.gov.in',
  statusUrl: 'https://udyamregistration.gov.in/PrintApplication_Pub.aspx',
  fee: 'Completely Free (₹0) — Government charges no fee',
  lastVerified: 'September 2026',
  services: [
    { title: 'New Udyam Registration', desc: 'Online self-declaration form for new entrepreneurs based on Aadhaar and PAN linkage.', url: 'https://udyamregistration.gov.in', fee: 'Free (₹0)' },
    { title: 'Print / Download Certificate', desc: 'Download official high-security QR-coded Udyam Certificate anytime with URN number.', url: 'https://udyamregistration.gov.in/PrintApplication_Pub.aspx', fee: 'Free' },
    { title: 'Update / Edit Udyam Details', desc: 'Update annual turnover, investment, employee headcount, or add new business activities.', url: 'https://udyamregistration.gov.in/Udyam_Login.aspx', fee: 'Free' },
    { title: 'Verify Udyam Registration', desc: 'Third-party verification of any Udyam number for bank loan approvals or tender eligibility.', url: 'https://udyamregistration.gov.in/Udyam_Verify.aspx', fee: 'Free' },
  ],
  eligibility: [
    'Micro Enterprises: Investment in Plant & Machinery <= ₹1 Crore AND Annual Turnover <= ₹5 Crore',
    'Small Enterprises: Investment <= ₹10 Crore AND Annual Turnover <= ₹50 Crore',
    'Medium Enterprises: Investment <= ₹50 Crore AND Annual Turnover <= ₹250 Crore',
    'Applies to both manufacturing and services sector enterprises, including retail and wholesale traders'
  ],
  documents: [
    'Aadhaar card of proprietor, managing partner, or authorized director',
    'Permanent Account Number (PAN) of enterprise or proprietor',
    'GSTIN (applicable only if GST registration is mandatory for your trade under GST law)',
    'Bank account details (Account number and IFSC)'
  ],
  steps: [
    'Visit the official Udyam portal (udyamregistration.gov.in)',
    'Click "For New Entrepreneurs who are not Registered yet as MSME"',
    'Enter 12-digit Aadhaar number and Entrepreneur Name exactly as per Aadhaar; validate via OTP',
    'Enter PAN details; system validates against Income Tax database',
    'Fill enterprise details: name of enterprise, location of units, official bank account, and major business activity (NIC code)',
    'Input investment in plant & machinery and annual turnover numbers',
    'Submit with final mobile OTP to instantly generate Udyam Registration Number (URN) and downloadable certificate'
  ],
  faqs: [
    { q: 'Is Udyam registration free?', a: 'Yes. The Government of India provides Udyam registration 100% free of charge. Beware of private duplicate websites that charge fees.' },
    { q: 'What are the benefits of having an Udyam certificate?', a: 'Registered MSMEs receive collateral-free loans under CGTMSE, lower interest rates on bank credit, 50% subsidy on patent and trademark registrations, exemption from government tender earnest money deposits (EMD), and protection against delayed payments under MSMED Act.' },
  ]
};

// 4. Schemes Configuration
export const schemesConfig: GovGuideConfig = {
  id: 'schemes',
  badge: 'Central & State Citizen Welfare',
  title: 'Government Schemes & Welfare Portal',
  subtitle: 'Direct benefit transfer (DBT), agriculture, housing, health, insurance, and social security programs across India.',
  description: 'Verified guide to flagship citizen schemes including PM Kisan, PMAY Housing, Ayushman Bharat, Mudra Yojana, SVANidhi, and Sukanya Samriddhi.',
  department: 'Direct Benefit Transfer (DBT) Mission, Government of India',
  officialUrl: 'https://www.myscheme.gov.in',
  statusUrl: 'https://pmkisan.gov.in/BeneficiaryStatus_New.aspx',
  fee: 'Free (₹0)',
  lastVerified: 'September 2026',
  services: [
    { title: 'PM Kisan Samman Nidhi', desc: '₹6,000 per year directly to bank accounts of landholding farmer families in 3 installments.', url: 'https://pmkisan.gov.in', fee: 'Free' },
    { title: 'Pradhan Mantri Awas Yojana (PMAY)', desc: 'Pucca houses with water, sanitation, and electricity for urban and rural eligible families.', url: 'https://pmaymis.gov.in', fee: 'Free' },
    { title: 'PM Mudra Yojana (PMMY)', desc: 'Micro and small business loans up to ₹10–₹20 Lakhs across Shishu, Kishore, and Tarun categories.', url: 'https://www.mudra.org.in', fee: 'Free' },
    { title: 'PM SVANidhi (Street Vendors)', desc: 'Working capital micro-credit up to ₹50,000 with 7% interest subsidy for street vendors.', url: 'https://pmsvanidhi.mohua.gov.in', fee: 'Free' },
    { title: 'PM Vishwakarma Scheme', desc: 'Collateral-free credit, toolkit incentives, and skill training for traditional artisans and craftspeople.', url: 'https://pmvishwakarma.gov.in', fee: 'Free' },
    { title: 'Sukanya Samriddhi Yojana (SSY)', desc: 'High-interest tax-exempt savings scheme for girl children up to age 10 opened at Post Offices/Banks.', url: 'https://www.indiapost.gov.in', fee: 'Min ₹250 deposit' },
  ],
  eligibility: [
    'Scheme-specific criteria defined by administrative ministries (e.g. Farmers for PM Kisan, Low-income for PMAY)',
    'Aadhaar number linked to NPCI bank account for direct benefit transfer (DBT)',
    'Socio-Economic Caste Census (SECC) or state ration card records where applicable'
  ],
  documents: [
    'Aadhaar card of applicant and family members',
    'Bank passbook with IFSC and NPCI Aadhaar seeding',
    'Income certificate / Ration card / BPL card',
    'Land ownership documents (for agricultural schemes like PM Kisan)'
  ],
  steps: [
    'Visit the national scheme aggregation portal (myscheme.gov.in)',
    'Filter schemes by your Category (Farmer, Student, Women, Senior Citizen, Business)',
    'Check exact eligibility and required documents list',
    'Navigate to the scheme official portal (e.g. pmkisan.gov.in)',
    'Fill beneficiary registration form with Aadhaar authentication',
    'Track application and installment transfer status under Beneficiary Status'
  ],
  faqs: [
    { q: 'How to ensure DBT money reaches my bank account?', a: 'Make sure your primary bank account is actively seeded with Aadhaar on the NPCI mapper. You can check NPCI Aadhaar mapping status through your bank or UIDAI portal.' },
  ]
};

// 5. Passport Configuration
export const passportConfig: GovGuideConfig = {
  id: 'passport',
  badge: 'Ministry of External Affairs (CPV Division)',
  title: 'Passport Seva — Fresh & Renewal Guide',
  subtitle: 'Official appointment scheduling at Passport Seva Kendras (PSK), Tatkaal applications, police verification norms, and fee calculator.',
  description: 'Apply for Ordinary Indian Passport, book PSK/POPSK appointment slots, and check dispatch status on passportindia.gov.in.',
  department: 'Consular, Passport and Visa (CPV) Division, Ministry of External Affairs',
  officialUrl: 'https://www.passportindia.gov.in',
  statusUrl: 'https://portal2.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew',
  fee: 'Normal (36 pages): ₹1,500 | Tatkaal (36 pages): ₹3,500',
  lastVerified: 'September 2026',
  services: [
    { title: 'Fresh Passport Application', desc: 'Online application form for first-time applicants with standard police verification.', url: 'https://www.passportindia.gov.in', fee: '₹1,500' },
    { title: 'Re-issue / Passport Renewal', desc: 'Renew expired passports, replace filled-up booklets, or update address/spouse details.', url: 'https://www.passportindia.gov.in', fee: '₹1,500' },
    { title: 'Tatkaal Urgent Passport', desc: 'Expedited processing for urgent international travel within 1-3 business days.', url: 'https://www.passportindia.gov.in', fee: '₹3,500' },
    { title: 'Track Application Status', desc: 'Live file status tracking from police verification stage to Speed Post dispatch.', url: 'https://portal2.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew', fee: 'Free' },
    { title: 'PSK Appointment Availability', desc: 'Check real-time calendar availability of appointment slots across nearby PSK and POPSK counters.', url: 'https://portal2.passportindia.gov.in/AppOnlineProject/online/appointmentSearch', fee: 'Free' },
  ],
  eligibility: [
    'Indian citizens by birth, descent, registration, or naturalization',
    'Adults (aged 18+) for 10-year validity passport',
    'Minors (aged below 18) for 5-year validity passport or until age 18'
  ],
  documents: [
    'Proof of Date of Birth: Birth Certificate, Aadhaar Card, PAN Card, or School Leaving Certificate',
    'Proof of Address: Aadhaar Card, Electricity/Water bill, Bank passbook with photo, or Voter ID',
    'Non-ECR Proof (Emigration Check Not Required): Class 10/Matriculation passing certificate or higher degree',
    'Original old passport (in case of renewal/re-issue)'
  ],
  steps: [
    'Register on the official Passport Seva portal (passportindia.gov.in)',
    'Log in and click "Apply for Fresh Passport / Re-issue of Passport"',
    'Fill applicant details, family details, address, and references carefully; save and submit',
    'Click "Pay and Schedule Appointment"; pay government fee online via SBI ePay',
    'Download and print Appointment Confirmation receipt with ARN bar code',
    'Visit selected Passport Seva Kendra (PSK) with original documents on the appointment date for biometric capture and photograph',
    'Police verification takes place at your local police station, followed by Speed Post delivery'
  ],
  faqs: [
    { q: 'Is physical presence mandatory at PSK?', a: 'Yes. All applicants including infants must visit the PSK/POPSK in person for live biometric capture (fingerprints and digital photograph).' },
  ]
};

// 6. RTO Driving Licence Configuration
export const rtoConfig: GovGuideConfig = {
  id: 'rto',
  badge: 'Ministry of Road Transport and Highways (MoRTH)',
  title: 'Parivahan Sarathi — Driving Licence & RC',
  subtitle: 'Contactless Learner Licence, practical driving test slot booking, permanent licence renewal, vehicle RC details, and echallan payment.',
  description: 'Online citizen procedures for driving licences, duplicate DL, vehicle registration, and challan payments on parivahan.gov.in.',
  department: 'Ministry of Road Transport and Highways (MoRTH)',
  officialUrl: 'https://parivahan.gov.in',
  statusUrl: 'https://sarathi.parivahan.gov.in/sarathiservice/applViewStatus.do',
  fee: 'Learner Licence: ₹150–₹200 | Driving Licence: ~₹700 (varies by state)',
  lastVerified: 'September 2026',
  services: [
    { title: 'Apply for Learner Licence (LL)', desc: 'Contactless Aadhaar-based LL online computer test from home without visiting RTO.', url: 'https://sarathi.parivahan.gov.in', fee: '₹150–₹200' },
    { title: 'Apply for Driving Licence (DL)', desc: 'Book RTO driving test track slot after completing mandatory 30-day learner period.', url: 'https://sarathi.parivahan.gov.in', fee: '₹700' },
    { title: 'DL Renewal & Address Change', desc: 'Renew expired licences or transfer jurisdiction with self-declaration medical fitness.', url: 'https://sarathi.parivahan.gov.in', fee: '₹200–₹400' },
    { title: 'Check e-Challan & Pay Online', desc: 'Search pending traffic violations against vehicle RC or DL and pay directly via payment gateway.', url: 'https://echallan.parivahan.gov.in', fee: 'Challan amount' },
    { title: 'Vehicle RC Status (Vahan)', desc: 'Verify vehicle ownership, insurance validity, tax status, and PUC fitness validity.', url: 'https://vahan.parivahan.gov.in', fee: 'Free' },
  ],
  eligibility: [
    'Age 16+ for motorcycles with engine capacity up to 50cc without gear (with parental consent)',
    'Age 18+ for light motor vehicles (cars) and motorcycles with gear',
    'Age 20+ for transport/commercial vehicles with minimum 1-year LMV licence'
  ],
  documents: [
    'Age Proof: Aadhaar Card, 10th Marksheet, Birth Certificate, or Passport',
    'Address Proof: Aadhaar Card, Electricity bill, or Voter ID',
    'Medical Certificate: Form 1 physical fitness declaration / Form 1A signed by registered medical practitioner (for commercial/age 40+)'
  ],
  steps: [
    'Visit Parivahan portal (parivahan.gov.in) > "Drivers/Learners License"',
    'Select your residential State',
    'Click "Apply for Learner Licence" and choose Aadhaar authentication for home computer test',
    'Pass 15-question road signs and safety test online to instantly download Learner Licence PDF',
    'After 30 days (and within 6 months), click "Apply for Driving Licence"',
    'Book slot for practical driving skill test at your jurisdictional RTO track',
    'Pass driving test; smart card driving licence is delivered to your residential address'
  ],
  faqs: [
    { q: 'Can I drive alone on a Learner Licence?', a: 'No. A learner licence holder must always have a person with a valid permanent driving licence sitting next to them in the vehicle, and display "L" plates on front and rear.' },
  ]
};

// 7. EPFO Configuration
export const epfoConfig: GovGuideConfig = {
  id: 'epfo',
  badge: 'Employees\' Provident Fund Organisation (EPFO)',
  title: 'EPFO UAN Member Portal — PF Passbook & Claim',
  subtitle: 'Check monthly PF balance, download passbooks, transfer PF between establishments, and submit online withdrawal claims (Form 19, 10C, 31).',
  description: 'Manage Employee Provident Fund, Universal Account Number (UAN) activation, and pension claims on unifiedportal-mem.epfindia.gov.in.',
  department: 'Employees\' Provident Fund Organisation, Ministry of Labour',
  officialUrl: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
  statusUrl: 'https://passbook.epfindia.gov.in',
  fee: 'Free (₹0)',
  lastVerified: 'September 2026',
  services: [
    { title: 'EPFO Member Passbook', desc: 'Download electronic passbook showing employer and employee monthly contributions and interest credited.', url: 'https://passbook.epfindia.gov.in', fee: 'Free' },
    { title: 'UAN Activation', desc: 'Activate 12-digit Universal Account Number using Aadhaar OTP to create login credentials.', url: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/', fee: 'Free' },
    { title: 'Online PF Claim (Form 19, 10C, 31)', desc: 'Submit advance withdrawal claims for medical, housing, marriage, or final settlement after leaving service.', url: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/', fee: 'Free' },
    { title: 'One Member One EPF Account (Transfer)', desc: 'Online transfer of PF balance from previous employment accounts into current UAN.', url: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/', fee: 'Free' },
  ],
  eligibility: [
    'Salaried employees of organizations covered under EPF & MP Act, 1952',
    'Active 12-digit UAN linked with Aadhaar and mobile number'
  ],
  documents: [
    '12-digit Universal Account Number (UAN)',
    'Aadhaar card linked with mobile for OTP authentication',
    'Pre-validated bank account details with IFSC seeded in EPFO portal'
  ],
  steps: [
    'Visit EPFO Member Interface (unifiedportal-mem.epfindia.gov.in)',
    'Log in using UAN, password, and captcha; verify with SMS OTP',
    'To check balance: Visit passbook.epfindia.gov.in and log in with same credentials',
    'To withdraw: Select "Online Services" > "Claim (Form-31, 19, 10C & 10D)"',
    'Verify bank account number and select withdrawal category',
    'Submit Aadhaar OTP to dispatch claim directly to regional PF commissioner'
  ],
  faqs: [
    { q: 'How many days does EPFO take to credit claim money?', a: 'Most online claims submitted with Aadhaar authentication are processed and credited to the member’s bank account within 3 to 7 working days.' },
  ]
};

// 8. Banking Information Configuration
export const bankingConfig: GovGuideConfig = {
  id: 'banking',
  badge: 'Reserve Bank of India (RBI) & NPCI',
  title: 'Banking Information — IFSC, MICR & UPI Safety',
  subtitle: 'Directory of all Indian bank branches, NEFT/RTGS transaction limits, official bank holiday calendars, and cyber security rules.',
  description: 'Search official IFSC codes, understand IMPS/NEFT clearing rules, and review RBI citizen safety guidelines for digital payments.',
  department: 'Reserve Bank of India (RBI) / National Payments Corporation of India (NPCI)',
  officialUrl: 'https://www.rbi.org.in',
  fee: 'Free (₹0)',
  lastVerified: 'September 2026',
  services: [
    { title: 'All India IFSC & MICR Lookup', desc: '11-character Indian Financial System Code lookup for NEFT, RTGS, and IMPS electronic transfers.', url: 'https://www.rbi.org.in', fee: 'Free' },
    { title: 'RBI Kehta Hai (Cyber Safety)', desc: 'Official Reserve Bank of India consumer awareness directives regarding OTP, UPI PIN, and fraud reporting.', url: 'https://rbikehtahai.rbi.org.in', fee: 'Free' },
    { title: 'National Cyber Crime Reporting (1930)', desc: 'Report unauthorized online financial transactions immediately to freeze stolen funds.', url: 'https://cybercrime.gov.in', fee: 'Toll-free 1930' },
  ],
  eligibility: ['All bank account holders and financial consumers in India'],
  documents: ['Bank Account Number', 'Branch Name / IFSC Code'],
  steps: [
    'Verify your bank branch 11-digit IFSC code from your cheque book or passbook',
    'Never share your UPI PIN when receiving money (PIN is required ONLY to send money)',
    'Report any unauthorized financial debits immediately to bank helpline and dial 1930 within the golden hour'
  ],
  faqs: [
    { q: 'Does receiving money on UPI require entering UPI PIN?', a: 'NO. This is a critical safety rule: Entering your UPI PIN always deducts money from your account. You NEVER need to enter a UPI PIN to receive money.' },
  ]
};

// 9. Railways Configuration
export const railwaysConfig: GovGuideConfig = {
  id: 'railways',
  badge: 'Ministry of Railways / IRCTC',
  title: 'Indian Railways & PNR Status Portal',
  subtitle: 'Official train reservation links, PNR confirmation prediction architecture, live running status, and Vande Bharat schedules.',
  description: 'Official Indian Railways portal guide for train ticketing, PNR status tracking, and station enquiry on irctc.co.in.',
  department: 'Ministry of Railways, Government of India',
  officialUrl: 'https://www.irctc.co.in',
  statusUrl: 'https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html',
  fee: 'Standard ticketing fares based on class and distance',
  lastVerified: 'September 2026',
  services: [
    { title: 'IRCTC Official e-Ticketing', desc: 'Book reserved train tickets across 1A, 2A, 3A, CC, and Sleeper classes nationwide.', url: 'https://www.irctc.co.in', fee: 'Ticket fare' },
    { title: 'Check PNR Status', desc: '10-digit Passenger Name Record enquiry showing current coach, berth, and confirmation status.', url: 'https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html', fee: 'Free' },
    { title: 'Live Train Running Status (NTES)', desc: 'National Train Enquiry System tracking real-time delay, platform numbers, and next station arrivals.', url: 'https://enquiry.indianrail.gov.in', fee: 'Free' },
  ],
  eligibility: ['All train passengers'],
  documents: ['Valid original identity proof during train journey (Aadhaar, Voter ID, Driving Licence, Passport)'],
  steps: [
    'Visit official IRCTC portal (irctc.co.in) or Rail Connect app',
    'Log in with verified user credentials',
    'Search trains between source and destination stations for selected date',
    'Select class and enter passenger details matching government ID',
    'Complete payment to generate 10-digit PNR ticket'
  ],
  faqs: [
    { q: 'What is Tatkal booking time?', a: 'Tatkal booking opens at 10:00 AM for AC classes (2A, 3A, CC) and at 11:00 AM for non-AC classes (Sleeper) one day prior to the train departure date from origin station.' },
  ]
};

// 10. Flights Configuration
export const flightsConfig: GovGuideConfig = {
  id: 'flights',
  badge: 'Ministry of Civil Aviation / DGCA / AAI',
  title: 'Indian Civil Aviation & Airports Directory',
  subtitle: 'Airports Authority of India (AAI) directory, DigiYatra biometric facial gate guidance, passenger rights, and airline directories.',
  description: 'Official passenger guidelines for domestic and international air travel in India, DigiYatra enrollment, and DGCA Air Passenger Charter.',
  department: 'Ministry of Civil Aviation / Directorate General of Civil Aviation (DGCA)',
  officialUrl: 'https://www.civilaviation.gov.in',
  fee: 'Free guidelines',
  lastVerified: 'September 2026',
  services: [
    { title: 'DigiYatra Biometric Facial Entry', desc: 'Contactless, paperless check-in and boarding gate passage across major Indian airports.', url: 'https://www.digiyatra.com', fee: 'Free' },
    { title: 'AirSewa Grievance Redressal', desc: 'Official portal for delayed baggage, flight cancellations, refund disputes, and passenger rights.', url: 'https://airsewa.gov.in', fee: 'Free' },
    { title: 'Airports Authority of India (AAI)', desc: 'Directory of 130+ domestic and international civil airports across all Indian states.', url: 'https://www.aai.aero', fee: 'Free' },
  ],
  eligibility: ['All domestic and international air travelers'],
  documents: ['Valid government photo ID (Aadhaar, Passport, Voter ID) and boarding pass'],
  steps: [
    'Download DigiYatra app and link your Aadhaar credentials for seamless airport facial entry',
    'Arrive at airport 2 hours before domestic flight departure (3 hours for international)',
    'Pass security check and board flight using mobile boarding pass'
  ],
  faqs: [
    { q: 'What compensation is due if a domestic flight is cancelled?', a: 'Under DGCA passenger rights charter, if a flight is cancelled without 2 weeks prior notice, the airline must offer alternate flights or a full ticket refund plus compensation up to ₹10,000 depending on flight duration.' },
  ]
};

// 11. Documents Configuration
export const documentsConfig: GovGuideConfig = {
  id: 'documents',
  badge: 'Ministry of Electronics & IT / DigiLocker',
  title: 'Government Certificates & Documents Directory',
  subtitle: 'Official guides for issuing Birth, Caste, Domicile, EWS, Income, Ration, Marriage, and Disability certificates.',
  description: 'Step-by-step citizen instructions for applying for state and central certificates through DigiLocker and state e-District portals.',
  department: 'Ministry of Electronics and Information Technology (DigiLocker)',
  officialUrl: 'https://www.digilocker.gov.in',
  fee: 'Varies by state (typically ₹10–₹50 nominal fee)',
  lastVerified: 'September 2026',
  services: [
    { title: 'DigiLocker National Cloud', desc: 'Store and share legally authentic digital certificates issued by central and state governments.', url: 'https://www.digilocker.gov.in', fee: 'Free (₹0)' },
    { title: 'National Portal of India', desc: 'Single-entry access to information and services provided by Indian government entities.', url: 'https://www.india.gov.in', fee: 'Free' },
    { title: 'ServicePlus (NIC)', desc: 'Unified citizen service delivery metadata architecture used across 30+ states.', url: 'https://serviceonline.gov.in', fee: 'Free' },
  ],
  eligibility: ['All citizens residing in respective states/jurisdictions'],
  documents: ['Aadhaar Card', 'Ration Card / Family ID', 'Self-declaration affidavit', 'Address proof'],
  steps: [
    'Access your respective state e-District portal or ServicePlus',
    'Select required certificate (Income, Caste, Domicile, EWS)',
    'Fill application form and upload revenue documents',
    'Application is verified by Revenue Inspector / Tehsildar',
    'Digitally signed certificate is issued with verification QR code'
  ],
  faqs: [
    { q: 'Are documents in DigiLocker legally recognized?', a: 'Yes. Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, 2016 explicitly treats documents issued via DigiLocker on par with original physical documents.' },
  ]
};

// 12. Business & Startup Configuration
export const businessConfig: GovGuideConfig = {
  id: 'business',
  badge: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
  title: 'Startup India & Business Registration',
  subtitle: 'Company incorporation, LLP registration, DPIIT startup recognition, tax holidays, and government e-Marketplace (GeM).',
  description: 'Guide for establishing businesses in India, Startup India benefits, MCA SPICe+ incorporation, and government tender procurement.',
  department: 'Ministry of Commerce & Industry / Ministry of Corporate Affairs',
  officialUrl: 'https://www.startupindia.gov.in',
  fee: 'Varies by entity type',
  lastVerified: 'September 2026',
  services: [
    { title: 'Startup India Hub', desc: 'DPIIT startup recognition offering 3-year income tax holiday (Section 80-IAC) and capital gains exemptions.', url: 'https://www.startupindia.gov.in', fee: 'Free' },
    { title: 'MCA21 SPICe+ Incorporation', desc: 'Integrated company incorporation form combining DIN, PAN, TAN, EPFO, ESIC, and bank account allotment.', url: 'https://www.mca.gov.in', fee: 'Statutory MCA fee' },
    { title: 'Government e-Marketplace (GeM)', desc: 'Sell products and services directly to central and state government departments and PSUs.', url: 'https://gem.gov.in', fee: 'Free registration' },
  ],
  eligibility: ['Entrepreneurs, innovators, and registered entities in India'],
  documents: ['PAN & Aadhaar of promoters', 'Digital Signature Certificate (DSC)', 'Articles of Association (AOA) & Memorandum of Association (MOA)'],
  steps: [
    'Incorporate enterprise via MCA SPICe+ portal (Private Limited, LLP, or Partnership)',
    'Register on Startup India portal to obtain DPIIT recognition certificate',
    'Avail IP fee discounts (80% rebate on patents, 50% on trademarks)'
  ],
  faqs: [
    { q: 'What is the definition of a Startup under DPIIT?', a: 'An entity is considered a Startup up to 10 years from the date of its incorporation, with an annual turnover not exceeding ₹100 Crores in any financial year, and working towards innovation or scalable commercial models.' },
  ]
};

// 13. Voter Services Configuration
export const voterConfig: GovGuideConfig = {
  id: 'voter',
  badge: 'Election Commission of India (ECI)',
  title: 'Voter Service Portal (ECI) — Form 6 & e-EPIC',
  subtitle: 'New voter registration, electoral roll verification, digital e-EPIC download, constituency transfer, and correction forms.',
  description: 'Official guide to registering as an Indian elector, updating EPIC voter card details, and locating polling booths on voters.eci.gov.in.',
  department: 'Election Commission of India (ECI)',
  officialUrl: 'https://voters.eci.gov.in',
  statusUrl: 'https://voters.eci.gov.in/track-application',
  fee: 'Completely Free (₹0)',
  lastVerified: 'September 2026',
  services: [
    { title: 'New Voter Registration (Form 6)', desc: 'Enroll as a first-time voter or upon shifting to a new assembly constituency.', url: 'https://voters.eci.gov.in', fee: 'Free (₹0)' },
    { title: 'Download Digital e-EPIC', desc: 'Secure portable PDF copy of your voter photo identity card with authentication QR code.', url: 'https://voters.eci.gov.in', fee: 'Free' },
    { title: 'Search Name in Electoral Roll', desc: 'Verify your polling booth, part number, and serial number in the voter list.', url: 'https://electoralsearch.eci.gov.in', fee: 'Free' },
    { title: 'Correction of Entries (Form 8)', desc: 'Correct name, age, address, photograph, or request replacement EPIC card.', url: 'https://voters.eci.gov.in', fee: 'Free' },
  ],
  eligibility: ['Indian citizens who have reached 18 years of age on or before the qualifying date (Jan 1, Apr 1, Jul 1, Oct 1)'],
  documents: ['Proof of Age (Birth Certificate, Aadhaar, 10th marksheet)', 'Proof of Residence (Electricity bill, Aadhaar, Passport)', 'Passport photo'],
  steps: [
    'Log in to Voters Service Portal (voters.eci.gov.in)',
    'Fill Form 6 with assembly constituency and demographic details',
    'Upload supporting documents and submit to receive 14-digit Reference ID',
    'Booth Level Officer (BLO) performs field verification; e-EPIC generated'
  ],
  faqs: [
    { q: 'Can an overseas Indian citizen vote?', a: 'Yes. Overseas (NRI) citizens who have not acquired citizenship of any other country can register as overseas electors using Form 6A, but must vote in person at their designated polling booth in India.' },
  ]
};

// 14. e-Shram Configuration
export const eshramConfig: GovGuideConfig = {
  id: 'e-shram',
  badge: 'Ministry of Labour and Employment',
  title: 'e-Shram Portal — National Workers Database',
  subtitle: 'Universal Account Number (UAN) card for unorganized sector workers with social security and insurance linkage.',
  description: 'Official procedure for unorganized workers to register on e-Shram, receive accidental insurance benefits, and download UAN card on eshram.gov.in.',
  department: 'Ministry of Labour and Employment',
  officialUrl: 'https://eshram.gov.in',
  fee: 'Free (₹0)',
  lastVerified: 'September 2026',
  services: [
    { title: 'Register on e-Shram', desc: 'Paperless self-registration for gig workers, agricultural laborers, and construction workers.', url: 'https://eshram.gov.in', fee: 'Free (₹0)' },
    { title: 'Download UAN Card', desc: 'Download 12-digit e-Shram card accepted nationwide for welfare benefit eligibility.', url: 'https://eshram.gov.in', fee: 'Free' },
  ],
  eligibility: ['Unorganized workers aged 16–59 years who are not members of EPFO or ESIC and not income tax payees'],
  documents: ['Aadhaar Card', 'Aadhaar-linked mobile phone', 'Bank account details with IFSC'],
  steps: [
    'Open eshram.gov.in and click "Register on e-Shram"',
    'Enter Aadhaar-linked mobile number and Captcha',
    'Authenticate with OTP to load pre-filled demographics',
    'Enter occupation, education, and bank details; download UAN card'
  ],
  faqs: [
    { q: 'Is there any renewal required for e-Shram card?', a: 'No renewal is required. The 12-digit UAN is permanent for life.' },
  ]
};

// 15. Ayushman Bharat Configuration
export const ayushmanConfig: GovGuideConfig = {
  id: 'ayushman',
  badge: 'National Health Authority (NHA)',
  title: 'Ayushman Bharat PM-JAY — Golden Health Card',
  subtitle: '₹5 Lakh per family per year cashless health coverage across empaneled hospitals for secondary and tertiary hospitalization.',
  description: 'Check eligibility for PM-JAY, download plastic-ready Ayushman Card, search empaneled hospitals, and review coverage for senior citizens aged 70+.',
  department: 'National Health Authority (NHA), Ministry of Health & Family Welfare',
  officialUrl: 'https://beneficiary.nha.gov.in',
  statusUrl: 'https://beneficiary.nha.gov.in',
  fee: 'Free (₹0)',
  lastVerified: 'September 2026',
  services: [
    { title: 'Beneficiary Portal & Card Download', desc: 'Search family eligibility by Aadhaar or Ration Card and download Golden Card.', url: 'https://beneficiary.nha.gov.in', fee: 'Free (₹0)' },
    { title: 'Empaneled Hospital Search (PM-JAY)', desc: 'Find nearby government and private network hospitals providing 100% cashless treatment.', url: 'https://hospitals.pmjay.gov.in', fee: 'Free' },
    { title: 'Ayushman Bharat Vay Vandana (70+)', desc: 'Universal ₹5 Lakh top-up health coverage for all senior citizens aged 70 and above irrespective of income.', url: 'https://beneficiary.nha.gov.in', fee: 'Free' },
  ],
  eligibility: [
    'Families identified in SECC 2011 deprivation criteria and NFSA ration card lists',
    'All senior citizens aged 70 years and above under the expanded Ayushman Vay Vandana scheme'
  ],
  documents: ['Aadhaar Card', 'Ration Card / Family ID', 'Mobile phone linked to Aadhaar'],
  steps: [
    'Visit Beneficiary Portal (beneficiary.nha.gov.in)',
    'Login with mobile number and OTP',
    'Search by State and Scheme (PMJAY) using Ration Card or Aadhaar number',
    'Perform instant e-KYC (Aadhaar OTP, Iris, or Face Authentication)',
    'Download plastic-ready Ayushman Card PDF'
  ],
  faqs: [
    { q: 'Are pre-existing diseases covered in Ayushman Bharat?', a: 'Yes. All pre-existing medical conditions are covered from day one without any waiting period.' },
  ]
};

// 16. Scholarships Configuration
export const scholarshipsConfig: GovGuideConfig = {
  id: 'scholarships',
  badge: 'National Scholarship Portal (NSP)',
  title: 'National Scholarship Portal (NSP) — Central & State Grants',
  subtitle: 'Pre-matric, post-matric, merit-cum-means, top-class education, and research fellowships across central ministries and UGC/AICTE.',
  description: 'Official single-window portal for student scholarship applications, One-Time Registration (OTR), eligibility criteria, and disbursal tracking.',
  department: 'Department of Higher Education / Ministry of Electronics & IT',
  officialUrl: 'https://scholarships.gov.in',
  statusUrl: 'https://scholarships.gov.in/loginPage',
  fee: 'Free (₹0)',
  lastVerified: 'September 2026',
  services: [
    { title: 'One-Time Registration (OTR)', desc: 'Generate unique lifelong student OTR ID using Aadhaar Face Authentication or OTP.', url: 'https://scholarships.gov.in', fee: 'Free' },
    { title: 'Central Schemes Directory', desc: 'Scholarships offered by Ministry of Minority Affairs, Social Justice, Tribal Affairs, and Labour.', url: 'https://scholarships.gov.in', fee: 'Free' },
    { title: 'UGC / AICTE Schemes', desc: 'PG Indira Gandhi Single Girl Child, Pragati Scholarship for Girls, and Saksham schemes.', url: 'https://scholarships.gov.in', fee: 'Free' },
  ],
  eligibility: ['Indian students enrolled in recognized schools, colleges, or universities meeting family income and academic merit cutoffs'],
  documents: ['Aadhaar Card of student', 'Previous year educational marksheet', 'Income certificate issued by competent revenue authority', 'Bank passbook in student’s name'],
  steps: [
    'Complete One-Time Registration (OTR) on scholarships.gov.in using Aadhaar',
    'Log in to student dashboard and view matched eligible scholarship schemes',
    'Submit academic, fee, and bank account information; upload certificates',
    'Track multi-tier verification from institute level to district and state nodal officers'
  ],
  faqs: [
    { q: 'Can a student apply for multiple scholarships on NSP?', a: 'A student can apply for multiple eligible schemes, but is legally permitted to receive benefit from only one scholarship scheme during a given academic year.' },
  ]
};

// 17. Government Jobs Configuration
export const jobsConfig: GovGuideConfig = {
  id: 'jobs',
  badge: 'Central & State Public Recruitment',
  title: 'Sarkari Jobs — Official Recruitment Portal',
  subtitle: 'Verified employment notices for UPSC, SSC, Indian Railways, Banking (IBPS/SBI), Defence, and State Public Service Commissions.',
  description: 'Direct access to official examination calendars, One-Time Registration (OTR) portals, and recruitment notifications without intermediary fees.',
  department: 'Department of Personnel and Training (DoPT), Government of India',
  officialUrl: 'https://upsc.gov.in',
  fee: 'Application fee varies by examination (typically ₹100 / Free for female & reserved categories)',
  lastVerified: 'September 2026',
  services: [
    { title: 'UPSC Civil Services & Engineering', desc: 'IAS, IPS, IFS, IES, and Combined Defence Services (CDS) recruitment notifications.', url: 'https://upsc.gov.in', fee: '₹100 / Free' },
    { title: 'Staff Selection Commission (SSC)', desc: 'CGL, CHSL, MTS, CPO, and General Duty Constable notifications.', url: 'https://ssc.gov.in', fee: '₹100' },
    { title: 'Railway Recruitment Boards (RRB)', desc: 'NTPC, Assistant Loco Pilot (ALP), Group D, and Technician recruitment.', url: 'https://www.rrbcdg.gov.in', fee: '₹250–₹500 (with refund on CBT)' },
    { title: 'Banking Recruitment (IBPS)', desc: 'Probationary Officers (PO), Clerks, and Specialist Officers across public sector banks.', url: 'https://www.ibps.in', fee: 'Standard exam fee' },
  ],
  eligibility: ['Indian citizens meeting educational qualification (10th/12th/Graduate) and age criteria as per official gazette notifications'],
  documents: ['Educational marksheets and degrees', 'Aadhaar / Photo ID proof', 'Category / Caste / EWS / Disability certificate (if claiming reservation)'],
  steps: [
    'Complete One-Time Registration (OTR) on respective commission portal (e.g. upsc.gov.in or ssc.gov.in)',
    'Review detailed notification for vacancies, syllabus, and physical eligibility',
    'Submit online application and upload scanned photo & signature as per specified DPI dimensions',
    'Pay fee online and preserve application printout for document verification'
  ],
  faqs: [
    { q: 'Are exam dates subject to change?', a: 'Yes. Always refer strictly to the official commission websites for exam schedules, admit card release dates, and answer key notices.' },
  ]
};

// 18. Exams & Results Configuration
export const examsConfig: GovGuideConfig = {
  id: 'exams',
  badge: 'National Testing & Examination Authorities',
  title: 'Exams, Results & Admit Cards Directory',
  subtitle: 'National Testing Agency (NTA), Board examinations, NEET, JEE, CUET, UGC NET, and State PSC test links.',
  description: 'Direct verified links to official portals for downloading admit cards, checking examination results, answer keys, and scorecards.',
  department: 'National Testing Agency (NTA) / Central Board of Secondary Education (CBSE)',
  officialUrl: 'https://nta.ac.in',
  fee: 'Exam application fee',
  lastVerified: 'September 2026',
  services: [
    { title: 'National Testing Agency (NTA)', desc: 'JEE Main, NEET UG, CUET UG/PG, and UGC NET examination portals.', url: 'https://nta.ac.in', fee: 'Exam fee' },
    { title: 'CBSE Results Portal', desc: 'Class 10 and Class 12 board examination scorecards and DigiLocker migration certificates.', url: 'https://cbseresults.nic.in', fee: 'Free' },
    { title: 'State PSC Results Hub', desc: 'Combined state civil service prelims and mains result notices.', url: 'https://www.india.gov.in', fee: 'Free' },
  ],
  eligibility: ['Registered examination candidates'],
  documents: ['Application Number / Roll Number', 'Date of Birth matching registration record'],
  steps: [
    'Visit the authorized examination portal (e.g. nta.ac.in)',
    'Click on the active Admit Card or Result link',
    'Enter Application Number and Date of Birth along with security Captcha',
    'View and download official scorecard with QR verification code'
  ],
  faqs: [
    { q: 'Does Blue Cross store roll numbers?', a: 'No. Blue Cross never asks you to enter your roll number on our site; we link you directly to the official National Informatics Centre (nic.in) result servers.' },
  ]
};
