import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess?: () => void;
}

export function AuthModal({ open, onOpenChange, onAuthSuccess }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    email: "", 
    password: "", 
    confirmPassword: "", 
    name: "" 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted:', loginData);
    onAuthSuccess?.();
    onOpenChange(false);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempted:', signupData);
    onAuthSuccess?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 border-0 overflow-hidden rounded-3xl">
        <div className="relative w-full overflow-hidden rounded-3xl">
          {/* Magnificent Blue Background with Animation */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://media.giphy.com/media/xJT7pzbviKNqTqF1Ps/giphy.gif"
              alt="Tunnel animation"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/80 via-blue-800/90 to-black/95" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-700/30 to-blue-900/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 py-14">
            <DialogHeader className="pb-6">
              <DialogTitle className="text-2xl font-bold text-center text-white">
                Welcome to <span className="text-blue-300">InfoScale</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10 border-white/20">
                <TabsTrigger 
                  value="login" 
                  data-testid="tab-login"
                  className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
                >
                  Connexion
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  data-testid="tab-signup"
                  className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
                >
                  Inscription
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardHeader className="px-0 pb-4">
                    <CardTitle className="text-white text-xl font-semibold">Se connecter</CardTitle>
                    <CardDescription className="text-white/70">
                      Connectez-vous à votre compte pour accéder au dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-white">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="votre@email.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                          data-testid="input-login-email"
                          className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 rounded-2xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-white">Mot de passe</Label>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={loginData.password}
                            onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                            data-testid="input-login-password"
                            className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 rounded-2xl"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-white/60 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                            data-testid="button-toggle-password"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg" 
                        data-testid="button-login-submit"
                      >
                        Se connecter
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="signup">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardHeader className="px-0 pb-4">
                    <CardTitle className="text-white text-xl font-semibold">Créer un compte</CardTitle>
                    <CardDescription className="text-white/70">
                      Commencez votre essai gratuit de 14 jours
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-white">Nom complet</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Votre nom"
                          value={signupData.name}
                          onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                          data-testid="input-signup-name"
                          className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 rounded-2xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-white">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="votre@email.com"
                          value={signupData.email}
                          onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                          data-testid="input-signup-email"
                          className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 rounded-2xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-white">Mot de passe</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={signupData.password}
                          onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                          data-testid="input-signup-password"
                          className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 rounded-2xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm" className="text-white">Confirmer le mot de passe</Label>
                        <Input
                          id="signup-confirm"
                          type="password"
                          placeholder="••••••••"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          data-testid="input-signup-confirm"
                          className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 rounded-2xl"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg" 
                        data-testid="button-signup-submit"
                      >
                        Créer mon compte
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}