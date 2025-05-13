
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Heart, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const backgroundStyle: React.CSSProperties = {
  backgroundImage: "url('/images/fundo2.png')",
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'fixed' as 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: -1,
  opacity: 0.9,
};

// List of authorized emails
const AUTHORIZED_EMAILS = [
  'lucas.silveira@usp.br',
  'icarosicchieri@usp.br',
];

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if email is in the authorized list
      if (!AUTHORIZED_EMAILS.includes(email)) {
        toast({
          variant: "destructive",
          title: "Acesso negado",
          description: "Você não está autorizado a criar uma conta.",
        });
        setLoading(false);
        return;
      }
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erro no cadastro",
          description: error.message,
        });
      } else {
        toast({
          title: "Sucesso!",
          description: "Conta criada com sucesso. Você já pode fazer login.",
        });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado. Por favor, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if email is in the authorized list
      if (!AUTHORIZED_EMAILS.includes(email)) {
        toast({
          variant: "destructive",
          title: "Acesso negado",
          description: "Você não está autorizado a acessar este site.",
        });
        setLoading(false);
        return;
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: error.message,
        });
      } else {
        toast({
          title: "Bem-vindo!",
          description: "Login realizado com sucesso.",
        });
        
        // Redirect to the page they were trying to access or to the home page
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado. Por favor, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={backgroundStyle} />
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">
              <Heart className="h-12 w-12 fill-love-orange stroke-love-orange-dark" />
            </div>
            <CardTitle className="text-3xl font-bold text-gradient">Bem-vindo</CardTitle>
            <CardDescription>Entre para acessar suas memórias</CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 mx-6">
              <TabsTrigger value="signin" className="data-[state=active]:bg-love-green data-[state=active]:text-white">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-love-orange data-[state=active]:text-white">
                Cadastrar
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-love-green hover:bg-love-green-dark"
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" /> Entrar
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-love-orange hover:bg-love-orange-dark"
                    disabled={loading}
                  >
                    {loading ? 'Cadastrando...' : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" /> Cadastrar
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default AuthPage;
