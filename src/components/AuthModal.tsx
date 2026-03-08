import { AnimatePresence, motion } from "framer-motion";
import { Chrome, Github, Lock, Mail, User, Users, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Safe hook to get auth context, returns null functions during SSR
const useAuthSafe = () => {
  try {
    return useAuth();
  } catch {
    // Return safe defaults during SSR when AuthProvider isn't available
    return {
      user: null,
      signOut: async () => {},
      loading: false,
      session: null,
      signUp: async () => {},
      signIn: async () => {},
      signInWithGoogle: async () => {},
      signInWithGitHub: async () => {},
      resetPassword: async () => {},
      updatePassword: async () => {},
    };
  }
};

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signUp, signIn, signInWithGoogle, signInWithGitHub, resetPassword } = useAuthSafe();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        onClose();
        setFormData({ name: "", email: "", password: "" });
      } else {
        await signUp(formData.email, formData.password, formData.name);
        onClose();
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      // Error is handled by AuthContext (toast notification)
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // OAuth redirects, so we don't close modal here
    } catch (error) {
      // Error is handled by AuthContext
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGitHub();
      // OAuth redirects, so we don't close modal here
    } catch (error) {
      // Error is handled by AuthContext
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword(formData.email);
      setShowForgotPassword(false);
      setFormData({ ...formData, password: "" });
    } catch (error) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

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

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md"
            >
              <div className="glass-card p-8">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    {isLogin ? "Welcome Back" : "Join FocusPilot"}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {isLogin
                      ? "Sign in to continue your focus journey"
                      : "Create an account and start shipping faster"}
                  </p>
                </div>

                {/* Social Proof */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-2 mb-6 text-sm text-muted-foreground"
                >
                  <Users className="w-4 h-4 text-primary" />
                  <span>Join 500+ developers already focused</span>
                </motion.div>

                {/* Social Auth Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <motion.button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="btn-glass py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Chrome className="w-5 h-5" />
                    )}
                    <span className="text-sm">Google</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleGitHubSignIn}
                    disabled={isLoading}
                    className="btn-glass py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Github className="w-5 h-5" />
                    )}
                    <span className="text-sm">GitHub</span>
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">or continue with email</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Forgot Password Form */}
                {showForgotPassword ? (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Email Address"
                        className="input-glass w-full pl-12"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary-glow w-full py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setFormData({ ...formData, password: "" });
                      }}
                      className="text-sm text-primary hover:underline w-full text-center"
                    >
                      Back to {isLogin ? "Sign In" : "Sign Up"}
                    </button>
                  </form>
                ) : (
                  /* Email/Password Form */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Full Name"
                          className="input-glass w-full pl-12"
                          required={!isLogin}
                        />
                      </div>
                    )}

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Email Address"
                        className="input-glass w-full pl-12"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="Password"
                        className="input-glass w-full pl-12"
                        required
                        minLength={6}
                      />
                    </div>

                    {isLogin && (
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary-glow w-full py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {isLogin ? "Signing in..." : "Creating account..."}
                        </span>
                      ) : (
                        isLogin ? "Sign In" : "Create Account"
                      )}
                    </motion.button>
                  </form>
                )}

                {/* Toggle Auth Mode */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:underline font-medium"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;