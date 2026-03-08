import { AnimatePresence, motion } from "framer-motion";
import {
  Bitcoin,
  Check,
  CreditCard,
  Lock,
  Shield,
  Smartphone,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = "global" | "local" | "crypto";

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>("global");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
    }, 3000);
  };

  const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
    { id: "global", label: "Global", icon: <CreditCard className="w-5 h-5" /> },
    { id: "local", label: "Local BD", icon: <Smartphone className="w-5 h-5" /> },
    { id: "crypto", label: "Web3", icon: <Bitcoin className="w-5 h-5" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl my-auto"
            >
              <div className="glass-card relative">
                {/* Processing Overlay */}
                <AnimatePresence>
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-background/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl"
                    >
                      <motion.div
                        className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="mt-4 text-lg font-medium">Processing Payment...</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Please do not close this window
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Order Summary */}
                  <div className="lg:col-span-1 p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Order Summary</h3>
                      <button
                        onClick={onClose}
                        className="lg:hidden p-2 hover:bg-muted rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Plan */}
                      <div className="glass-card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Empire Pro</span>
                          <span className="text-primary font-bold">$12/mo</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Billed monthly, cancel anytime
                        </p>
                      </div>

                      {/* Secure Badge */}
                      <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                        <Shield className="w-5 h-5 text-success" />
                        <span className="text-sm text-success">Secure Checkout</span>
                      </div>

                      {/* Trust Signals */}
                      <div className="space-y-2 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Lock className="w-3 h-3" />
                          <span>SSL Secured</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="w-3 h-3" />
                          <span>PCI DSS Compliant</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="w-3 h-3" />
                          <span>Trusted by 500+ Devs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="lg:col-span-2 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Payment Method</h3>
                      <button
                        onClick={onClose}
                        className="hidden lg:block p-2 hover:bg-muted rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Method Tabs */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {paymentMethods.map((method) => (
                        <motion.button
                          key={method.id}
                          onClick={() => setActiveMethod(method.id)}
                          className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 ${
                            activeMethod === method.id
                              ? "glow-border bg-primary/10"
                              : "border-white/10 hover:border-primary/30 hover:bg-white/5"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={`${
                              activeMethod === method.id
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            {method.icon}
                          </div>
                          <span className="text-sm font-medium">{method.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Payment Content */}
                    <AnimatePresence mode="wait">
                      {activeMethod === "global" && (
                        <motion.div
                          key="global"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <label className="block text-sm text-muted-foreground mb-2">
                                Card Number
                              </label>
                              <input
                                type="text"
                                placeholder="4242 4242 4242 4242"
                                value={cardData.number}
                                onChange={(e) =>
                                  setCardData({ ...cardData, number: e.target.value })
                                }
                                className="input-glass w-full"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-muted-foreground mb-2">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                value={cardData.expiry}
                                onChange={(e) =>
                                  setCardData({ ...cardData, expiry: e.target.value })
                                }
                                className="input-glass w-full"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-muted-foreground mb-2">
                                CVC
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                value={cardData.cvc}
                                onChange={(e) =>
                                  setCardData({ ...cardData, cvc: e.target.value })
                                }
                                className="input-glass w-full"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-sm text-muted-foreground mb-2">
                                Cardholder Name
                              </label>
                              <input
                                type="text"
                                placeholder="John Developer"
                                value={cardData.name}
                                onChange={(e) =>
                                  setCardData({ ...cardData, name: e.target.value })
                                }
                                className="input-glass w-full"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 pt-4">
                            <motion.button
                              onClick={handlePayment}
                              className="btn-primary-glow flex-1 py-4 rounded-xl font-semibold"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Pay $12.00
                            </motion.button>
                            <motion.button
                              className="btn-glass px-6 py-4 rounded-xl flex items-center gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.993c.062-.361.38-.63.747-.63h10.61c3.53 0 5.996 2.391 5.466 5.345-.57 3.185-3.46 5.566-6.726 5.566h-3.558L9.934 20.67c-.062.361-.38.667-.748.667H7.076z" />
                              </svg>
                              PayPal
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {activeMethod === "local" && (
                        <motion.div
                          key="local"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <p className="text-muted-foreground text-sm mb-4">
                            Select your preferred mobile financial service:
                          </p>
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { name: "bKash", color: "#E2136E" },
                              { name: "Nagad", color: "#F26522" },
                              { name: "Rocket", color: "#8C3494" },
                            ].map((service) => (
                              <motion.button
                                key={service.name}
                                className="glass-card-hover p-6 flex flex-col items-center gap-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div
                                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                                  style={{ backgroundColor: service.color }}
                                >
                                  {service.name.charAt(0)}
                                </div>
                                <span className="font-medium">{service.name}</span>
                              </motion.button>
                            ))}
                          </div>
                          <div className="mt-6 p-4 bg-primary/10 rounded-lg flex items-center gap-3">
                            <Lock className="w-5 h-5 text-primary" />
                            <span className="text-sm">
                              Proceed to Secure Local Gateway
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {activeMethod === "crypto" && (
                        <motion.div
                          key="crypto"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-6"
                        >
                          <p className="text-muted-foreground text-sm">
                            Pay with cryptocurrency for ultimate privacy:
                          </p>

                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { name: "BTC", label: "Bitcoin", icon: "₿" },
                              { name: "ETH", label: "Ethereum", icon: "Ξ" },
                              { name: "USDT", label: "Tether", icon: "$" },
                            ].map((crypto) => (
                              <motion.button
                                key={crypto.name}
                                className="glass-card-hover p-6 flex flex-col items-center gap-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-cyan-500/30 flex items-center justify-center text-2xl font-bold">
                                  {crypto.icon}
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">{crypto.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {crypto.label}
                                  </div>
                                </div>
                              </motion.button>
                            ))}
                          </div>

                          <motion.button
                            className="w-full btn-glass py-4 rounded-xl flex items-center justify-center gap-3 font-semibold"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Wallet className="w-5 h-5 text-primary" />
                            Connect Wallet
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;