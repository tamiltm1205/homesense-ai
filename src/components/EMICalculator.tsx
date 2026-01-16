import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, Building2 } from "lucide-react";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalInterest, totalAmount } = useMemo(() => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure * 12;

    const emiValue =
      (principal * rate * Math.pow(1 + rate, time)) /
      (Math.pow(1 + rate, time) - 1);

    const totalAmt = emiValue * time;
    const totalInt = totalAmt - principal;

    return {
      emi: Math.round(emiValue),
      totalInterest: Math.round(totalInt),
      totalAmount: Math.round(totalAmt),
    };
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString()}`;
  };

  const principalPercentage = (loanAmount / totalAmount) * 100;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold text-sm mb-6">
              <Calculator className="w-4 h-4" />
              Financial Tools
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              EMI Calculator
            </h2>
            <p className="text-muted-foreground text-lg">
              Plan your home loan with our easy-to-use EMI calculator
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sliders */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
              {/* Loan Amount */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-foreground">Loan Amount</label>
                  <span className="text-lg font-bold text-accent">{formatCurrency(loanAmount)}</span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={([value]) => setLoanAmount(value)}
                  min={500000}
                  max={50000000}
                  step={100000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>₹5L</span>
                  <span>₹5 Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-foreground">Interest Rate</label>
                  <span className="text-lg font-bold text-accent">{interestRate}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                  min={5}
                  max={15}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>5%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-foreground">Loan Tenure</label>
                  <span className="text-lg font-bold text-accent">{tenure} years</span>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={([value]) => setTenure(value)}
                  min={1}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
              {/* EMI Display */}
              <div className="text-center mb-8 p-6 hero-gradient rounded-xl">
                <p className="text-white/70 text-sm mb-2">Your Monthly EMI</p>
                <p className="text-4xl font-bold text-white">{formatCurrency(emi)}</p>
              </div>

              {/* Breakdown */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-accent" />
                    <span className="text-muted-foreground">Principal Amount</span>
                  </div>
                  <span className="font-semibold text-foreground">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    <span className="text-muted-foreground">Total Interest</span>
                  </div>
                  <span className="font-semibold text-foreground">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-accent/10 rounded-xl border border-accent/20">
                  <span className="font-medium text-foreground">Total Amount</span>
                  <span className="font-bold text-accent text-lg">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              {/* Visual Breakdown */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Payment Breakdown</p>
                <div className="h-4 rounded-full overflow-hidden bg-secondary flex">
                  <div
                    className="h-full gold-gradient transition-all duration-500"
                    style={{ width: `${principalPercentage}%` }}
                  />
                  <div
                    className="h-full bg-orange-500/70"
                    style={{ width: `${100 - principalPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full gold-gradient" />
                    <span className="text-muted-foreground">Principal ({principalPercentage.toFixed(0)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500/70" />
                    <span className="text-muted-foreground">Interest ({(100 - principalPercentage).toFixed(0)}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;
