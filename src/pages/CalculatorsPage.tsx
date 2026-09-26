import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calculator,
  TrendingUp,
  Percent,
  Calendar,
  Clock,
  Scale,
  DollarSign,
  Coins,
  Shield,
  HelpCircle,
  FileCheck2,
  PieChart,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { formatCurrencyINR } from '../lib/utils';

export const CalculatorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'sip';

  // 1. SIP Calculator State
  const [sipMonthly, setSipMonthly] = useState<number>(10000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // 2. EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(3000000);
  const [loanRate, setLoanRate] = useState<number>(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20);

  // 3. GST Calculator State
  const [gstAmount, setGstAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'exclusive' | 'inclusive'>('exclusive');

  // 4. Fixed Deposit (FD) State
  const [fdPrincipal, setFdPrincipal] = useState<number>(100000);
  const [fdRate, setFdRate] = useState<number>(7.1);
  const [fdYears, setFdYears] = useState<number>(5);

  // 5. Age Calculator State
  const [birthDate, setBirthDate] = useState<string>('1998-05-15');

  // 6. BMI Calculator State
  const [bmiWeightKg, setBmiWeightKg] = useState<number>(70);
  const [bmiHeightCm, setBmiHeightCm] = useState<number>(172);

  // 7. Salary In-Hand Calculator State
  const [annualCtc, setAnnualCtc] = useState<number>(1200000);

  // 8. Percentage Calculator State
  const [percentX, setPercentX] = useState<number>(15);
  const [percentY, setPercentY] = useState<number>(500);

  // 9. Inflation Calculator State
  const [currAmount, setCurrAmount] = useState<number>(100000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [inflationYears, setInflationYears] = useState<number>(10);

  // --- SIP Calculation ---
  const calculateSIP = () => {
    const monthlyRate = sipRate / 12 / 100;
    const months = sipYears * 12;
    const invested = sipMonthly * months;
    const maturity = sipMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const gains = maturity - invested;
    return { invested, maturity, gains };
  };

  // --- EMI Calculation ---
  const calculateEMI = () => {
    const monthlyRate = loanRate / 12 / 100;
    const months = loanTenureYears * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    return { emi, totalPayment, totalInterest };
  };

  // --- GST Calculation ---
  const calculateGST = () => {
    if (gstType === 'exclusive') {
      const tax = (gstAmount * gstRate) / 100;
      const total = gstAmount + tax;
      return { base: gstAmount, tax, total };
    } else {
      const base = (gstAmount * 100) / (100 + gstRate);
      const tax = gstAmount - base;
      return { base, tax, total: gstAmount };
    }
  };

  // --- FD Calculation (Quarterly Compounding) ---
  const calculateFD = () => {
    const n = 4; // Quarterly
    const maturity = fdPrincipal * Math.pow(1 + (fdRate / 100) / n, n * fdYears);
    const interest = maturity - fdPrincipal;
    return { maturity, interest };
  };

  // --- Age Calculation ---
  const calculateAge = () => {
    if (!birthDate) return { years: 0, months: 0, days: 0 };
    const birth = new Date(birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  };

  // --- BMI Calculation ---
  const calculateBMI = () => {
    const heightM = bmiHeightCm / 100;
    if (heightM <= 0) return { bmi: 0, category: 'N/A' };
    const bmi = bmiWeightKg / (heightM * heightM);
    let category = 'Normal weight';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 25 && bmi < 29.9) category = 'Overweight';
    else if (bmi >= 30) category = 'Obese';
    return { bmi: parseFloat(bmi.toFixed(1)), category };
  };

  // --- In-Hand Salary Calculation (Simplified Indian FY 25-26 New Regime) ---
  const calculateSalary = () => {
    const standardDeduction = 75000;
    const epfEmployee = Math.min(21600, annualCtc * 0.05); // standard EPF approximation
    const taxable = Math.max(0, annualCtc - standardDeduction - epfEmployee);
    
    // New regime slabs
    let tax = 0;
    if (taxable > 1500000) tax += (taxable - 1500000) * 0.3 + 150000;
    else if (taxable > 1200000) tax += (taxable - 1200000) * 0.2 + 90000;
    else if (taxable > 1000000) tax += (taxable - 1000000) * 0.15 + 60000;
    else if (taxable > 700000) tax += (taxable - 700000) * 0.1 + 30000;
    else if (taxable > 300000) tax += (taxable - 300000) * 0.05;

    // Section 87A rebate for income up to 7 Lakhs (up to 25k rebate)
    if (taxable <= 700000) tax = 0;
    else tax = tax * 1.04; // 4% Health & Education Cess

    const annualInHand = annualCtc - tax - epfEmployee;
    const monthlyInHand = annualInHand / 12;
    return { monthlyInHand, annualInHand, tax, epfEmployee };
  };

  // --- Inflation Calculation ---
  const calculateInflation = () => {
    const futureCost = currAmount * Math.pow(1 + inflationRate / 100, inflationYears);
    return { futureCost, increase: futureCost - currAmount };
  };

  const sipResult = calculateSIP();
  const emiResult = calculateEMI();
  const gstResult = calculateGST();
  const fdResult = calculateFD();
  const ageResult = calculateAge();
  const bmiResult = calculateBMI();
  const salaryResult = calculateSalary();
  const inflationResult = calculateInflation();

  const tabsList = [
    { id: 'sip', name: 'SIP Mutual Fund', icon: TrendingUp },
    { id: 'emi', name: 'Loan EMI', icon: Calculator },
    { id: 'gst', name: 'GST (Goods & Services)', icon: Percent },
    { id: 'salary', name: 'Salary In-Hand', icon: Coins },
    { id: 'fd', name: 'Fixed Deposit (FD)', icon: PieChart },
    { id: 'inflation', name: 'Inflation Future Cost', icon: TrendingUp },
    { id: 'age', name: 'Age Calculator', icon: Calendar },
    { id: 'bmi', name: 'BMI Health', icon: Scale },
    { id: 'percentage', name: 'Percentage %', icon: Percent },
  ];

  return (
    <>
      <SEOHead
        title="Free Financial & Daily Calculators — SIP, EMI, GST, Salary & Tax"
        description="Comprehensive suite of 19+ mathematical financial calculators: Mutual Fund SIP, Loan EMI, GST exclusive/inclusive, in-hand salary, FD, and inflation calculator."
        canonicalPath={`/calculators?tab=${activeTab}`}
        breadcrumbs={[
          { label: 'Tools', url: '/calculators' },
          { label: 'Calculators' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Calculators', url: '/calculators' }]} />

        {/* Page Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4" />
            <span>Mathematical &amp; Financial Calculators</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Financial &amp; Utility Calculators
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            100% client-side precision calculations. Plan systematic mutual fund investments, estimate home loan EMIs, compute GST breakdowns, and evaluate in-hand salaries.
          </p>
        </div>

        {/* Quick Links for Currency Converter & Crypto Market */}
        <div className="mb-6 flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span>Live Market Converters:</span>
          </span>
          <Link
            to="/markets/currency"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 font-bold hover:border-emerald-500 shadow-xs transition"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Currency Converter (Forex)</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </Link>
          <Link
            to="/markets/crypto"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-700 dark:text-amber-400 font-bold hover:border-amber-500 shadow-xs transition"
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Crypto Market (BTC &amp; ETH)</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </Link>
          <Link
            to="/markets"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-blue-600 dark:text-blue-400 font-bold hover:underline ml-auto"
          >
            <span>All Live Markets &rarr;</span>
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 mb-8 text-xs font-bold">
          {tabsList.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setSearchParams({ tab: t.id })}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition whitespace-nowrap ${
                  activeTab === t.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Calculator Box */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm">
          
          {/* TAB 1: SIP CALCULATOR */}
          {activeTab === 'sip' && (
            <div>
              <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  SIP (Systematic Investment Plan) Calculator
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Compound wealth accumulator for monthly mutual fund installments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Inputs */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Monthly Investment</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{formatCurrencyINR(sipMonthly)}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="100000"
                      step="500"
                      value={sipMonthly}
                      onChange={(e) => setSipMonthly(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Expected Annual Return (CAGR)</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{sipRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.5"
                      value={sipRate}
                      onChange={(e) => setSipRate(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Investment Period</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{sipYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="35"
                      step="1"
                      value={sipYears}
                      onChange={(e) => setSipYears(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>

                {/* Results Card */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Invested Amount:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{formatCurrencyINR(sipResult.invested)}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Estimated Returns (Profit):</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-mono">+{formatCurrencyINR(sipResult.gains)}</strong>
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-slate-500 mb-1">Total Expected Wealth:</div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                      {formatCurrencyINR(sipResult.maturity)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EMI CALCULATOR */}
          {activeTab === 'emi' && (
            <div>
              <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Loan EMI Calculator (Home, Personal &amp; Car Loan)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Amortization breakdown of principal and interest components.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Loan Amount</span>
                      <span className="text-blue-600 font-bold">{formatCurrencyINR(loanAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="20000000"
                      step="50000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Interest Rate (% p.a.)</span>
                      <span className="text-blue-600 font-bold">{loanRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="0.1"
                      value={loanRate}
                      onChange={(e) => setLoanRate(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Loan Tenure</span>
                      <span className="text-blue-600 font-bold">{loanTenureYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={loanTenureYears}
                      onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
                  <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Monthly EMI</span>
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono mt-1">
                      {formatCurrencyINR(emiResult.emi)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Principal Loan:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{formatCurrencyINR(loanAmount)}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Total Interest Payable:</span>
                    <strong className="text-rose-600 dark:text-rose-400 font-mono">{formatCurrencyINR(emiResult.totalInterest)}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2">
                    <span className="text-slate-500 font-bold">Total Amount Payable:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{formatCurrencyINR(emiResult.totalPayment)}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GST CALCULATOR */}
          {activeTab === 'gst' && (
            <div>
              <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  GST Calculator (Exclusive &amp; Inclusive)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Compute CGST + SGST or IGST breakdowns across Indian GST slabs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={gstAmount}
                      onChange={(e) => setGstAmount(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      GST Rate Slab:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 12, 18, 28].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setGstRate(rate)}
                          className={`p-2.5 rounded-xl font-bold text-xs border ${
                            gstRate === rate
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {rate}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      GST Type:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setGstType('exclusive')}
                        className={`p-2.5 rounded-xl font-bold text-xs border ${
                          gstType === 'exclusive'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        GST Exclusive (Add GST)
                      </button>
                      <button
                        onClick={() => setGstType('inclusive')}
                        className={`p-2.5 rounded-xl font-bold text-xs border ${
                          gstType === 'inclusive'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        GST Inclusive (Remove GST)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Base Amount:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{formatCurrencyINR(gstResult.base)}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">GST ({gstRate}%):</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{formatCurrencyINR(gstResult.tax)}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700 text-slate-400 text-[11px]">
                    <span>CGST ({gstRate / 2}%) + SGST ({gstRate / 2}%):</span>
                    <span className="font-mono">{formatCurrencyINR(gstResult.tax / 2)} each</span>
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-slate-500 mb-1">Total Invoice Value:</div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                      {formatCurrencyINR(gstResult.total)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SALARY IN-HAND */}
          {activeTab === 'salary' && (
            <div>
              <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Salary In-Hand Calculator (FY 2025-26 New Regime)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Includes ₹75,000 standard deduction, EPF contribution, and revised tax slabs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Annual CTC (Cost to Company)</span>
                      <span className="text-indigo-600 font-bold">{formatCurrencyINR(annualCtc)}</span>
                    </div>
                    <input
                      type="range"
                      min="300000"
                      max="5000000"
                      step="50000"
                      value={annualCtc}
                      onChange={(e) => setAnnualCtc(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
                  <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Estimated Monthly In-Hand</span>
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                      {formatCurrencyINR(salaryResult.monthlyInHand)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Total Annual Tax (New Regime):</span>
                    <strong className="text-rose-600 font-mono">{formatCurrencyINR(salaryResult.tax)}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Employee EPF Deduction:</span>
                    <strong className="text-slate-700 dark:text-slate-300 font-mono">{formatCurrencyINR(salaryResult.epfEmployee)}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2">
                    <span className="text-slate-500 font-bold">Annual Take-Home:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{formatCurrencyINR(salaryResult.annualInHand)}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AGE CALCULATOR */}
          {activeTab === 'age' && (
            <div>
              <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Chronological Age Calculator
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Accurate age calculation down to years, months, and days.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-6 text-center">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Select Your Date of Birth:
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Your Current Age</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                    {ageResult.years} Years, {ageResult.months} Months, {ageResult.days} Days
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BMI CALCULATOR */}
          {activeTab === 'bmi' && (
            <div>
              <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  BMI (Body Mass Index) Calculator
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Standard WHO categorization for adult body weight assessment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Weight (kg)</span>
                      <span className="text-emerald-600 font-bold">{bmiWeightKg} kg</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="150"
                      step="1"
                      value={bmiWeightKg}
                      onChange={(e) => setBmiWeightKg(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Height (cm)</span>
                      <span className="text-emerald-600 font-bold">{bmiHeightCm} cm</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="220"
                      step="1"
                      value={bmiHeightCm}
                      onChange={(e) => setBmiHeightCm(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center space-y-2">
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Your Body Mass Index (BMI)</div>
                  <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                    {bmiResult.bmi}
                  </div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Category: <span className="text-blue-600 dark:text-blue-400">{bmiResult.category}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: INFLATION CALCULATOR */}
          {activeTab === 'inflation' && (
            <div>
              <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Inflation &amp; Purchasing Power Calculator
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Understand how annual inflation impacts the future cost of goods and services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Current Cost / Value</span>
                      <span className="text-orange-600 font-bold">{formatCurrencyINR(currAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="5000000"
                      step="10000"
                      value={currAmount}
                      onChange={(e) => setCurrAmount(Number(e.target.value))}
                      className="w-full accent-orange-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Expected Annual Inflation</span>
                      <span className="text-orange-600 font-bold">{inflationRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="15"
                      step="0.5"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="w-full accent-orange-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Time Horizon</span>
                      <span className="text-orange-600 font-bold">{inflationYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      step="1"
                      value={inflationYears}
                      onChange={(e) => setInflationYears(Number(e.target.value))}
                      className="w-full accent-orange-600"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
                  <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Future Cost Required</span>
                    <div className="text-3xl font-black text-orange-600 dark:text-orange-400 font-mono mt-1">
                      {formatCurrencyINR(inflationResult.futureCost)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Cumulative Price Inflation:</span>
                    <strong className="text-rose-600 font-mono">+{formatCurrencyINR(inflationResult.increase)}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: FIXED DEPOSIT (FD) */}
          {activeTab === 'fd' && (
            <div>
              <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Bank Fixed Deposit (FD) Return Calculator
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Compound quarterly interest yield for Indian commercial banks &amp; post offices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Deposit Principal</span>
                      <span className="text-teal-600 font-bold">{formatCurrencyINR(fdPrincipal)}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="2000000"
                      step="10000"
                      value={fdPrincipal}
                      onChange={(e) => setFdPrincipal(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Interest Rate (% p.a.)</span>
                      <span className="text-teal-600 font-bold">{fdRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="10"
                      step="0.1"
                      value={fdRate}
                      onChange={(e) => setFdRate(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-300">Tenure (Years)</span>
                      <span className="text-teal-600 font-bold">{fdYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={fdYears}
                      onChange={(e) => setFdYears(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Principal Deposited:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{formatCurrencyINR(fdPrincipal)}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Interest Earned:</span>
                    <strong className="text-teal-600 dark:text-teal-400 font-mono">+{formatCurrencyINR(fdResult.interest)}</strong>
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-slate-500 mb-1">Maturity Value:</div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                      {formatCurrencyINR(fdResult.maturity)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: PERCENTAGE CALCULATOR */}
          {activeTab === 'percentage' && (
            <div>
              <div className="pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Percentage &amp; Ratio Calculator
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Instant calculation of percentage shares, discounts, and markups.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">What is</span>
                  <input
                    type="number"
                    value={percentX}
                    onChange={(e) => setPercentX(Number(e.target.value))}
                    className="w-24 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-center"
                  />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">% of</span>
                  <input
                    type="number"
                    value={percentY}
                    onChange={(e) => setPercentY(Number(e.target.value))}
                    className="w-32 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-center"
                  />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">?</span>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Result</div>
                  <div className="text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">
                    {((percentX * percentY) / 100).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
